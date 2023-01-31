import { Components } from "@flamework/components";
import { Flamework, Modding, OnStart, Reflect, Service } from "@flamework/core";
import { Logger } from "@rbxts/log";
import { Option, Result } from "@rbxts/rust-classes";
import { Lot } from "server/components/lot/lot";
import PlayerEntity from "server/modules/classes/player-entity";
import { FlameworkUtil } from "shared/util/flamework-utils";
import PlayerKickReason from "types/enum/kick-reason";
import { LotErrors } from "types/interfaces/lots";

import PlayerRemovalService from "../player/player-removal-service";
import { OnPlayerJoin } from "../player/player-service";

export interface OnLotOwned {
	/**
	 * This function will be called whenever the player owns their desired lot.
	 *
	 * This should only used if you want to have extra functionality after
	 * the player owns their own lot.
	 *
	 * @param lot lot now owned by the player.
	 * @param newOwner player that now owns the lot.
	 */
	onLotOwned(lot: Lot, newOwner: Player): void;
}

export interface OnPlayerRebirthed {
	onPlayerRebirthed(playerEntity: PlayerEntity): void;
}

const rng = new Random();

/**
 * A service which handles any functionality related to lots.
 */
@Service({})
export class LotService implements OnStart, OnPlayerJoin, OnPlayerRebirthed {
	public onPlayerRebirthedEvents: Map<string, OnPlayerRebirthed>;
	public numberOfPurchaseableItems: number;

	private lotOwnedObjs: Set<OnLotOwned>;

	constructor(
		private readonly logger: Logger,
		private readonly components: Components,
		private readonly playerRemovalService: PlayerRemovalService,
	) {
		this.onPlayerRebirthedEvents = new Map();
		this.numberOfPurchaseableItems = 46;
		this.lotOwnedObjs = new Set();
	}

	public onStart(): void {
		Modding.onListenerAdded<OnLotOwned>((object) => {
			this.lotOwnedObjs.add(object);
		});

		Modding.onListenerRemoved<OnLotOwned>((object) => {
			this.lotOwnedObjs.delete(object);
		});

		this.setupOnPlayerRebirthedLifecycle();
	}

	/** @hidden */
	public onPlayerJoin(playerEntity: PlayerEntity): void {
		playerEntity.playerRemoving.Add(() => {
			this.onPlayerRemoving(playerEntity.player);
		});

		const player = playerEntity.player;
		if (!this.areLotsAvailable()) {
			this.logger.Error(`There are no lots available in this server. Kicking {@Player}...`);
			this.playerRemovalService.removeForBug(player, PlayerKickReason.PlayerFullServer);
			return;
		}

		const assign_res = this.assignRandomLotToPlayer(playerEntity);
		if (assign_res.isErr()) {
			this.logger.Error(`There are no available lots in this server!`);
			this.playerRemovalService.removeForBug(player, PlayerKickReason.PlayerFullServer);
		}
	}

	/**
	 * Assigns a random lot to the player.
	 *
	 * @param playerEntity
	 * @returns the component id of the lot assigned to the player if
	 * successful.
	 */
	public assignRandomLotToPlayer(playerEntity: PlayerEntity): Result<string, LotErrors> {
		const vacantLot = this.getVacantLots();
		const randomLot_opt = Option.wrap(vacantLot[rng.NextInteger(0, vacantLot.size() - 1)]);
		return randomLot_opt.match<Result<string, LotErrors>>(
			(lot: Lot) => lot.assignOwner(playerEntity).map<string>(() => lot.name),
			() => Result.err<string, LotErrors>(LotErrors.NoLots),
		);
	}

	/**
	 * @returns an array of all vacant lots.
	 */
	public getVacantLots(): Array<Lot> {
		return this.getAllLots().filter((lot) => lot.getOwner().isNone());
	}

	/**
	 * @returns true if there are any available lots in this server.
	 */
	public areLotsAvailable(): boolean {
		return !this.getAllLots().isEmpty();
	}

	/**
	 * @returns all the lots in the server, occupied or otherwise.
	 */
	public getAllLots(): Array<Lot> {
		return this.components.getAllComponents<Lot>();
	}

	/**
	 * Fires `OnLotOwned` event hook.
	 *
	 * **BE CAREFUL**: This method is dangerous (and hidden) because it would
	 * have serious issues.
	 * @hidden
	 */
	public fireOnLotOwned(lot: Lot): void {
		const owner = lot.getOwner().expect(`[${lot.name}]: Expected owner in lot`);
		for (const listener of this.lotOwnedObjs) {
			task.spawn(() => listener.onLotOwned(lot, owner));
		}
	}

	/**
	 * Gets the lot of the given player.
	 *
	 * @param player The player to get the lot of.
	 *
	 * @returns The lot component if the player currently has a lot.
	 */
	public getLotFromPlayer(player: Player): Option<Lot> {
		for (const lot of this.getAllLots()) {
			if (lot.getOwner().contains(player)) {
				return Option.some<Lot>(lot);
			}
		}
		return Option.none<Lot>();
	}

	/**
	 * Called internally when a player leaves the game.
	 * @param player
	 */
	private onPlayerRemoving(player: Player): void {
		const lot_opt = this.getLotFromPlayer(player);
		if (lot_opt.isNone()) {
			this.logger.Info("Player does not own a lot");
			return;
		}

		const lot = lot_opt.unwrap();
		const result = lot.clearOwner();
		if (result.isErr()) {
			this.logger.Info(`Failed to clear ownership of lot for {@Player}. Error: {Code} ", ${result.unwrapErr()}`);
			return;
		}

		this.logger.Info(`Cleared ownership of lot for {@Player}`);
	}

	private setupOnPlayerRebirthedLifecycle(): void {
		for (const [object, id] of Reflect.objToId) {
			if (!FlameworkUtil.isService(object)) {
				continue;
			}

			const dependency = Flamework.resolveDependency(id);

			if (Flamework.implements<OnPlayerRebirthed>(dependency)) {
				this.onPlayerRebirthedEvents.set(id, dependency);
			}
		}
	}

	public onPlayerRebirthed(playerEntity: PlayerEntity): void {
		const lots = this.getAllLots();
		for (const lot of lots) {
			if (lot.getOwner().contains(playerEntity.player)) {
				lot.loadPurchaseButtons(playerEntity);
			}
		}
	}
}
