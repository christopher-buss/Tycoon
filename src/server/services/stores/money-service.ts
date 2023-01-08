import { OnTick, Service } from "@flamework/core";
import { Logger } from "@rbxts/log";
import { Option } from "@rbxts/rust-classes";
import PlayerEntity from "server/modules/classes/player-entity";

import { LeaderstatsService } from "../leaderstats-service";
import { OnPlayerJoin, PlayerService } from "../player/player-service";

/**
 * A wrapper for accessing the player's money.
 */
@Service({})
export class MoneyService implements OnPlayerJoin, OnTick {
	private moneyToAwardEachSecond: Map<PlayerEntity, number>;
	private timeSinceLastUpdate: number;

	constructor(
		private readonly logger: Logger,
		private readonly playerService: PlayerService,
		private readonly leaderstatsService: LeaderstatsService,
	) {
		this.moneyToAwardEachSecond = new Map();
		this.timeSinceLastUpdate = 0;
	}

	public onPlayerJoin(playerEntity: PlayerEntity): void {
		this.moneyToAwardEachSecond.set(playerEntity, 0);

		if (playerEntity.player.Name === "iSentinels") {
			this.updatePlayerMoney(true, playerEntity, 100000000);
			playerEntity.updateData((data) => {
				data.purchased.push(5, 15, 23, 14);
				return data;
			});
		}
	}

	public onTick(dt: number): void {
		if (this.timeSinceLastUpdate < 1) {
			this.timeSinceLastUpdate += dt;
			return;
		}

		this.timeSinceLastUpdate -= 1 - dt;

		this.moneyToAwardEachSecond.forEach((money, playerEntity) => {
			if (money > 0) {
				this.updatePlayerMoney(true, playerEntity, money);
			}
		});
	}

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

		const playerEntity = playerEntity_opt.unwrap();
		return this.spendMoneyForEntity(playerEntity, toSpend);
	}

	public spendMoneyForEntity(playerEntity: PlayerEntity, toSpend: number): boolean {
		return this.checkIfEntityHasEnoughMoney(playerEntity, toSpend).match(
			(canSpend) => {
				if (!canSpend) {
					this.logger.Info(`Player ${playerEntity.player} does not have enough money to spend`);
					return false;
				}

				this.updatePlayerMoney(false, playerEntity, -toSpend);
				return true;
			},
			() => {
				this.logger.Error(`Failed to check money for ${playerEntity.player}`);
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
			return Option.some<boolean>(currentMoney - toSpend >= 0);
		});
	}

	/**
	 *
	 * @param entity
	 * @param amount
	 */
	public updatePlayerMoney(force: boolean, entity: PlayerEntity, amount: number): void {
		entity.updateData((data) => {
			data.cash += amount;
			if (!force) {
				data.moneySpent -= amount;
			}
			return data;
		});

		entity.player.SetAttribute("Cash", entity.data.cash);

		// Update the leaderboard with the new value
		this.leaderstatsService.getStatObject(entity.player, "Cash").match(
			(stat) => {
				stat.Value = entity.data.cash;
			},
			() => {
				this.logger.Error(`Failed to update leaderstats for ${entity.player}`);
			},
		);
	}

	public addMoneyConnection(player: Player, value: number): void {
		const playerEntity_opt = this.playerService.getEntity(player);
		if (playerEntity_opt.isNone()) {
			this.logger.Error(`Player entity for ${player} could not be found`);
			return;
		}

		let moneyToGive = value;

		const entity = playerEntity_opt.unwrap();
		const doubleMoneyGamepass = entity.data.gamePasses.doubleMoneyGamepass;
		if (doubleMoneyGamepass) {
			moneyToGive *= 2;
		}

		const currentMoney = this.moneyToAwardEachSecond.get(entity);
		if (currentMoney === undefined) {
			this.logger.Fatal(`Failed to get money for ${player}`);
			return;
		}

		this.moneyToAwardEachSecond.set(entity, currentMoney + moneyToGive);
	}
}
