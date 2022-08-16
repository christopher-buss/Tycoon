import { Flamework, OnInit, Reflect, Service } from "@flamework/core";
import { Signal } from "@rbxts/beacon";
import { OnStart } from "@rbxts/flamework";
import { Janitor } from "@rbxts/janitor";
import Log from "@rbxts/log";
import { Option } from "@rbxts/rust-classes";
import { Players } from "@rbxts/services";
import PlayerEntity from "server/modules/classes/player-entity";
import { Functions } from "server/network";
import { IPlayerData, PlayerDataProfile } from "shared/meta/default-player-data";
import { isFlameworkService } from "shared/util/flamework-utils";
import KickCode from "types/enum/kick-reason";
import { IServerResponse } from "types/interfaces/network-types";
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

@Service({})
export class PlayerService implements OnInit, OnStart {
	private playerJoinEvents = new Map<string, OnPlayerJoin>();
	private playerEntities = new Map<Player, PlayerEntity>();
	private onEntityRemoving = new Signal<void>(); // Signal<T>

	constructor(private playerDataService: PlayerDataService, private playerRemovalService: PlayerRemovalService) {}

	public onInit(): void {
		Players.PlayerAdded.Connect((player) => {
			this.onPlayerJoin(player);
		});

		Players.PlayerRemoving.Connect((player) => {
			this.onPlayerRemoving(player);
		});

		game.BindToClose(() => {
			Log.Debug("Game closing, holding open until all player entities are removed.");
			while (!this.playerEntities.isEmpty()) {
				this.onEntityRemoving.Wait();
			}
			Log.Debug("All player entities removed, closing game.");
		});
	}

	public onStart(): void {
		// Functions.requestPlayerData.setCallback((p) => this.onPlayerRequestedData(p));
		Functions.requestPlayerData.setCallback((player) => {
			return this.onPlayerRequestedData(player);
		});

		for (const [object, id] of Reflect.objToId) {
			if (!isFlameworkService(object)) {
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
	 * TODO: Retry if their profile hasn't loaded yet, this will error if player data
	 * is requested too early.
	 */
	private async onPlayerRequestedData(player: Player): Promise<IServerResponse<IPlayerData>> {
		const entity_opt = this.getEntity(player);
		if (entity_opt.isNone()) {
			return {
				success: false,
				error: "No player entity",
			};
		}

		const entity = entity_opt.unwrap();
		return {
			success: true,
			data: entity.data,
		};
	}

	private async onPlayerJoin(player: Player): Promise<void> {
		const playerProfile: PlayerDataProfile | void = await this.playerDataService.loadPlayerProfile(player);
		if (!playerProfile) {
			this.playerRemovalService.removeForBug(player, KickCode.PlayerEntityInstantiationError);
			return;
		}

		const janitor = new Janitor();
		janitor.Add(() => {
			Log.Info(`Player {@Player} leaving game, cleaning up Janitor`, player);

			// We want to add an attribute so systems like ProfileService know that a player is removing
			// when a profile is released.
			player.SetAttribute("PlayerRemoving", true);
			playerProfile.Release();

			this.playerEntities.delete(player);
			this.onEntityRemoving.Fire();
		}, true);

		const playerEntity = new PlayerEntity(player, janitor, playerProfile);
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

	/** Tell an entity to clean up when the player leaves */
	private onPlayerRemoving(player: Player): void {
		const entity_opt = this.getEntity(player);
		if (entity_opt.isSome()) {
			const entity = entity_opt.unwrap();
			entity.janitor.Destroy();
		}
	}

	public getEntity(player: Player): Option<PlayerEntity> {
		const entity = this.playerEntities.get(player);
		if (entity !== undefined) {
			return Option.some<PlayerEntity>(entity);
		}
		return Option.none<PlayerEntity>();
	}

	/**
	 * This method wraps a callback and replaces the first argument (that must be of type
	 * `Player`) with that players `PlayerEntity` class.
	 */
	public withPlayerEntity<T extends Array<unknown>, R = void>(
		callback: (playerEntity: PlayerEntity, ...args: T) => R,
	) {
		return (player: Player, ...args: T): R | undefined => {
			const entity_opt = this.getEntity(player);
			if (entity_opt.isSome()) {
				const entity = entity_opt.unwrap();
				return callback(entity, ...args);
			}

			Log.Error(`No entity for player {@Player}, cannot continue to callback`, player);
		};
	}
}
