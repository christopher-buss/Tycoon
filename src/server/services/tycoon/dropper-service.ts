import { OnInit, OnTick, Service } from "@flamework/core";
import { Logger } from "@rbxts/log";
import { Teams } from "@rbxts/services";
import { IDropperInfo } from "server/components/lot/dropper";
import { Lot } from "server/components/lot/lot";
import { IUpgraderInfo } from "server/components/lot/upgrader";
import playerEntity from "server/modules/classes/player-entity";
import { Events } from "server/network";
import { EncodePartIdentifier, encoderPartIdentifiers } from "shared/meta/part-identifiers";
import Parts, { PartInfoKey, PartInfoValue } from "shared/meta/part-info";
import { NetworkedPathType, PathType, PathTypes } from "shared/meta/path-types";
import { DUMPLING_TOTAL_TIME, REPLICATION_DISTANCE } from "shared/shared-constants";
import { OnPlayerJoin, PlayerService } from "../player/player-service";
import { MoneyService } from "../stores/money-service";
import { LotService, OnLotOwned } from "./lot-service";

type LotName = string;

interface IDropperSimulatingInfo {
	LastDrop: number;
	Name: string;
	Owner: Player;
	Value: number;
}

interface IDropperSimulating {
	Dropper: IDropperSimulatingInfo;
	Progress: number;
	Id: number;
}

@Service({})
export class DropperService implements OnInit, OnTick, OnPlayerJoin, OnLotOwned {
	private nextId: number;
	private timeSinceLastPlayerInRangeUpdate: number;

	private ownedDroppers: Map<Player, Map<PathType, Array<IDropperSimulatingInfo>>>;
	private ownedUpgraders: Map<Player, Map<PathType, number[]>>;
	private simulatedDroppers: Map<LotName, Map<PathType, Array<IDropperSimulating>>>;
	private playersWithLot: Player[];
	private lotPositions: Map<LotName, Vector3>;

	private lotToReplicateTo: Map<Player, LotName>;

	constructor(
		private readonly logger: Logger,
		private readonly lotService: LotService,
		private readonly moneyService: MoneyService,
		private readonly playerService: PlayerService,
	) {
		this.nextId = 0;
		this.timeSinceLastPlayerInRangeUpdate = 0;

		this.ownedDroppers = new Map<Player, Map<PathType, Array<IDropperSimulatingInfo>>>();
		this.simulatedDroppers = new Map<LotName, Map<PathType, Array<IDropperSimulating>>>();
		this.playersWithLot = [];
		this.lotPositions = new Map<LotName, Vector3>();

		this.lotToReplicateTo = new Map<Player, LotName>();

		this.ownedUpgraders = new Map<Player, Map<PathType, number[]>>();
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

	public onInit() {
		for (const team of Teams.GetTeams()) {
			for (const _path of PathTypes) {
				this.simulatedDroppers.set(team.Name, new Map<PathType, Array<IDropperSimulating>>());
			}
		}

		const lots = this.lotService.getAllLots();
		for (const lot of lots) {
			this.lotPositions.set(lot.name, lot.position);
		}
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
		});
	}

	public addOwnedDropper(info: IDropperInfo): void {
		const simulatingInfo: IDropperSimulatingInfo = {
			LastDrop: os.clock(),
			Name: info.DropperType,
			Owner: info.Owner,
			Value: Parts[info.DropperType as PartInfoKey].Value,
		};

		this.ownedDroppers.get(info.Owner)?.get(info.PathType)?.push(simulatingInfo);

		// if (currentlySimulatingArray) {
		// 	currentlySimulatingArray.push(simulatingInfo);
		// 	// this.ownedDroppers.get(info.Owner)?.set(info.PathType, currentlySimulating);
		// }
	}

	public onTick(dt: number): void {
		this.updatePlayersInRange(dt);

		for (const [player, ownedDroppers] of this.ownedDroppers) {
			for (const [pathType, simulatingDroppers] of ownedDroppers) {
				for (const dropper of simulatingDroppers) {
					const partInfo = Parts[dropper.Name as PartInfoKey] as PartInfoValue;
					if (os.clock() - dropper.LastDrop >= partInfo.DropTime) {
						const newDropper = this.spawnDropper(pathType, dropper);
						if (newDropper) {
							this.replicateDropper(player, NetworkedPathType[pathType], newDropper);
						}
					}
				}
			}
		}
	}

	private updatePlayersInRange(dt: number): void {
		if (this.timeSinceLastPlayerInRangeUpdate < 1) {
			this.timeSinceLastPlayerInRangeUpdate += dt;
			return;
		}

		this.timeSinceLastPlayerInRangeUpdate -= 1 - dt;

		for (const player of this.playersWithLot) {
			let tycoonSet = false;
			this.lotPositions.forEach((lotPosition, lotName) => {
				const humanoidRootPart = player.Character?.FindFirstChild("HumanoidRootPart") as BasePart;
				if (!humanoidRootPart) {
					return;
				}

				const playerPosition = humanoidRootPart.Position;
				if (!(playerPosition.sub(lotPosition).Magnitude < REPLICATION_DISTANCE)) {
					return;
				}

				if (this.lotToReplicateTo.get(player) === lotName) {
					tycoonSet = true;
					return;
				}

				this.lotToReplicateTo.set(player, lotName);
				tycoonSet = true;

				const dataToSend: Map<PathType, Vector2int16> = new Map<PathType, Vector2int16>();
				for (const [, simulating] of this.simulatedDroppers) {
					for (const [pathType, droppers] of simulating) {
						for (const dropper of droppers) {
							dataToSend.set(pathType, new Vector2int16(dropper.Progress, dropper.Id));
						}
					}
				}

				Events.playerInRangeOfLot.fire(player, lotName, dataToSend);
			});

			if (!tycoonSet && this.lotToReplicateTo.has(player)) {
				this.lotToReplicateTo.delete(player);
				Events.playerOutOfRangeOfLot.fire(player);
			}
		}
	}

	private spawnDropper(pathType: PathType, dropper: IDropperSimulatingInfo): IDropperSimulating | undefined {
		const progress = 0;

		const lot = dropper.Owner.GetAttribute("Lot") as string | undefined;
		if (lot === undefined) {
			return;
		}

		this.logger.Debug(`Spawning dropper ${dropper.Name} for ${dropper.Owner.Name}`);

		dropper.LastDrop = os.clock();

		const dropperInfo: IDropperSimulating = {
			Dropper: dropper,
			Progress: progress,
			Id: this.nextId,
		};

		// Keep Id between 0 and 32000
		this.nextId = (this.nextId % 32000) + 1;

		const currentlySimulating = this.simulatedDroppers.get(lot);
		if (currentlySimulating) {
			const path = currentlySimulating.get(pathType);
			if (path) {
				path.push(dropperInfo);
			}
		}

		task.delay(DUMPLING_TOTAL_TIME, () => this.awardCashToPlayer(pathType, dropper));

		return dropperInfo;
	}

	private replicateDropper(player: Player, dropperType: NetworkedPathType, dropperInfo: IDropperSimulating): void {
		const encodedDropperSimulating = new Vector2int16(
			encoderPartIdentifiers[dropperInfo.Dropper.Name as keyof EncodePartIdentifier],
			dropperInfo.Id,
		);

		Events.dropperSpawned.fire(player, dropperType, encodedDropperSimulating);
	}

	private awardCashToPlayer(pathType: PathType, dropper: IDropperSimulatingInfo) {
		// Currently we're faking the simulation here by applying the cash to the player if they
		// own an upgrader at the point of the dropper despawning. TODO: Can this be done better?
		const entity_opt = this.playerService.getEntity(dropper.Owner);
		if (entity_opt.isNone()) {
			this.logger.Error(`Could not find entity for player ${dropper.Owner.Name}`);
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
