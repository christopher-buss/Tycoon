import { Controller, OnInit, OnStart } from "@flamework/core";
import { Janitor } from "@rbxts/janitor";
import { Logger } from "@rbxts/log";
import PartCacheModule from "@rbxts/partcache";
import { PartCache } from "@rbxts/partcache/out/class";
import { Players, ReplicatedStorage, TweenService, Workspace } from "@rbxts/services";
import SoundSystem from "client/modules/3d-sound-system";
import { Events } from "client/network";
import { ClientStore } from "client/rodux/rodux";
import { IUpgraderInfo } from "server/components/lot/upgrader";
import { decoderPartIdentifiers } from "shared/meta/part-identifiers";
import { PartInfo, PartInfoKey, PartInfoType, Progress, ProgressKey, UpgraderKey } from "shared/meta/part-info";
import { DropperInfo } from "shared/network";
import { LOT_NAMES, NUMBER_OF_PATHS, PATH_INFO } from "shared/shared-constants";
import { PathNumber } from "types/interfaces/droppers";
import { LotName } from "types/interfaces/lots";

type DropperBillboard = BillboardGui & {
	PriceLabel: TextLabel & {
		UITextSizeConstraint: UITextSizeConstraint;
	};
};

type DropperProgress = number;

export type DropperPart = (BasePart | MeshPart | Model) & {
	Price: DropperBillboard;
};

type ISimulationFunction = (
	part: DropperPart,
	pathNumber: PathNumber,
	upgraderProgress: number,
) => boolean | LuaTuple<[boolean, DropperPart?]>;

@Controller({})
export class DropperController implements OnStart, OnInit {
	private cachedConveyorLocations: Map<string, Array<Array<Vector3>>>;
	private currentlySimulating: Set<Janitor<{ NumConnection: string | RBXScriptConnection }>>;
	private nearestTycoon: string | undefined;
	private partCache: Map<string, PartCache>;
	private upgradersOwned: Map<LotName, Map<PathNumber, Map<DropperProgress, Partial<IUpgraderInfo>>>>;
	private simulationFunctions: Map<PathNumber, Map<number, ISimulationFunction>>;
	private audioFiles = new Map<PathNumber, Map<number, string>>();

	private readonly partCacheLocation: Folder;

	constructor(private readonly logger: Logger) {
		this.audioFiles = new Map();
		this.currentlySimulating = new Set();
		this.partCache = new Map();
		this.partCacheLocation = new Instance("Folder");
		this.simulationFunctions = new Map();
		this.upgradersOwned = new Map<LotName, Map<PathNumber, Map<DropperProgress, Partial<IUpgraderInfo>>>>();

		this.cachedConveyorLocations = new Map();

		// this.simulationFunctions.set("Dumpling", new Map());
		// this.simulationFunctions.get("Dumpling")?.set(Progress["Pressure Washer"].Progress, (part: DropperPart) => {
		// 	return this.washDumpling(part);
		// });
	}

	/** @hidden */
	public onInit(): void {
		for (let path = 0; path < NUMBER_OF_PATHS + 1; path++) {
			this.audioFiles.set(path, new Map());
		}

		for (const [, value] of pairs(Progress)) {
			this.audioFiles.get(value.Path)?.set(value.Progress, value.Audio);
		}

		for (const lotName of LOT_NAMES) {
			this.upgradersOwned.set(lotName, new Map());
			for (let path = 0; path < NUMBER_OF_PATHS + 1; path++) {
				this.upgradersOwned.get(lotName)!.set(path, new Map());
			}
		}

		Events.dropperSpawned.connect((...args) => this.dropItem(...args));
		Events.playerInRangeOfLot.connect((...args) => this.receivePayload(...args));
		Events.playerOutOfRangeOfLot.connect(() => this.stopSimulation());
		Events.playerBoughtObject.connect((...args) => this.boughtUpgrader(...args));

		this.partCacheLocation.Name = "Cache";
		this.partCacheLocation.Parent = Workspace;

		this.nearestTycoon = Players.LocalPlayer.GetAttribute("Lot") as string;
		if (this.nearestTycoon === undefined) {
			Players.LocalPlayer.GetAttributeChangedSignal("Lot").Once(() => {
				this.nearestTycoon = Players.LocalPlayer.GetAttribute("Lot") as string;
			});
		}
	}

	/** @hidden */
	public onStart(): void {
		this.storeCachedConveyorLocations();
		const parts = ReplicatedStorage.PartInfo;
		parts.GetChildren().forEach((part) => {
			task.spawn(() => {
				const partCache = new PartCacheModule(part, 5, this.partCacheLocation);
				this.partCache.set(part.Name, partCache);
			});
		});
	}

	/**
	 *
	 * @param lotName
	 * @param pathNumber
	 * @param objectName
	 */
	private boughtUpgrader(lotName: string, pathNumber: PathNumber, objectName: string, textColor?: Color3): void {
		const upgraderInfo: Partial<IUpgraderInfo> = {
			Color: textColor,
			Path: pathNumber,
			Additive: (PartInfo[objectName as PartInfoType] as UpgraderKey).Additive,
			Multiplier: (PartInfo[objectName as PartInfoType] as UpgraderKey).Multiplier,
		};

		const progress = Progress[objectName as ProgressKey].Progress;
		this.upgradersOwned.get(lotName)?.get(pathNumber)?.set(progress, upgraderInfo);
	}

	/**
	 *
	 * @param dropperInfo
	 * @returns
	 */
	private dropItem(dropperInfo: DropperInfo, progress = 1): void {
		if (this.nearestTycoon === undefined) {
			this.logger.Error(`No lot found for player ${Players.LocalPlayer.Name}`);
			return;
		}

		const pathNumber = dropperInfo.X;
		const partType = decoderPartIdentifiers[dropperInfo.Y as never] as PartInfoType;

		const newPart = this.partCache.get(partType)?.GetPart() as DropperPart;
		if (!newPart) {
			this.logger.Error(`Could not find part ${partType}`);
			return;
		}

		const ui = newPart.FindFirstChild("Price") as DropperBillboard;
		if (ui) {
			this.updateUi(ui, this.calculatePartPrice(partType));
		}

		// const progress = currentProgress !== undefined ? currentProgress : 1;
		newPart.PivotTo(new CFrame(this.cachedConveyorLocations.get(this.nearestTycoon)![pathNumber][progress]));

		const time = PATH_INFO[pathNumber]!.TotalTime * (1 - progress / PATH_INFO[pathNumber]!.TotalProgress);
		this.createTween(time, progress, pathNumber, partType, newPart);
	}

	/**
	 *
	 * @param partType
	 * @returns
	 */
	private calculatePartPrice(partType: PartInfoType): number {
		const data = ClientStore.getState().playerData;
		return (
			(PartInfo[partType] as PartInfoKey).Value *
			(1 + data.rebirths / 5) *
			(data.gamePasses.doubleMoneyGamepass ? 2 : 1)
		);
	}

	/**
	 *
	 * @param pathNumber
	 * @param progress
	 * @param step
	 * @returns
	 */
	private calculateNewPosition(pathNumber: PathNumber, progress: number, step: number): Vector3 {
		const previousPosition = this.cachedConveyorLocations.get(this.nearestTycoon!)![pathNumber][progress - 1];
		const nextPosition = this.cachedConveyorLocations.get(this.nearestTycoon!)![pathNumber][progress];
		return previousPosition.Lerp(nextPosition, step);
	}

	/**
	 *
	 * @param totalTime
	 * @param progress
	 * @param pathNumber
	 * @param partType
	 * @param part
	 */
	private createTween(
		totalTime: number,
		progress: number,
		pathNumber: PathNumber,
		partType: string,
		part: DropperPart,
	): void {
		const totalPoints = this.cachedConveyorLocations.get(this.nearestTycoon!)![pathNumber].size() - 1;

		const numValue = new Instance("NumberValue");
		numValue.Value = (1 / totalPoints) * progress;

		const tweenInfo = new TweenInfo(totalTime, Enum.EasingStyle.Linear, Enum.EasingDirection.In, 0, false, 0);

		const newTween = TweenService.Create(numValue, tweenInfo, { Value: 0.99 });
		const tweenJanitor = new Janitor<{ NumConnection: string | RBXScriptConnection }>();

		tweenJanitor.Add(
			newTween.GetPropertyChangedSignal("PlaybackState").Connect(() => {
				let oldProgress = progress;

				tweenJanitor.Add(
					numValue.Changed.Connect((t) => {
						const currentProgress = math.floor(totalPoints * t) + 1;
						if (oldProgress !== currentProgress) {
							if (this.simulateDroppers(pathNumber, currentProgress, part)) {
								if (tweenJanitor) {
									tweenJanitor.Destroy();
								}
								return;
							}
							oldProgress = currentProgress;
						}

						part.PivotTo(
							new CFrame(this.calculateNewPosition(pathNumber, currentProgress, (totalPoints * t) % 1)),
						);
					}),
					"Disconnect",
					"NumConnection",
				);
			}),
		);

		tweenJanitor.Add(
			newTween.Completed.Connect(() => {
				tweenJanitor.Destroy();
			}),
		);

		tweenJanitor.Add(() => {
			this.partCache.get(partType)?.ReturnPart(part);
			this.currentlySimulating.delete(tweenJanitor);
		});

		this.currentlySimulating.add(tweenJanitor);

		newTween.Play();
	}

	/**
	 * Stores all the cached locations of the conveyor belts in the game.
	 *
	 * This is due to streaming enabled, it is not guaranteed that the parts
	 * will be available to the player when the game starts.
	 */
	private storeCachedConveyorLocations(): void {
		for (const module of script.GetChildren()) {
			if (module.IsA("ModuleScript")) {
				const tycoon = module.Name;
				// eslint-disable-next-line @typescript-eslint/no-require-imports
				const locations = require(module) as Array<Array<Vector3>>;
				this.cachedConveyorLocations.set(tycoon, locations);
			}
		}
	}

	/**
	 *
	 * @param ui
	 * @param value
	 */
	private updateUi(ui: DropperBillboard, value: number, color = Color3.fromRGB(137, 255, 101)): void {
		ui.SetAttribute("Price", value);
		ui.PriceLabel.Text = tostring("$" + string.format("%.0f", value));
		ui.PriceLabel.TextColor3 = color;
	}

	/**
	 *
	 * @param pathNumber
	 * @param upgraderProgress
	 * @param part
	 * @returns true if the dropper should be destroyed
	 */
	private simulateDroppers(pathNumber: PathNumber, upgraderProgress: number, part: DropperPart): boolean {
		const hasUpgrader = this.upgradersOwned.get(this.nearestTycoon!)?.get(pathNumber)?.get(upgraderProgress);
		if (hasUpgrader !== undefined) {
			// const simulationFunction = this.simulationFunctions.get(pathNumber)?.get(upgraderProgress);
			// if (simulationFunction !== undefined) {
			// 	if (simulationFunction(part, pathNumber, upgraderProgress)) {
			// 		return true;
			// 	}
			// }

			let currentPrice = part.Price.GetAttribute("Price") as number;
			currentPrice += hasUpgrader.Additive!;
			currentPrice *= hasUpgrader.Multiplier!;

			this.updateUi(part.Price, currentPrice, hasUpgrader.Color);
			// this.playAudio(NetworkedPathType[pathType], upgraderProgress);
		}

		return false;
	}

	/**
	 *
	 * @param pathNumber
	 * @param progress
	 * @returns
	 */
	private playAudio(pathNumber: PathNumber, progress: number): void {
		const position = this.cachedConveyorLocations.get(this.nearestTycoon!)![pathNumber][progress];
		const sound = this.audioFiles.get(pathNumber)?.get(progress);
		if (sound === undefined || sound === "0") {
			return;
		}

		if (Workspace.Camera.FindFirstChild("SoundContainer")?.FindFirstChild(tostring(sound))) {
			return;
		}

		this.logger.Debug(`Playing sound ${sound} at ${position}`);
		SoundSystem.Create(sound, position, tostring(sound), false);
	}

	/**
	 *
	 */
	private stopSimulation(): void {
		this.currentlySimulating.forEach((janitor) => {
			janitor.Destroy();
		});

		this.currentlySimulating.clear();
	}

	/**
	 *
	 * @param lotName
	 * @param data
	 * @returns
	 */
	private async receivePayload(lotName: string, data: Array<Vector3int16>): Promise<void> {
		this.stopSimulation();

		if (data === undefined) {
			return;
		}

		this.nearestTycoon = lotName;

		const upgradersOwned = this.upgradersOwned.get(this.nearestTycoon);
		if (upgradersOwned === undefined) {
			return;
		}

		return Promise.defer(() => {
			data.forEach((encoded) => {
				// path number, part type, progress
				this.dropItem(new Vector2int16(encoded.Y, encoded.X), encoded.Z);
			});
		});
	}
}
