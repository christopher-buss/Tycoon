import { OnInit, OnStart, OnTick, Service } from "@flamework/core";
import { Teams } from "@rbxts/services";
import { IDropperInfo } from "server/components/lot/dropper";
import playerEntity from "server/modules/classes/player-entity";
import Parts, { PartInfoKey, PartInfoValue } from "shared/meta/part-info";
import { PathType, PathTypes } from "shared/meta/path-types";
import { LotService } from "./lot-service";
import { OnPlayerJoin } from "./player/player-service";

type Lot = string;

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
export class DropperService implements OnStart, OnInit, OnTick, OnPlayerJoin {
	private ownedDroppers: Map<Player, Map<PathType, Array<IDropperSimulatingInfo>>>;
	private simulatedDroppers: Map<Lot, Array<IDropperSimulating>>;
	private nextId: number;

	constructor(private readonly lotService: LotService) {
		this.ownedDroppers = new Map<Player, Map<PathType, Array<IDropperSimulatingInfo>>>();
		this.simulatedDroppers = new Map<Lot, Array<IDropperSimulating>>();
		this.nextId = 0;
	}

	public onInit() {
		for (const team of Teams.GetTeams()) {
			this.simulatedDroppers.set(team.Name, []);
		}
	}

	public onStart() {}

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
		print("------------- Adding owned dropper -------------");
		const simulatingInfo: IDropperSimulatingInfo = {
			LastDrop: os.clock(),
			Name: info.DropperType,
			Owner: info.Owner,
			Value: 0,
		};

		this.ownedDroppers.get(info.Owner)?.get(info.PathType)?.push(simulatingInfo);

		// if (currentlySimulatingArray) {
		// 	currentlySimulatingArray.push(simulatingInfo);
		// 	// this.ownedDroppers.get(info.Owner)?.set(info.PathType, currentlySimulating);
		// }

		print(this.ownedDroppers);
	}

	public onTick(dt: number): void {
		const droppersSpawnedThisTick = [];

		for (const [, ownedDroppers] of this.ownedDroppers) {
			// print(ownedDroppers);
			for (const [, simulatingDroppers] of ownedDroppers) {
				// print(simulatingDroppers);
				for (const dropper of simulatingDroppers) {
					const partInfo = Parts[dropper.Name as PartInfoKey] as PartInfoValue;
					if (os.clock() - dropper.LastDrop >= partInfo.DropTime) {
						this.spawnDropper(dropper);
					}
				}
			}
		}
	}

	private spawnDropper(dropper: IDropperSimulatingInfo): void {
		const progress = 0;

		const lot = dropper.Owner.GetAttribute("Lot") as string | undefined;
		if (lot === undefined) {
			return;
		}

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
			currentlySimulating.push(dropperInfo);
		}
	}

	private simulateDroppers(): void {}
}
