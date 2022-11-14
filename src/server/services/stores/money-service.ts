import { Service } from "@flamework/core";
import { Logger } from "@rbxts/log";
import { Option } from "@rbxts/rust-classes";
import PlayerEntity from "server/modules/classes/player-entity";
import { LeaderstatsService } from "../leaderstats-service";
import { PlayerService } from "../player/player-service";

/**
 * A wrapper for accessing the player's money.
 */
@Service({})
export class MoneyService {
	constructor(
		private readonly logger: Logger,
		private readonly playerService: PlayerService,
		private readonly leaderstatsService: LeaderstatsService,
	) {}

	/**
	 *
	 * @param entity
	 * @returns
	 */
	public getMoneyForEntity(entity: PlayerEntity): Option<number> {
		return Option.wrap<number>(entity.data.cash);
	}

	/**
	 * Returns the current cash for the given player.
	 * @param player
	 * @returns
	 */
	public getMoneyForPlayer(player: Player): Option<number> {
		return this.playerService.getEntity(player).andWith<number>((entity) => {
			return Option.some<number>(entity.data.cash);
		});
	}

	/**
	 *
	 * @param player
	 * @param toSpend
	 * @returns
	 */
	public spendMoney(player: Player, toSpend: number): boolean {
		const playerEntity_opt = this.playerService.getEntity(player);
		if (playerEntity_opt.isNone()) {
			this.logger.Error(`Player entity for ${player} could not be found`);
			return false;
		}

		const entity = playerEntity_opt.unwrap();
		return this.checkIfEntityHasEnoughMoney(entity, toSpend).match(
			(canSpend) => {
				if (!canSpend) {
					this.logger.Info(`Player ${player} does not have enough money to spend`);
					return false;
				}

				this.updatePlayerMoney(false, entity, -toSpend);
				return true;
			},
			() => {
				this.logger.Error(`Failed to check money for ${player}`);
				return false;
			},
		);
	}

	public givePlayerMoney(player: Player, toGive: number): void {
		this.playerService.getEntity(player).match<void>(
			(entity) => this.updatePlayerMoney(true, entity, toGive),
			() => this.logger.Error(`Failed to give money to ${player}`),
		);
	}

	public setPlayerMoneyToZero(entity: PlayerEntity): void {
		entity.updateData((data) => {
			data.cash = 0;
			return data;
		});

		entity.player.SetAttribute("Cash", entity.data.cash);

		// Update the leaderboard with the new value
		this.leaderstatsService.getStatObject(entity.player, "Yen").match(
			(stat) => {
				stat.Value = entity.data.cash;
			},
			() => {
				this.logger.Error(`Failed to update leaderstats for ${entity.player}`);
			},
		);
	}

	/**
	 *
	 * @param entity
	 * @param toSpend
	 * @returns
	 */
	private checkIfEntityHasEnoughMoney(entity: PlayerEntity, toSpend: number): Option<boolean> {
		return this.getMoneyForEntity(entity).andWith<boolean>((currentMoney) => {
			return Option.some<boolean>(currentMoney - toSpend > 0);
		});
	}

	/**
	 *
	 * @param entity
	 * @param amount
	 */
	private updatePlayerMoney(force: boolean, entity: PlayerEntity, amount: number): void {
		entity.updateData((data) => {
			data.cash += amount;
			if (!force) {
				data.moneySpent -= amount;
			}
			return data;
		});

		entity.player.SetAttribute("Cash", entity.data.cash);

		// Update the leaderboard with the new value
		this.leaderstatsService.getStatObject(entity.player, "Yen").match(
			(stat) => {
				stat.Value = entity.data.cash;
			},
			() => {
				this.logger.Error(`Failed to update leaderstats for ${entity.player}`);
			},
		);
	}
}
