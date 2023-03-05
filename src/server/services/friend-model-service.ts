import { Service } from "@flamework/core";
import { Janitor } from "@rbxts/janitor";
import { Logger } from "@rbxts/log";
import { CollectionService, Players, Workspace } from "@rbxts/services";
import { Lot } from "server/components/lot/lot";
import { Tag } from "types/enum/tags";

import { PlayerService } from "./player/player-service";
import { OnLotOwned } from "./tycoon/lot-service";

@Service({})
export class FriendModelService implements OnLotOwned {
	private friends: Map<Player, Array<number>>;
	private friendsInUse: Map<Player, Map<Instance, number>>;
	private friendModels: Map<Lot, Array<Instance>>;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private janitors: Map<Lot, Janitor<any>>;

	constructor(private readonly logger: Logger, private readonly playerService: PlayerService) {
		this.friends = new Map();
		this.friendsInUse = new Map();
		this.friendModels = new Map();
		this.janitors = new Map();
	}

	public onLotOwned(lot: Lot, newOwner: Player): void {
		return;

		this.janitors.set(lot, new Janitor());

		this.getFriends(newOwner)
			.andThen(() => {
				this.setupConnections(newOwner, lot);
			})
			.catch((err) => {
				this.logger.Error(err);
			});

		const playerEntity_opt = this.playerService.getEntity(newOwner);
		if (playerEntity_opt.isNone()) {
			return;
		}

		const playerEntity = playerEntity_opt.unwrap();
		playerEntity.playerRemoving.Add(() => {
			this.onPlayerLeaving(newOwner, lot);
		});
	}

	private startWatchingInstance(player: Player, friend: Instance, lot: Lot): void {
		const friendAdded = (): void => {
			if (friend.Parent?.Parent !== lot.instance) {
				return;
			}

			this.friendModels.get(lot)?.push(friend);
			this.onFriendAdded(player, friend).catch((err) => {
				this.logger.Error(err);
			});
		};

		if (friend.IsDescendantOf(Workspace)) {
			friendAdded();
		}

		this.janitors.get(lot)?.Add(
			friend.AncestryChanged.Connect((_, parent) => {
				if (parent && friend.IsDescendantOf(Workspace)) {
					friendAdded();
				} else {
					this.onFriendRemoved(player, friend);
				}
			}),
			"Disconnect",
			friend.Name + lot.name,
		);
	}

	private async getFriends(player: Player): Promise<void> {
		return Promise.try(() => {
			return Players.GetFriendsAsync(player.UserId);
		}).andThen((pages) => {
			this.friends.set(player, []);
			pages.GetCurrentPage().forEach((friend) => {
				this.friends.get(player)?.push(friend.Id);
			});
		});
	}

	private setupConnections(player: Player, lot: Lot): void {
		const friends = CollectionService.GetTagged(Tag.Friend).filter((friend) => {
			return friend.Parent?.Name === lot.name || friend.Parent?.Parent === lot.instance;
		});

		this.friendModels.set(lot, friends);

		this.janitors.get(lot)?.Add(
			CollectionService.GetInstanceAddedSignal(Tag.Friend).Connect((friend: Instance) => {
				this.startWatchingInstance(player, friend, lot);
			}),
		);

		this.janitors.get(lot)?.Add(
			CollectionService.GetInstanceRemovedSignal(Tag.Friend).Connect((friend: Instance) => {
				this.janitors.get(lot)?.Remove(friend.Name);

				if (friend.Parent?.Parent !== lot.instance) {
					return;
				}

				const index = this.friendModels.get(lot)?.findIndex((value) => {
					return value === friend;
				});

				if (index !== undefined) {
					this.friendModels.get(lot)?.remove(index);
				}
				this.onFriendRemoved(player, friend);
			}),
		);

		friends.forEach((friend) => {
			this.startWatchingInstance(player, friend, lot);
		});
	}

	private onPlayerLeaving(player: Player, lot: Lot): void {
		this.janitors.get(lot)?.Cleanup();
		this.friends.delete(player);
		this.friendModels.delete(lot);
	}

	private async onFriendAdded(player: Player, friend: Instance): Promise<unknown> {
		const friends = this.friends.get(player);
		if (!friends || friends.size() === 0) {
			return;
		}

		let randomFriendIndex: number;
		let friendId: number;

		const setFriend = (): Promise<void> => {
			return Promise.try(() => {
				return Players.GetHumanoidDescriptionFromUserId(friendId);
			}).andThen((playerDescription) => {
				playerDescription.BodyTypeScale = 0;
				playerDescription.HeadScale = 1;

				friend.FindFirstChildWhichIsA("Humanoid")?.ApplyDescription(playerDescription);

				this.disableShadowsOnFriend(friend);

				this.friendsInUse.get(player)?.set(friend, friendId);
				this.friends.get(player)?.remove(randomFriendIndex);
			});
		};

		let attempts = 1;
		// If there is an error, the player is likely banned or deleted. We
		// should remove them from the list of friends, and try again.
		return Promise.retry(async () => {
			try {
				if (attempts > 1) {
					this.logger.Warn(`Error setting friend, removing ${friendId} from list`);
					this.friends.get(player)?.remove(randomFriendIndex);
				}

				randomFriendIndex = math.random(0, friends.size() - 1);
				friendId = friends[randomFriendIndex];
				attempts += 1;
				return setFriend();
			} catch (err) {
				this.logger.Error(`Error setting friend: ${err}`);
			}
		}, 10);
	}

	private onFriendRemoved(player: Player, friend: Instance): void {
		const friendId = this.friendsInUse.get(player)?.get(friend);
		if (friendId === undefined) {
			return;
		}

		this.friends.get(player)?.push(friendId);
		this.friendsInUse.get(player)?.delete(friend);
	}

	private disableShadowsOnFriend(friend: Instance): void {
		friend.GetDescendants().forEach((descendant) => {
			if (descendant.IsA("BasePart") || descendant.IsA("UnionOperation") || descendant.IsA("MeshPart")) {
				descendant.CastShadow = false;
			}
		});
	}
}
