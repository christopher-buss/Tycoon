import { Flamework, OnInit, OnStart, Reflect, Service } from "@flamework/core";
import { Signal } from "@rbxts/beacon";
import { Janitor } from "@rbxts/janitor";
import { Logger } from "@rbxts/log";
import { Option } from "@rbxts/rust-classes";
import { Players } from "@rbxts/services";
import PlayerEntity from "server/modules/classes/player-entity";
import { Functions } from "server/network";
import { IPlayerData } from "shared/meta/default-player-data";
import { FlameworkUtil } from "shared/util/flamework-utils";
import { NetResult } from "shared/util/networking";
import KickCode from "types/enum/kick-reason";
import { NetPlayerData, ServerError } from "types/interfaces/network-types";
import PlayerDataService from "./player-data-service";
import PlayerRemovalService from "./player-removal-service";

export interface OnPlayerJoin {
	/**
	 * Fires when a player joins the game and is fully initialized. The player
	 * is considered "fully initialized" once all of their data is loaded and
	 * their PlayerEntity class is fully setup. At which point, anything that
	 * implements this lifecycle event will be fired with the class.
	 */
	onPlayerJoin(playerEntity: PlayerEntity): void;
}

/**
 * A service that handles functionality related to player data and life cycle
 * events.
 */
@Service({})
export class PlayerService implements OnInit, OnStart {
	private playerJoinEvents = new Map<string, OnPlayerJoin>();
	private playerEntities = new Map<Player, PlayerEntity>();
	private onEntityRemoving = new Signal<void>();

	constructor(
		private readonly logger: Logger,
		private playerDataService: PlayerDataService,
		private playerRemovalService: PlayerRemovalService,
	) {}

	/** @hidden */
	public onInit(): void {
		Players.PlayerAdded.Connect((player) => {
			this.onPlayerJoin(player);
		});

		Players.PlayerRemoving.Connect((player) => {
			this.onPlayerRemoving(player);
		});

		game.BindToClose(() => {
			this.logger.Debug("Game closing, holding open until all player entities are removed.");
			while (!this.playerEntities.isEmpty()) {
				this.onEntityRemoving.Wait();
			}
			this.logger.Debug("All player entities removed, closing game.");
		});
	}

	/** @hidden */
	public onStart(): void {
		/** Setup callback for allowing player to request data */
		Functions.requestPlayerData.setCallback((player) => {
			return Promise.retry(() => this.onPlayerRequestedData(player), 3);
		});

		this.setupOnPlayerJoinLifecycle();
	}

	/**
	 * Binds any class that implements the OnPlayerJoin interface to the player
	 * join lifecycle event.
	 */
	private setupOnPlayerJoinLifecycle(): void {
		for (const [object, id] of Reflect.objToId) {
			if (!FlameworkUtil.isService(object)) {
				continue;
			}

			const dependency = Flamework.resolveDependency(id);
			if (Flamework.implements<OnPlayerJoin>(dependency)) {
				this.playerJoinEvents.set(id, dependency);
			}
		}
	}

	/**
	 * Called by the client to request their initial player data.
	 *
	 * @param player The player requesting their initial data
	 *
	 * @returns The player's current data if it exists.
	 */
	private async onPlayerRequestedData(player: Player): Promise<NetPlayerData> {
		const entity_opt = this.getEntity(player);
		return entity_opt.match<NetPlayerData>(
			(playerEntity: PlayerEntity) => NetResult.ok<IPlayerData>(playerEntity.data),
			() => NetResult.err<ServerError>(ServerError.NoPlayerEntity),
		);
	}

	/**
	 * Called internally when a player joins the game.
	 * @hidden
	 */
	private async onPlayerJoin(player: Player): Promise<void> {
		const playerProfile_opt = await this.playerDataService.loadPlayerProfile(player);
		if (playerProfile_opt.isNone()) {
			this.playerRemovalService.removeForBug(player, KickCode.PlayerEntityInstantiationError);
			return;
		}

		const playerProfile = playerProfile_opt.unwrap();
		const janitor = new Janitor<void>();
		const playerRemoving = new Janitor<void>();
		janitor.Add(() => {
			this.logger.Info(`Player {@Player} leaving game, cleaning up Janitor`, player);

			// Cleanup anything that has bound to this lifecycle event.
			playerRemoving.Destroy();

			// We want to add an attribute so systems like ProfileService know that a player is removing
			// when a profile is released.
			player.SetAttribute("PlayerRemoving", true);
			playerProfile.Release();

			this.playerEntities.delete(player);
			this.onEntityRemoving.Fire();
		}, true);

		const playerEntity = new PlayerEntity(player, janitor, playerRemoving, playerProfile);
		this.playerEntities.set(player, playerEntity);

		// Call all connected lifecycle events
		debug.profilebegin("Lifecycle_Player_Join");
		for (const [id, event] of this.playerJoinEvents) {
			debug.profilebegin(id);
			Promise.defer(() => {
				event.onPlayerJoin(playerEntity);
			});
			debug.profileend();
		}
		debug.profileend();
	}

	/**
	 * Called internally when a player is removed from the game.
	 * @hidden
	 */
	private onPlayerRemoving(player: Player): void {
		const entity_opt = this.getEntity(player);
		if (entity_opt.isSome()) {
			const entity = entity_opt.unwrap();
			entity.janitor.Destroy();
		}
	}

	/**
	 * Gets the `PlayerEntity` class for a given player.
	 *
	 * @param player Player to get the entity for.
	 *
	 * @returns The `PlayerEntity` class if it exists.
	 */
	public getEntity(player: Player): Option<PlayerEntity> {
		const entity = this.playerEntities.get(player);
		if (entity !== undefined) {
			return Option.some<PlayerEntity>(entity);
		}
		return Option.none<PlayerEntity>();
	}
}
