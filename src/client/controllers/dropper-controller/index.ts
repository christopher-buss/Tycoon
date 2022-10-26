import { Controller, OnInit, OnStart } from "@flamework/core";
import { Janitor } from "@rbxts/janitor";
import { Logger } from "@rbxts/log";
import PartCacheModule from "@rbxts/partcache";
import { PartCache } from "@rbxts/partcache/out/class";
import { Players, ReplicatedStorage, TweenService, Workspace } from "@rbxts/services";
import { Events } from "client/network";
import { ClientStore } from "client/rodux/rodux";
import { IUpgraderInfo } from "server/components/lot/upgrader";
import { decoderPartIdentifiers } from "shared/meta/part-identifiers";
import { PartInfo, PartInfoKey, Progress, ProgressKey } from "shared/meta/part-info";
import { NetworkedPathType, PathType, PathTypes } from "shared/meta/path-types";
import { DropperInfo } from "shared/network";
import { DUMPLING_TOTAL_TIME, LOT_NAMES } from "shared/shared-constants";

type DropperBillboard = BillboardGui & {
	PriceLabel: TextLabel & {
		UITextSizeConstraint: UITextSizeConstraint;
	};
};

type LotName = string;
type DropperProgress = number;

type DropperPart = (BasePart | MeshPart | Model) & {
	Price: DropperBillboard;
};

// interface ISimulationFunction: (part: BasePart) => void;

@Controller({})
export class DropperController implements OnStart, OnInit {
	private cachedConveyorLocations: Map<string, Array<Array<Vector3>>>;
	// private currentlySimulating: Array<Janitor<{ NumConnection: string | RBXScriptConnection }>>;
	private nearestTycoon: string | undefined;
	private partCache: Map<string, PartCache>;
	private readonly partCacheLocation: Folder;
	private upgradersOwned: Map<LotName, Map<PathType, Map<DropperProgress, Partial<IUpgraderInfo>>>>;

	constructor(private readonly logger: Logger) {
		this.cachedConveyorLocations = new Map();
		// this.currentlySimulating = [];
		this.partCache = new Map();
		this.partCacheLocation = new Instance("Folder");
		this.upgradersOwned = new Map<LotName, Map<PathType, Map<DropperProgress, Partial<IUpgraderInfo>>>>();
	}

	public onInit() {
		Events.dropperSpawned.connect((...args) => this.dropItem(...args));
		Events.playerInRangeOfLot.connect((...args) => this.receivePayload(...args));
		Events.playerOutOfRangeOfLot.connect(() => this.stopSimulation());
		Events.playerBoughtObject.connect((...args) => this.boughtUpgrader(...args));

		for (const lotName of LOT_NAMES) {
			this.upgradersOwned.set(lotName, new Map());
			for (const path of PathTypes) {
				this.upgradersOwned.get(lotName)!.set(path, new Map());
			}
		}

		this.partCacheLocation.Name = "Cache";
		this.partCacheLocation.Parent = Workspace;

		this.nearestTycoon = Players.LocalPlayer.GetAttribute("Lot") as string;
		if (this.nearestTycoon === undefined) {
			Players.LocalPlayer.GetAttributeChangedSignal("Lot").Once(() => {
				this.nearestTycoon = Players.LocalPlayer.GetAttribute("Lot") as string;
			});
		}
	}

	private boughtUpgrader(lotName: string, pathType: PathType, objectName: string) {
		const upgraderInfo: Partial<IUpgraderInfo> = {
			PathType: pathType,
			Value: PartInfo[objectName as PartInfoKey].Value,
		};

		const progress = Progress[objectName as ProgressKey].Progress;
		this.upgradersOwned.get(lotName)?.get(pathType)?.set(progress, upgraderInfo);
	}

	public onStart() {
		this.storeCachedConveyorLocations();
		const parts = ReplicatedStorage.PartInfo;
		for (const part of parts.GetChildren()) {
			task.spawn(() => {
				const partCache = new PartCacheModule(part as BasePart, 6, this.partCacheLocation);
				this.partCache.set(part.Name, partCache);
			});
		}
	}

	private dropItem(dropperType: number, dropperInfo: DropperInfo) {
		const partType: string = decoderPartIdentifiers[dropperInfo.X as never];
		const dropperId = dropperInfo.Y;

		const newPart = this.partCache.get(partType)?.GetPart() as DropperPart;
		if (!newPart) {
			return;
		}

		const ui = newPart.FindFirstChild("Price") as DropperBillboard;
		if (ui) {
			const data = ClientStore.getState().playerData;
			const partPrice =
				PartInfo[partType as PartInfoKey].Value *
				(1 + data.rebirths / 5) *
				(data.gamePasses.doubleMoneyGamepass ? 2 : 1);
			ui.PriceLabel.Text = tostring("¥" + partPrice);

			ui.SetAttribute("Price", partPrice);
		}

		if (this.nearestTycoon === undefined) {
			this.logger.Warn(`No lot found for player ${Players.LocalPlayer.Name}`);
			return;
		}

		newPart.PivotTo(new CFrame(this.cachedConveyorLocations.get(this.nearestTycoon!)![dropperType][dropperId]));
		newPart.Parent = Workspace;

		const totalTime = DUMPLING_TOTAL_TIME;
		const progress = 0;
		this.createTween(totalTime, progress, dropperType, partType, newPart);
	}

	private calculateNewPosition(dropperType: number, progress: number, step: number): Vector3 {
		const previousPosition = this.cachedConveyorLocations.get(this.nearestTycoon!)![dropperType][progress];
		const nextPosition = this.cachedConveyorLocations.get(this.nearestTycoon!)![dropperType][progress + 1];
		return previousPosition.Lerp(nextPosition, step);
	}

	private createTween(totalTime: number, progress: number, dropperType: number, partType: string, part: DropperPart) {
		const numValue = new Instance("NumberValue");
		numValue.Value = (1 / this.cachedConveyorLocations.get(this.nearestTycoon!)![dropperType].size()) * progress;

		const tweenInfo = new TweenInfo(totalTime, Enum.EasingStyle.Linear, Enum.EasingDirection.In, 0, false, 0);

		const newTween = TweenService.Create(numValue, tweenInfo, { Value: 1 });
		const tweenJanitor = new Janitor<{ NumConnection: string | RBXScriptConnection }>();

		tweenJanitor.Add(() => {
			task.defer(() => {
				this.partCache.get(partType)?.ReturnPart(part as BasePart);
			});
		});
		tweenJanitor.Add(
			newTween.GetPropertyChangedSignal("PlaybackState").Connect(() => {
				let oldProgress = progress;

				tweenJanitor.Add(
					numValue.Changed.Connect((t) => {
						const totalPoints = this.cachedConveyorLocations.get(this.nearestTycoon!)![dropperType].size();
						const currentProgress = math.floor(totalPoints * t) + 1;
						if (currentProgress >= totalPoints - 1) {
							return;
						}
						if (oldProgress !== currentProgress) {
							if (this.simulateDroppers(dropperType, "Dumpling", currentProgress, part)) {
								if (tweenJanitor) {
									tweenJanitor.Destroy();
								}
							}
							oldProgress = currentProgress;
						}

						const position = this.calculateNewPosition(dropperType, currentProgress, (totalPoints * t) % 1);
						part.PivotTo(new CFrame(position));
					}),
					"Disconnect",
					"NumConnection",
				);
			}),
		);

		// tweenJanitor.Add(() => newTween.Cancel());

		tweenJanitor.Add(
			newTween.Completed.Connect(() => {
				tweenJanitor.Destroy();
			}),
		);

		newTween.Play();
	}

	/**
	 * Stores all the cached locations of the conveyor belts in the game.
	 *
	 * This is due to streaming enabled, it is not guaranteed that the parts
	 * will be available to the player when the game starts.
	 */
	private storeCachedConveyorLocations() {
		for (const module of script.GetChildren()) {
			if (module.IsA("ModuleScript")) {
				const tycoon = module.Name;
				const locations = require(module) as Array<Array<Vector3>>;
				this.cachedConveyorLocations.set(tycoon, locations);
			}
		}
	}

	private updateUi(ui: DropperBillboard, value: number): void {
		const price =
			(ui.GetAttribute("Price") as number) +
			(ClientStore.getState().playerData.gamePasses.doubleMoneyGamepass ? value * 2 : value);
		ui.SetAttribute("Price", price);
		ui.PriceLabel.Text = tostring("¥" + price);
	}

	private simulateDroppers(
		dropperType: number,
		pathType: PathType,
		upgraderProgress: number,
		part: DropperPart,
	): boolean {
		// if (upgraderProgress === 348) {
		// 	const position = this.cachedConveyorLocations.get(this.nearestTycoon!)![NetworkedPathType[pathType]][348];
		// 	const crate = this.partCache.get("Crate")?.GetPart() as DropperPart;
		// 	if (crate) {
		// 		crate.PivotTo(new CFrame(position));
		// 		this.createTween(DUMPLING_TOTAL_TIME * (1 - 348 / 555), 348, dropperType, "Crate", crate);
		// 		crate.Price.SetAttribute("Price", part.Price.GetAttribute("Price"));
		// 		const value = this.upgradersOwned.get(this.nearestTycoon!)?.get(pathType)?.get(upgraderProgress);
		// 		this.updateUi(crate.Price, value!.Value!);
		// 		return true;
		// 	}
		// }

		if (this.upgradersOwned.get(this.nearestTycoon!)?.get(pathType)?.get(upgraderProgress) === 384) {
			const position = this.cachedConveyorLocations.get(this.nearestTycoon!)![NetworkedPathType[pathType]][348];
			const crate = this.partCache.get("Crate")?.GetPart() as DropperPart;
			if (crate) {
				crate.PivotTo(new CFrame(position));
				this.createTween(DUMPLING_TOTAL_TIME * (1 - 348 / 555), 348, dropperType, "Crate", crate);
				crate.Price.SetAttribute("Price", part.Price.GetAttribute("Price"));
				const value = this.upgradersOwned.get(this.nearestTycoon!)?.get(pathType)?.get(upgraderProgress);
				this.updateUi(crate.Price, value!.Value!);
				return true;
			}
		}

		const value = this.upgradersOwned.get(this.nearestTycoon!)?.get(pathType)?.get(upgraderProgress);
		if (value !== undefined) {
			this.updateUi(part.Price, value.Value!);
			// playAudio();
		}

		return false;
	}

	private stopSimulation() {}

	private receivePayload(lotName: string, data: Map<PathType, Vector2int16>) {
		this.nearestTycoon = lotName;
	}
}
