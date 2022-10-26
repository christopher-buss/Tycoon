import { Controller, OnInit, OnStart } from "@flamework/core";
import { Janitor } from "@rbxts/janitor";
import { Logger } from "@rbxts/log";
import PartCacheModule from "@rbxts/partcache";
import { PartCache } from "@rbxts/partcache/out/class";
import { Players, ReplicatedStorage, TweenService, Workspace } from "@rbxts/services";
import { Events } from "client/network";
import { ClientStore } from "client/rodux/rodux";
import { decoderPartIdentifiers } from "shared/meta/part-identifiers";
import PartInfo from "shared/meta/part-info";
import { PathType } from "shared/meta/path-types";
import { DropperInfo } from "shared/network";
import { DUMPLING_TOTAL_TIME } from "shared/shared-constants";

type DropperBillboard = BillboardGui & {
	PriceLabel: TextLabel & {
		UITextSizeConstraint: UITextSizeConstraint;
	};
};

@Controller({})
export class DropperController implements OnStart, OnInit {
	private cachedConveyorLocations: Map<string, Array<Array<Vector3>>>;
	private partCache: Map<string, PartCache>;
	private nearestTycoon: string | undefined;
	private readonly partCacheLocation: Folder;
	private currentlySimulating: Array<Janitor<{ NumConnection: string | RBXScriptConnection }>>;

	constructor(private readonly logger: Logger) {
		this.cachedConveyorLocations = new Map();
		this.partCache = new Map();
		this.partCacheLocation = new Instance("Folder");
		this.currentlySimulating = [];
	}

	public onInit() {
		Events.dropperSpawned.connect((...args) => this.dropItem(...args));
		Events.playerInRangeOfLot.connect((...args) => this.receivePayload(...args));
		Events.playerOutOfRangeOfLot.connect(() => this.stopSimulation());

		this.partCacheLocation.Name = "Cache";
		this.partCacheLocation.Parent = Workspace;

		this.nearestTycoon = Players.LocalPlayer.GetAttribute("Lot") as string;
		if (this.nearestTycoon === undefined) {
			Players.LocalPlayer.GetAttributeChangedSignal("Lot").Once(() => {
				this.nearestTycoon = Players.LocalPlayer.GetAttribute("Lot") as string;
			});
		}

		// CollectionService.GetInstanceAddedSignal(Tag.DropperItem).Connect((dropper) => {

		// }
	}

	public onStart() {
		this.storeCachedConveyorLocations();
		const parts = ReplicatedStorage.PartInfo;
		for (const part of parts.GetChildren()) {
			task.spawn(() => {
				const partCache = new PartCacheModule(part as BasePart, 8, this.partCacheLocation);
				this.partCache.set(part.Name, partCache);
			});
		}
	}

	private dropItem(dropperType: number, dropperInfo: DropperInfo) {
		const partType: string = decoderPartIdentifiers[dropperInfo.X as never];
		const dropperId = dropperInfo.Y;

		const newPart = this.partCache.get(partType)?.GetPart();
		if (!newPart) {
			return;
		}

		const ui = newPart.FindFirstChild("Price") as DropperBillboard;
		if (ui) {
			const data = ClientStore.getState().playerData;
			const partPrice =
				PartInfo[partType as keyof typeof PartInfo].Value *
				(1 + data.rebirths / 5) *
				(data.gamePasses.doubleMoneyGamepass ? 2 : 1);
			ui.PriceLabel.Text = tostring("¥" + partPrice);
		}

		if (this.nearestTycoon === undefined) {
			this.logger.Warn(`No lot found for player ${Players.LocalPlayer.Name}`);
			return;
		}

		newPart.Position = this.cachedConveyorLocations.get(this.nearestTycoon!)![dropperType][dropperId];
		newPart.Parent = Workspace;

		this.createTween(dropperType, partType, newPart);
	}

	private calculateNewPosition(dropperType: number, progress: number, step: number): Vector3 {
		const previousPosition = this.cachedConveyorLocations.get(this.nearestTycoon!)![dropperType][progress];
		const nextPosition = this.cachedConveyorLocations.get(this.nearestTycoon!)![dropperType][progress + 1];
		return previousPosition.Lerp(nextPosition, step);
	}

	private createTween(dropperType: number, partType: string, part: BasePart) {
		const numValue = new Instance("NumberValue");
		const tweenInfo = new TweenInfo(
			DUMPLING_TOTAL_TIME,
			Enum.EasingStyle.Linear,
			Enum.EasingDirection.In,
			0,
			false,
			0,
		);

		const newTween = TweenService.Create(numValue, tweenInfo, { Value: 1 });
		const tweenJanitor = new Janitor<{ NumConnection: string | RBXScriptConnection }>();

		tweenJanitor.Add(() => this.partCache.get(partType)?.ReturnPart(part));
		tweenJanitor.Add(
			newTween.GetPropertyChangedSignal("PlaybackState").Connect(() => {
				if (newTween.PlaybackState !== Enum.PlaybackState.Completed) {
					if (tweenJanitor.Get("NumConnection") !== undefined) {
						tweenJanitor.Destroy();
					}
				}

				tweenJanitor.Add(
					numValue.Changed.Connect((t) => {
						const totalPoints = this.cachedConveyorLocations.get(this.nearestTycoon!)![dropperType].size();
						const currentProgress = math.floor(totalPoints * t) + 1;
						if (currentProgress >= totalPoints - 1) {
							return;
						}
						const position = this.calculateNewPosition(dropperType, currentProgress, (totalPoints * t) % 1);
						part.PivotTo(new CFrame(position));
					}),
					"Disconnect",
					"NumConnection",
				);
			}),
		);

		newTween.Completed.Connect(() => {
			tweenJanitor.Destroy();
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

	private simulateDroppers() {}

	private stopSimulation() {}

	private receivePayload(lotName: string, data: Map<PathType, Vector2int16>) {
		this.nearestTycoon = lotName;
	}
}
