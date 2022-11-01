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
import { DecodePartIdentifier, decoderPartIdentifiers, EncodePartIdentifier } from "shared/meta/part-identifiers";
import { PartInfo, PartInfoKey, Progress, ProgressKey } from "shared/meta/part-info";
import { NetworkedPathType, PathType, PathTypes } from "shared/meta/path-types";
import { DropperInfo } from "shared/network";
import { LOT_NAMES, TOTAL_PROGRESS, TOTAL_TIME } from "shared/shared-constants";

type DropperBillboard = BillboardGui & {
	PriceLabel: TextLabel & {
		UITextSizeConstraint: UITextSizeConstraint;
	};
};

type LotName = string;
type DropperProgress = number;

export type DropperPart = (BasePart | MeshPart | Model) & {
	Price: DropperBillboard;

	Crate: Part & {
		Blossom: ParticleEmitter;
		Bolts: ParticleEmitter;
		Bubble: ParticleEmitter;
	};

	Net: MeshPart;

	Union: UnionOperation;
};

type ISimulationFunction = (
	part: DropperPart,
	pathType: PathType,
	upgraderProgress: number,
) => boolean | LuaTuple<[boolean, DropperPart?]>;

// interface ISimulationFunction: (part: BasePart) => void;

@Controller({})
export class DropperController implements OnStart, OnInit {
	private cachedConveyorLocations: Map<string, Array<Array<Vector3>>>;
	private currentlySimulating: Array<Janitor<{ NumConnection: string | RBXScriptConnection }>>;
	private nearestTycoon: string | undefined;
	private partCache: Map<string, PartCache>;
	private upgradersOwned: Map<LotName, Map<PathType, Map<DropperProgress, Partial<IUpgraderInfo>>>>;
	private simulationFunctions: Map<PathType, Map<number, ISimulationFunction>>;
	private audioFiles = new Map<PathType, Map<number, string>>();

	private readonly partCacheLocation: Folder;

	constructor(private readonly logger: Logger) {
		this.audioFiles = new Map();
		this.currentlySimulating = [];
		this.partCache = new Map();
		this.partCacheLocation = new Instance("Folder");
		this.simulationFunctions = new Map();
		this.upgradersOwned = new Map<LotName, Map<PathType, Map<DropperProgress, Partial<IUpgraderInfo>>>>();

		this.cachedConveyorLocations = new Map();

		this.simulationFunctions.set("Dumpling", new Map());
		this.simulationFunctions.get("Dumpling")?.set(Progress["Pressure Washer"].Progress, (part: DropperPart) => {
			return this.washDumpling(part);
		});

		this.simulationFunctions.get("Dumpling")?.set(Progress["Dumpling Oven"].Progress, (part: DropperPart) => {
			return this.washDumpling(part);
		});

		this.simulationFunctions.get("Dumpling")?.set(Progress["Dumpling Packager"].Progress, (...args) => {
			return this.makeCrate(...args);
		});

		this.simulationFunctions.get("Dumpling")?.set(Progress["Dumpling Scenter"].Progress, (part: DropperPart) => {
			if (part.IsA("Model") && part.Name === "Crate") {
				return this.createBlossom(part);
			}
			return false;
		});

		this.simulationFunctions
			.get("Dumpling")
			?.set(Progress["Dumpling Gold Standard"].Progress, (part: DropperPart) => {
				if (part.IsA("Model") && part.Name === "Crate") {
					return this.createGoldCrate(part);
				}
				return false;
			});

		this.simulationFunctions.get("Dumpling")?.set(Progress["Crate Net Machine"].Progress, (part: DropperPart) => {
			if (part.IsA("Model") && part.Name === "Crate") {
				return this.createNetCrate(part);
			}
			return false;
		});
	}

	public onInit() {
		for (const pathType of PathTypes) {
			this.audioFiles.set(pathType, new Map());
		}

		for (const [, value] of pairs(Progress)) {
			this.audioFiles.get(value.PathType as PathType)?.set(value.Progress, value.Audio);
		}

		for (const lotName of LOT_NAMES) {
			this.upgradersOwned.set(lotName, new Map());
			for (const path of PathTypes) {
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
				const partCache = new PartCacheModule(part, 6, this.partCacheLocation);
				this.partCache.set(part.Name, partCache);
			});
		}
	}

	private dropItem(dropperInfo: DropperInfo) {
		const pathType: NetworkedPathType = dropperInfo.X;
		const partType = decoderPartIdentifiers[dropperInfo.Y as never] as PartInfoKey;

		const newPart = this.partCache.get(partType)?.GetPart() as DropperPart;
		if (!newPart) {
			this.logger.Error(`Could not find part ${partType}`);
			return;
		}

		const ui = newPart.FindFirstChild("Price") as DropperBillboard;
		if (ui) {
			const data = ClientStore.getState().playerData;
			const partPrice =
				PartInfo[partType].Value * (1 + data.rebirths / 5) * (data.gamePasses.doubleMoneyGamepass ? 2 : 1);
			ui.PriceLabel.Text = tostring("¥" + partPrice);

			ui.SetAttribute("Price", partPrice);
		}

		if (this.nearestTycoon === undefined) {
			this.logger.Warn(`No lot found for player ${Players.LocalPlayer.Name}`);
			return;
		}

		let progress = 0;

		if (partType === "Robux Dropper") {
			progress = Progress["Robux Dropper"].Progress;
		}

		newPart.PivotTo(new CFrame(this.cachedConveyorLocations.get(this.nearestTycoon)![pathType][progress]));
		// newPart.Parent = Workspace.PartStorage.FindFirstChild(this.nearestTycoon);

		const decodedPathType = PathTypes[pathType];
		const time = TOTAL_TIME[decodedPathType] * (1 - progress / TOTAL_PROGRESS[decodedPathType]);

		this.createTween(time, progress, pathType, partType, newPart);
	}

	private calculateNewPosition(pathType: number, progress: number, step: number): Vector3 {
		const previousPosition = this.cachedConveyorLocations.get(this.nearestTycoon!)![pathType][progress];
		const nextPosition = this.cachedConveyorLocations.get(this.nearestTycoon!)![pathType][progress + 1];
		return previousPosition.Lerp(nextPosition, step);
	}

	private createTween(totalTime: number, progress: number, pathType: number, partType: string, part: DropperPart) {
		const numValue = new Instance("NumberValue");
		numValue.Value = (1 / this.cachedConveyorLocations.get(this.nearestTycoon!)![pathType].size()) * progress;

		const tweenInfo = new TweenInfo(totalTime, Enum.EasingStyle.Linear, Enum.EasingDirection.In, 0, false, 0);

		const newTween = TweenService.Create(numValue, tweenInfo, { Value: 1 });
		const tweenJanitor = new Janitor<{ NumConnection: string | RBXScriptConnection }>();

		tweenJanitor.Add(
			newTween.GetPropertyChangedSignal("PlaybackState").Connect(() => {
				let oldProgress = progress;

				tweenJanitor.Add(
					numValue.Changed.Connect((t) => {
						const totalPoints = this.cachedConveyorLocations.get(this.nearestTycoon!)![pathType].size();
						const currentProgress = math.floor(totalPoints * t) + 1;
						if (currentProgress >= totalPoints - 1) {
							tweenJanitor.Destroy();
							return;
						}
						if (oldProgress !== currentProgress) {
							if (this.simulateDroppers(PathTypes[pathType], currentProgress, part)) {
								if (tweenJanitor) {
									tweenJanitor.Destroy();
									return;
								}
							}
							oldProgress = currentProgress;
						}

						const position = this.calculateNewPosition(pathType, currentProgress, (totalPoints * t) % 1);
						part.PivotTo(new CFrame(position));
					}),
					"Disconnect",
					"NumConnection",
				);
			}),
		);

		tweenJanitor.Add(() => {
			newTween.Cancel();

			// Reset part back to original state
			if (part.IsA("Model")) {
				// Crate
				part.Crate.Blossom.Enabled = false;
				part.Crate.Blossom.Clear();
				part.Union.Color = Color3.fromRGB(122, 87, 59);
				part.Crate.Color = Color3.fromRGB(93, 67, 45);
				part.Crate.Bolts.Enabled = false;
				part.Crate.Bolts.Clear();
				part.Crate.Bubble.Enabled = false;
				part.Crate.Bubble.Clear();
				part.Net.Transparency = 1;
			} else {
				// Dumpling
				part.Reflectance = 0;
			}

			this.partCache.get(partType)?.ReturnPart(part);

			const index = this.currentlySimulating.indexOf(tweenJanitor);
			this.currentlySimulating.unorderedRemove(index);
		});

		this.currentlySimulating.push(tweenJanitor);

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

	/**
	 *
	 * @param pathType
	 * @param upgraderProgress
	 * @param part
	 * @returns true if the dropper should be destroyed
	 */
	private simulateDroppers(pathType: PathType, upgraderProgress: number, part: DropperPart): boolean {
		const hasUpgrader = this.upgradersOwned.get(this.nearestTycoon!)?.get(pathType)?.get(upgraderProgress);
		if (hasUpgrader !== undefined) {
			const simulationFunction = this.simulationFunctions.get(pathType)?.get(upgraderProgress);
			if (simulationFunction !== undefined) {
				if (simulationFunction(part, pathType, upgraderProgress)) {
					return true;
				}
			}

			this.updateUi(part.Price, hasUpgrader.Value!);
			this.playAudio(NetworkedPathType[pathType], upgraderProgress);
		}

		return false;
	}

	private playAudio(pathType: NetworkedPathType, progress: number): void {
		const position = this.cachedConveyorLocations.get(this.nearestTycoon!)![pathType][progress];
		const sound = this.audioFiles.get(PathTypes[pathType])?.get(progress);
		if (sound === undefined || sound === "0") {
			return;
		}

		if (Workspace.Camera.FindFirstChild("SoundContainer")?.FindFirstChild(tostring(sound))) {
			return;
		}

		this.logger.Debug(`Playing sound ${sound} at ${position}`);
		SoundSystem.Create(sound, position, tostring(sound), false);
	}

	private stopSimulation(): void {
		for (let i = this.currentlySimulating.size() - 1; i >= 0; i--) {
			const janitor = this.currentlySimulating[i];
			if (Janitor.Is(janitor)) {
				janitor.Destroy();
			}
		}

		this.currentlySimulating.clear();
	}

	private receivePayload(lotName: string, data: Vector3int16[]) {
		this.stopSimulation();

		if (data === undefined) {
			return;
		}

		this.nearestTycoon = lotName;

		for (const encoded of data) {
			const partType = decoderPartIdentifiers[
				encoded.X as keyof DecodePartIdentifier
			] as keyof EncodePartIdentifier;
			print(partType);
			const pathType = encoded.Y;
			const progress = encoded.Z;

			if (partType === "Dumpling") {
				print(pathType, progress);
			}

			const decodedPathType = PathTypes[encoded.Y];

			const part = this.partCache.get(partType)?.GetPart() as DropperPart;
			if (!part) {
				this.logger.Error(`Failed to get part of type ${partType}`);
				continue;
			}

			const ui = part.FindFirstChild("Price") as DropperBillboard;
			if (ui) {
				const data = ClientStore.getState().playerData;
				const partPrice =
					PartInfo[partType].Value * (1 + data.rebirths / 5) * (data.gamePasses.doubleMoneyGamepass ? 2 : 1);
				ui.PriceLabel.Text = tostring("¥" + partPrice);

				ui.SetAttribute("Price", partPrice);
			}

			if (
				progress >= Progress["Crate Net Machine"].Progress &&
				this.upgradersOwned
					.get(this.nearestTycoon!)
					?.get(decodedPathType)
					?.get(Progress["Crate Net Machine"].Progress)
			) {
				const [, crate] = this.makeCrate(part, decodedPathType, Progress["Crate Net Machine"].Progress);
				if (!crate) {
					this.logger.Error(`Failed to make crate for ${partType}`);
					return;
				}

				this.createBlossom(crate);
				this.createGoldCrate(crate);
				this.createNetCrate(crate);
			} else if (
				progress >= Progress["Dumpling Gold Standard"].Progress &&
				this.upgradersOwned
					.get(this.nearestTycoon!)
					?.get(decodedPathType)
					?.get(Progress["Dumpling Gold Standard"].Progress)
			) {
				const [, crate] = this.makeCrate(part, decodedPathType, Progress["Dumpling Gold Standard"].Progress);
				if (!crate) {
					this.logger.Error(`Failed to make crate for ${partType}`);
					return;
				}

				this.createBlossom(crate);
				this.createGoldCrate(crate);
			} else if (
				progress >= Progress["Dumpling Scenter"].Progress &&
				this.upgradersOwned
					.get(this.nearestTycoon!)
					?.get(decodedPathType)
					?.get(Progress["Dumpling Scenter"].Progress)
			) {
				const [, crate] = this.makeCrate(part, decodedPathType, Progress["Dumpling Scenter"].Progress);
				if (!crate) {
					this.logger.Error(`Failed to make crate for ${partType}`);
					return;
				}

				this.createBlossom(crate);
			} else if (
				progress >= Progress["Dumpling Packager"].Progress &&
				this.upgradersOwned
					.get(this.nearestTycoon!)
					?.get(decodedPathType)
					?.get(Progress["Dumpling Packager"].Progress)
			) {
				const [, crate] = this.makeCrate(part, decodedPathType, Progress["Dumpling Packager"].Progress);
				if (!crate) {
					this.logger.Error(`Failed to make crate for ${partType}`);
					return;
				}
			} else {
				const time = TOTAL_TIME[decodedPathType] * (1 - progress / TOTAL_PROGRESS[decodedPathType]);
				this.createTween(time, progress, pathType, partType, part);
			}
		}
	}

	/** Simulation Functions */
	private makeCrate(
		part: DropperPart,
		pathType: PathType,
		upgraderProgress: number,
	): LuaTuple<[boolean, DropperPart?]> {
		const position = this.cachedConveyorLocations.get(this.nearestTycoon!)![NetworkedPathType[pathType]][
			upgraderProgress
		];
		const crate = this.partCache.get("Crate")?.GetPart() as DropperPart;
		if (!crate) {
			return $tuple(false, undefined);
		}

		crate.PivotTo(new CFrame(position));
		const timeRemainingOnPath = TOTAL_TIME.Dumpling * (1 - upgraderProgress / TOTAL_PROGRESS.Dumpling);
		this.createTween(timeRemainingOnPath, upgraderProgress, NetworkedPathType[pathType], "Crate", crate);

		crate.Price.SetAttribute("Price", part.Price.GetAttribute("Price"));
		const value = this.upgradersOwned.get(this.nearestTycoon!)?.get(pathType)?.get(upgraderProgress);
		this.updateUi(crate.Price, value!.Value!);
		this.playAudio(NetworkedPathType[pathType], upgraderProgress);
		return $tuple(true, crate);
	}

	private washDumpling(part: DropperPart): boolean {
		(part as BasePart).Reflectance += 0.05;
		return false;
	}

	private createBlossom(part: DropperPart): boolean {
		part.Crate.Blossom.Enabled = true;
		return false;
	}

	private createGoldCrate(part: DropperPart): boolean {
		part.Union.Color = Color3.fromRGB(122, 106, 40);
		part.Crate.Color = Color3.fromRGB(93, 81, 37);

		part.Crate.Bolts.Enabled = true;
		part.Crate.Bubble.Enabled = true;
		return false;
	}

	private createNetCrate(part: DropperPart): boolean {
		part.Net.Transparency = 0;
		return false;
	}
}
