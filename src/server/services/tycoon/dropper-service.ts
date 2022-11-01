import { OnInit, OnStart, OnTick, Service } from "@flamework/core";
import { Logger } from "@rbxts/log";
import { Teams } from "@rbxts/services";
import { IDropperInfo } from "server/components/lot/dropper";
import { Lot } from "server/components/lot/lot";
import { IUpgraderInfo } from "server/components/lot/upgrader";
import playerEntity from "server/modules/classes/player-entity";
import { Events } from "server/network";
import { EncodePartIdentifier, encoderPartIdentifiers } from "shared/meta/part-identifiers";
import { PartInfo, PartInfoKey, PartInfoValue } from "shared/meta/part-info";
import { NetworkedPathType, PathType, PathTypes } from "shared/meta/path-types";
import { REPLICATION_DISTANCE, TOTAL_PROGRESS, TOTAL_TIME } from "shared/shared-constants";
import { OnPlayerJoin, PlayerService } from "../player/player-service";
import { MoneyService } from "../stores/money-service";
import { LotService, OnLotOwned } from "./lot-service";

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

@Service({})
export class DropperService implements OnInit, OnStart, OnTick, OnPlayerJoin, OnLotOwned {
	private connections: Map<Player, Set<Promise<number | void>>>;
	private lotPositions: Map<LotName, Vector3>;
	private lotToReplicateTo: Map<Player, LotName>;
	private ownedDroppers: Map<Player, Map<PathType, Array<IDropperSimulatingInfo>>>;
	private ownedUpgraders: Map<Player, Map<PathType, number[]>>;
	private playersWithLot: Player[];
	private simulatedDroppers: Map<LotName, Map<PathType, Array<IDropperSimulating>>>;
	private timeSinceLastPlayerInRangeUpdate: number;

	constructor(
		private readonly logger: Logger,
		private readonly lotService: LotService,
		private readonly moneyService: MoneyService,
		private readonly playerService: PlayerService,
	) {
		this.connections = new Map<Player, Set<Promise<number | void>>>();
		this.lotPositions = new Map<LotName, Vector3>();
		this.lotToReplicateTo = new Map<Player, LotName>();
		this.ownedDroppers = new Map<Player, Map<PathType, Array<IDropperSimulatingInfo>>>();
		this.ownedUpgraders = new Map<Player, Map<PathType, number[]>>();
		this.playersWithLot = [];
		this.simulatedDroppers = new Map<LotName, Map<PathType, Array<IDropperSimulating>>>();
		this.timeSinceLastPlayerInRangeUpdate = 0;
	}

	public onInit() {
		for (const team of Teams.GetTeams()) {
			this.simulatedDroppers.set(team.Name, new Map<PathType, Array<IDropperSimulating>>());
			for (const path of PathTypes) {
				this.simulatedDroppers.get(team.Name)?.set(path, []);
			}
		}
	}

	public onStart(): void {
		const lots = this.lotService.getAllLots();
		for (const lot of lots) {
			this.lotPositions.set(lot.name, lot.position);
		}
	}

	public addOwnedUpgrader(upgraderInfo: IUpgraderInfo) {
		this.ownedUpgraders.get(upgraderInfo.Owner)?.get(upgraderInfo.PathType)?.push(upgraderInfo.Value);
	}

	public getPlayersInRangeOfLot(lotName: LotName): Player[] {
		const playersInRange: Player[] = [];
		this.lotToReplicateTo.forEach((value, key) => {
			if (value === lotName) {
				playersInRange.push(key);
			}
		});

		return playersInRange;
	}

	public onLotOwned(_lot: Lot, newOwner: Player): void {
		this.playersWithLot.push(newOwner);

		this.ownedUpgraders.set(newOwner, new Map<PathType, number[]>());
		for (const path of PathTypes) {
			this.ownedUpgraders.get(newOwner)?.set(path, []);
		}

		const entity_opt = this.playerService.getEntity(newOwner);
		if (entity_opt.isNone()) {
			return;
		}

		const playerEntity = entity_opt.unwrap();
		playerEntity.playerRemoving.Add(() => {
			const index = this.playersWithLot.indexOf(newOwner);
			if (index !== -1) {
				this.playersWithLot.remove(index);
			}
		});
	}

	public onPlayerJoin(playerEntity: playerEntity): void {
		this.ownedDroppers.set(playerEntity.player, new Map<PathType, Array<IDropperSimulatingInfo>>());

		for (const path of PathTypes) {
			this.ownedDroppers.get(playerEntity.player)?.set(path, []);
		}

		playerEntity.playerRemoving.Add(() => {
			this.ownedDroppers.delete(playerEntity.player);

			this.connections.get(playerEntity.player)?.forEach((thread) => {
				thread.cancel();
			});
		});
	}

	public addOwnedDropper(info: IDropperInfo): void {
		const simulatingInfo: IDropperSimulatingInfo = {
			LastDrop: os.clock(),
			Name: info.DropperType,
			Owner: info.Owner,
			StartProgress: info.StartProgress,
			Value: PartInfo[info.DropperType as PartInfoKey].Value,
		};

		this.ownedDroppers.get(info.Owner)?.get(info.PathType)?.push(simulatingInfo);
	}

	public onTick(dt: number): void {
		this.updatePlayersInRange(dt);

		for (const [, ownedDroppers] of this.ownedDroppers) {
			for (const [pathType, simulatingDroppers] of ownedDroppers) {
				for (const dropper of simulatingDroppers) {
					const partInfo = PartInfo[dropper.Name as PartInfoKey] as PartInfoValue;
					if (os.clock() - dropper.LastDrop >= partInfo.DropTime) {
						const lotName = this.getLotFromDropperOwner(dropper.Owner);
						const newDropper = this.spawnDropper(lotName, pathType, dropper);
						if (newDropper) {
							this.replicateDropper(lotName, NetworkedPathType[pathType], newDropper);
						}
					}
				}
			}
		}
	}

	private getLotFromDropperOwner(owner: Player): LotName {
		const lot = owner.GetAttribute("Lot") as string | undefined;
		if (lot === undefined) {
			this.logger.Error(`Could not find lot for player ${owner}`);
			return "";
		}

		return lot;
	}

	private updatePlayersInRange(dt: number): void {
		if (this.timeSinceLastPlayerInRangeUpdate < 1) {
			this.timeSinceLastPlayerInRangeUpdate += dt;
			return;
		}

		this.timeSinceLastPlayerInRangeUpdate -= 1 - dt;

		for (const player of this.playersWithLot) {
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

				const dataToSend: Vector3int16[] = [];
				for (const [, simulating] of this.simulatedDroppers) {
					for (const [pathType, droppers] of simulating) {
						for (const dropper of droppers) {
							const time = os.clock() - dropper.Dropper.LastDrop;
							const currentProgress = (time / TOTAL_TIME[pathType]) * TOTAL_PROGRESS[pathType];

							dataToSend.push(
								new Vector3int16(
									encoderPartIdentifiers[dropper.Dropper.Name as keyof EncodePartIdentifier],
									NetworkedPathType[pathType],
									math.floor(currentProgress),
								),
							);
						}
					}
				}

				Events.playerInRangeOfLot.fire(player, lotName, dataToSend);
				break;
			}

			if (!tycoonSet && this.lotToReplicateTo.has(player)) {
				this.lotToReplicateTo.delete(player);
				Events.playerOutOfRangeOfLot.fire(player);
			}
		}
	}

	private spawnDropper(
		lot: LotName,
		pathType: PathType,
		dropper: IDropperSimulatingInfo,
	): IDropperSimulating | undefined {
		const progress = 0;

		this.logger.Debug(`Spawning dropper ${dropper.Name} for ${dropper.Owner.Name}`);

		dropper.LastDrop = os.clock();

		const dropperInfo: IDropperSimulating = {
			Dropper: table.clone(dropper),
			Progress: progress,
		};

		this.simulatedDroppers.get(lot)?.get(pathType)?.push(dropperInfo);

		// Calculate the time it takes to reach the end of the path
		const time = TOTAL_TIME[pathType] * (1 - dropper.StartProgress / TOTAL_PROGRESS[pathType]);
		const thread = Promise.delay(time).andThen(() => {
			this.awardCashToPlayer(pathType, dropper);
			this.connections.get(dropper.Owner)?.delete(thread);

			const index = this.simulatedDroppers.get(lot)?.get(pathType)?.indexOf(dropperInfo);
			if (index !== undefined && index !== -1) {
				this.simulatedDroppers.get(lot)?.get(pathType)?.unorderedRemove(index);
			}
		});

		this.connections.get(dropper.Owner)?.add(thread);

		return dropperInfo;
	}

	private replicateDropper(lot: LotName, pathType: NetworkedPathType, dropperInfo: IDropperSimulating): void {
		const encodedDropperSimulating = new Vector2int16(
			pathType,
			encoderPartIdentifiers[dropperInfo.Dropper.Name as keyof EncodePartIdentifier],
		);

		this.lotToReplicateTo.forEach((lotName, player) => {
			if (lotName === lot) {
				Events.dropperSpawned.fire(player, encodedDropperSimulating);
			}
		});
	}

	private awardCashToPlayer(pathType: PathType, dropper: IDropperSimulatingInfo) {
		// Currently we're faking the simulation here by applying the cash to the player if they
		// own an upgrader at the point of the dropper despawning. TODO: Can this be done better?
		const entity_opt = this.playerService.getEntity(dropper.Owner);
		if (entity_opt.isNone()) {
			this.logger.Error(`Could not find entity for player ${dropper.Owner.Name}`);
			return;
		}

		let value = dropper.Value;

		const entity = entity_opt.unwrap();
		const doubleMoneyGamepass = entity.data.gamePasses.doubleMoneyGamepass;
		if (doubleMoneyGamepass) {
			value *= 2;
		}

		const ownedUpgraders = this.ownedUpgraders.get(dropper.Owner)?.get(pathType);
		if (ownedUpgraders) {
			ownedUpgraders.forEach((upgraderValue) => {
				value += upgraderValue;
			});
		}

		this.moneyService.givePlayerMoney(dropper.Owner, value);
	}
}
