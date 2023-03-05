import { OnInit, OnStart, OnTick, Service } from "@flamework/core";
import { Logger } from "@rbxts/log";
import { Option } from "@rbxts/rust-classes";
import { Teams } from "@rbxts/services";
import { IDropperInfo } from "server/components/lot/dropper";
import { Lot } from "server/components/lot/lot";
import { IUpgraderInfo } from "server/components/lot/upgrader";
import playerEntity from "server/modules/classes/player-entity";
import { Events } from "server/network";
import { calculateMultiplier } from "shared/functions/calculate-multiplier";
import { IPlayerData } from "shared/meta/default-player-data";
import { EncodePartIdentifier, encoderPartIdentifiers } from "shared/meta/part-identifiers";
import { DropperKey, PartInfo, PartInfoKey, PartInfoType } from "shared/meta/part-info";
import { NUMBER_OF_PATHS, PATH_INFO, REPLICATION_DISTANCE } from "shared/shared-constants";
import { PathNumber } from "types/interfaces/droppers";

import { OnPlayerJoin, PlayerService } from "../player/player-service";
import { MoneyService } from "../stores/money-service";
import { LotService, OnLotOwned, OnPlayerRebirthed } from "./lot-service";

type LotName = string;

interface IDropperSimulatingInfo {
	LastDrop: number;
	Name: string;
	Owner: Player;
	StartProgress: number;
	Value: number;
}

interface IDropperSimulating {
	Dropper: IDropperSimulatingInfo;
	Progress: number;
}

interface IOwnedUpgrader {
	Additive: number;
	Multiplier: number;
}

/**
 * TODO: Can Map<PathNumber> be changed to Array<Index>?
 */
@Service({})
export class DropperService implements OnInit, OnStart, OnTick, OnPlayerJoin, OnLotOwned, OnPlayerRebirthed {
	private connections: Map<Player, Set<Promise<number | void>>>;
	private lastDrop: Map<Player, Map<PathNumber, number>>;
	private lotPositions: Map<LotName, Vector3>;
	private ownedDroppers: Map<Player, Map<PathNumber, Array<IDropperSimulatingInfo>>>;
	private ownedUpgraders: Map<Player, Map<PathNumber, Array<IOwnedUpgrader>>>;
	private playersWithLot: Array<Player>;
	private simulatedDroppers: Map<LotName, Map<PathNumber, Array<IDropperSimulating>>>;
	private timeSinceLastPlayerInRangeUpdate: number;

	public lotToReplicateTo: Map<Player, LotName>;

	constructor(
		private readonly logger: Logger,
		private readonly lotService: LotService,
		private readonly moneyService: MoneyService,
		private readonly playerService: PlayerService,
	) {
		this.connections = new Map();
		this.lotPositions = new Map();
		this.lotToReplicateTo = new Map();
		this.ownedDroppers = new Map();
		this.ownedUpgraders = new Map();
		this.playersWithLot = [];
		this.simulatedDroppers = new Map();
		this.timeSinceLastPlayerInRangeUpdate = 0;

		this.lastDrop = new Map();
	}

	/**
	 *
	 * @param info
	 */
	public addOwnedDropper(info: IDropperInfo): void {
		const simulatingInfo: IDropperSimulatingInfo = {
			LastDrop: os.clock(),
			Name: info.DropperType,
			Owner: info.Owner,
			StartProgress: info.StartProgress,
			Value: (PartInfo[info.DropperType as PartInfoType] as PartInfoKey).Value,
		};

		this.ownedDroppers.get(info.Owner)?.get(info.Path)?.push(simulatingInfo);
	}

	/**
	 *
	 * @param upgraderInfo
	 */
	public addOwnedUpgrader(upgraderInfo: IUpgraderInfo): void {
		this.logger.Info(`Adding owned upgrader for ${upgraderInfo.Owner.Name}`);
		this.ownedUpgraders.get(upgraderInfo.Owner)?.get(upgraderInfo.Path)?.push({
			Additive: upgraderInfo.Additive,
			Multiplier: upgraderInfo.Multiplier,
		});
	}

	/**
	 *
	 */
	public onInit(): void {
		for (const team of Teams.GetTeams()) {
			this.simulatedDroppers.set(team.Name, new Map<PathNumber, Array<IDropperSimulating>>());
			for (let path = 0; path < NUMBER_OF_PATHS + 1; path++) {
				this.simulatedDroppers.get(team.Name)?.set(path, []);
			}
		}
	}

	/**
	 *
	 * @param _lot
	 * @param newOwner
	 * @returns
	 */
	public onLotOwned(_lot: Lot, newOwner: Player): void {
		this.playersWithLot.push(newOwner);

		this.ownedUpgraders.set(newOwner, new Map<PathNumber, Array<IOwnedUpgrader>>());
		for (let path = 0; path < NUMBER_OF_PATHS; path++) {
			this.ownedUpgraders.get(newOwner)?.set(path, []);
		}

		const entity_opt = this.playerService.getEntity(newOwner);
		if (entity_opt.isNone()) {
			return;
		}

		this.connections.set(newOwner, new Set());

		const playerEntity = entity_opt.unwrap();
		playerEntity.playerRemoving.Add(() => {
			const lotRemoving = playerEntity.player.GetAttribute("Lot") as LotName;

			this.lotToReplicateTo.forEach((lot, player) => {
				if (lot === lotRemoving) {
					Events.playerOutOfRangeOfLot.fire(player);
				}
			});

			const index = this.playersWithLot.indexOf(newOwner);
			if (index !== -1) {
				this.playersWithLot.unorderedRemove(index);
			}
		});

		this.lastDrop.set(newOwner, new Map<PathNumber, number>());
		for (let path = 0; path < NUMBER_OF_PATHS; path++) {
			this.lastDrop.get(newOwner)?.set(path, os.clock());
		}
	}

	/**
	 *
	 * @param playerEntity
	 */
	public onPlayerJoin(playerEntity: playerEntity): void {
		this.ownedDroppers.set(playerEntity.player, new Map<PathNumber, Array<IDropperSimulatingInfo>>());

		for (let path = 0; path < NUMBER_OF_PATHS + 1; path++) {
			this.ownedDroppers.get(playerEntity.player)?.set(path, []);
		}

		playerEntity.playerRemoving.Add(() => {
			this.ownedDroppers.delete(playerEntity.player);

			this.connections.get(playerEntity.player)?.forEach((thread) => {
				thread.cancel();
			});
		});
	}

	/**
	 *
	 * @param playerEntity
	 * @returns
	 */
	public onPlayerRebirthed(playerEntity: playerEntity): void {
		this.connections.get(playerEntity.player)?.forEach((thread) => {
			thread.cancel();
		});

		this.connections.set(playerEntity.player, new Set());

		for (let path = 0; path < NUMBER_OF_PATHS + 1; path++) {
			this.ownedDroppers.get(playerEntity.player)?.set(path, []);
		}

		this.ownedUpgraders.get(playerEntity.player)?.forEach((_, pathType) => {
			this.ownedUpgraders.get(playerEntity.player)?.set(pathType, []);
		});

		this.ownedUpgraders.set(playerEntity.player, new Map<PathNumber, Array<IOwnedUpgrader>>());

		const playerLot_opt = this.getLotFromDropperOwner(playerEntity.player);
		if (playerLot_opt.isNone()) {
			return;
		}

		const playerLot = playerLot_opt.unwrap();
		this.simulatedDroppers.get(playerLot)?.forEach((_, pathType) => {
			this.simulatedDroppers.get(playerLot)?.set(pathType, []);
		});
	}

	/**
	 *
	 */
	public onStart(): void {
		const lots = this.lotService.getAllLots();
		for (const lot of lots) {
			this.lotPositions.set(lot.name, lot.position);
		}
	}

	/**
	 *
	 * @param dt
	 */
	public onTick(dt: number): void {
		this.updatePlayersInRange(dt);

		this.ownedDroppers.forEach((ownedDroppers) => {
			ownedDroppers.forEach((simulatingDroppers, pathNumber) => {
				simulatingDroppers.forEach((dropper) => {
					const partInfo = PartInfo[dropper.Name as PartInfoType] as DropperKey;
					if (this.checkIfShouldSpawnDropper(pathNumber, partInfo, dropper)) {
						this.handleNewDropper(dropper, pathNumber);
					}
				});
			});
		});
	}

	/**
	 *
	 * @param path
	 * @param dropper
	 * @returns
	 */
	private awardCashToPlayer(dropper: IDropperSimulatingInfo, value: number): void {
		// Currently we're faking the simulation here by applying the cash to the player if they
		// own an upgrader at the point of the dropper despawning. TODO: Can this be done better?
		// const entity_opt = this.playerService.getEntity(dropper.Owner);
		// if (entity_opt.isNone()) {
		// 	this.logger.Error(`Could not find entity for player ${dropper.Owner.Name}`);
		// 	return;
		// }

		// let value = dropper.Value;

		// const ownedUpgraders = this.ownedUpgraders.get(dropper.Owner)?.get(path);
		// if (ownedUpgraders) {
		// 	ownedUpgraders.forEach((info) => {
		// 		value += info.Additive;
		// 		value *= info.Multiplier;
		// 	});
		// }

		// const playerEntity = entity_opt.unwrap();
		// const multiplier = calculateMultiplier(playerEntity.data as IPlayerData);

		// value *= multiplier;

		this.moneyService.givePlayerMoney(dropper.Owner, value);
	}

	private checkIfShouldSpawnDropper(
		pathNumber: PathNumber,
		partInfo: DropperKey,
		dropper: IDropperSimulatingInfo,
	): boolean {
		const lastDropTime = this.lastDrop.get(dropper.Owner)!.get(pathNumber)!;
		const nextPotentialDropTime = lastDropTime + 2 / this.ownedDroppers.get(dropper.Owner)!.get(pathNumber)!.size();

		return os.clock() - dropper.LastDrop >= partInfo.DropTime && os.clock() >= nextPotentialDropTime;
	}

	/**
	 *
	 * @param owner
	 * @returns
	 */
	private getLotFromDropperOwner(owner: Player): Option<LotName> {
		const lot = owner.GetAttribute("Lot") as string;
		if (lot === undefined) {
			this.logger.Fatal(`Could not find lot for player ${owner}`);
			return Option.none();
		}

		return Option.some(lot);
	}

	/**
	 *
	 * @param dropper
	 * @param pathNumber
	 * @returns
	 */
	private handleNewDropper(dropper: IDropperSimulatingInfo, pathNumber: PathNumber): void {
		const lotName_opt = this.getLotFromDropperOwner(dropper.Owner);
		if (lotName_opt.isNone()) {
			return;
		}

		const lotName = lotName_opt.unwrap();
		const newDropper = this.spawnDropper(lotName, pathNumber, dropper);
		if (newDropper) {
			this.replicateDropper(lotName, pathNumber, newDropper);
		}
	}

	/**
	 *
	 * @param lot
	 * @param pathNumber
	 * @param dropperInfo
	 */
	private replicateDropper(lot: LotName, pathNumber: PathNumber, dropperInfo: IDropperSimulating): void {
		const encodedDropperSimulating = new Vector2int16(
			pathNumber,
			encoderPartIdentifiers[dropperInfo.Dropper.Name as keyof EncodePartIdentifier],
		);

		this.lotToReplicateTo.forEach((lotName, player) => {
			if (lotName === lot) {
				Events.dropperSpawned.fire(player, encodedDropperSimulating);
			}
		});
	}

	private calculateDropperValue(path: PathNumber, dropper: IDropperSimulatingInfo): number {
		const entity_opt = this.playerService.getEntity(dropper.Owner);
		if (entity_opt.isNone()) {
			this.logger.Error(`Could not find entity for player ${dropper.Owner.Name}`);
			return 0;
		}

		let value = dropper.Value;

		const ownedUpgraders = this.ownedUpgraders.get(dropper.Owner)?.get(path);
		if (ownedUpgraders) {
			ownedUpgraders.forEach((info) => {
				value += info.Additive;
				value *= info.Multiplier;
			});
		}

		const playerEntity = entity_opt.unwrap();
		const multiplier = calculateMultiplier(playerEntity.data as IPlayerData);

		value *= multiplier;

		return value;
	}

	/**
	 *
	 * @param lot
	 * @param pathNumber
	 * @param dropper
	 * @returns
	 */
	private spawnDropper(lot: LotName, pathNumber: PathNumber, dropper: IDropperSimulatingInfo): IDropperSimulating {
		const progress = 0;

		this.logger.Debug(`Spawning dropper ${dropper.Name} for ${dropper.Owner.Name}`);

		dropper.LastDrop = os.clock();
		// dropper.Value = this.calculateDropperValue(pathNumber, dropper);

		this.lastDrop.get(dropper.Owner)!.set(pathNumber, os.clock());

		const dropperInfo: IDropperSimulating = {
			Dropper: table.clone(dropper),
			Progress: progress,
		};

		this.simulatedDroppers.get(lot)?.get(pathNumber)?.push(dropperInfo);

		// Calculate the time it takes to reach the end of the path
		const time =
			PATH_INFO[pathNumber]!.TotalTime * (1 - dropper.StartProgress / PATH_INFO[pathNumber]!.TotalProgress);

		const dropperValue = this.calculateDropperValue(pathNumber, dropper);

		const thread: Promise<void | number> = Promise.delay(time).andThen(() => {
			this.awardCashToPlayer(dropper, dropperValue);
			this.connections.get(dropper.Owner)?.delete(thread);

			const index = this.simulatedDroppers.get(lot)?.get(pathNumber)?.indexOf(dropperInfo);
			if (index !== undefined && index !== -1) {
				this.simulatedDroppers.get(lot)?.get(pathNumber)?.unorderedRemove(index);
			}
		});

		this.connections.get(dropper.Owner)?.add(thread);

		return dropperInfo;
	}

	/**
	 *
	 * @param dt
	 * @returns
	 */
	private updatePlayersInRange(dt: number): void {
		if (this.timeSinceLastPlayerInRangeUpdate < 1) {
			this.timeSinceLastPlayerInRangeUpdate += dt;
			return;
		}

		this.timeSinceLastPlayerInRangeUpdate -= 1 - dt;

		this.playersWithLot.forEach((player) => {
			let tycoonSet = false;
			for (const [lotName, lotPosition] of this.lotPositions) {
				const humanoidRootPart = player.Character?.FindFirstChild("HumanoidRootPart") as BasePart;
				if (!humanoidRootPart) {
					continue;
				}

				const playerPosition = humanoidRootPart.Position;
				if (playerPosition.sub(lotPosition).Magnitude > REPLICATION_DISTANCE) {
					continue;
				}

				if (this.lotToReplicateTo.get(player) === lotName) {
					tycoonSet = true;
					break;
				}

				this.lotToReplicateTo.set(player, lotName);
				tycoonSet = true;

				const dataToSend: Array<Vector3int16> = [];
				this.simulatedDroppers.get(lotName)?.forEach((droppers, pathNumber) => {
					for (const dropper of droppers) {
						const time = os.clock() - dropper.Dropper.LastDrop;
						const currentProgress =
							(time / PATH_INFO[pathNumber]!.TotalTime) * PATH_INFO[pathNumber]!.TotalProgress;

						dataToSend.push(
							new Vector3int16(
								encoderPartIdentifiers[dropper.Dropper.Name as keyof EncodePartIdentifier],
								pathNumber,
								math.floor(currentProgress),
							),
						);
					}
				});

				Events.playerInRangeOfLot.fire(player, lotName, dataToSend);
				break;
			}

			if (!tycoonSet && this.lotToReplicateTo.has(player)) {
				this.lotToReplicateTo.delete(player);
				Events.playerOutOfRangeOfLot.fire(player);
			}
		});
	}
}
