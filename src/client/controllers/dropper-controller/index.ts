import { Controller, OnInit, OnStart } from "@flamework/core";
import { Janitor } from "@rbxts/janitor";
import PartCacheModule from "@rbxts/partcache";
import { PartCache } from "@rbxts/partcache/out/class";
import { ReplicatedStorage, TweenService, Workspace } from "@rbxts/services";
import { Events } from "client/network";
import partIdentifiers from "shared/meta/part-identifiers";
import { DropperInfo } from "shared/network";

@Controller({})
export class DropperController implements OnStart, OnInit {
	private cachedConveyorLocations: Map<string, Array<Array<Vector3>>>;
	private partCache: Map<string, PartCache>;
	private nearestTycoon = "Temp";

	constructor() {
		this.cachedConveyorLocations = new Map();
		this.partCache = new Map();
	}

	onInit() {
		this.storeCachedConveyorLocations();
	}

	onStart() {
		Events.dropperSpawned.connect((...args) => this.dropItem(...args));

		const parts = ReplicatedStorage.PartInfo;
		for (const part of parts.GetChildren()) {
			task.spawn(() => {
				const partCache = new PartCacheModule(part as BasePart, 5, Workspace.Cache);
				this.partCache.set(part.Name, partCache);
			});
		}
	}

	private dropItem(dropperType: number, dropperInfo: DropperInfo) {
		const partType = partIdentifiers[dropperInfo.X as never];
		const dropperId = dropperInfo.Y;

		const newPart = this.partCache.get(partType)?.GetPart();
		if (!newPart) {
			return;
		}

		newPart.Position = this.cachedConveyorLocations.get(this.nearestTycoon)![dropperId][1];
		newPart.Parent = Workspace;

		this.createTween(dropperType, newPart);
	}

	private createTween(dropperType: number, part: BasePart) {
		const numValue = new Instance("NumberValue");
		const tweenInfo = new TweenInfo(26.5, Enum.EasingStyle.Linear, Enum.EasingDirection.In, 0, false, 0);

		const newTween = TweenService.Create(numValue, tweenInfo, { Value: 1 });
		const tweenJanitor = new Janitor();

		newTween.GetPropertyChangedSignal("PlaybackState").Connect(() => {
			if (newTween.PlaybackState !== Enum.PlaybackState.Completed) {
				tweenJanitor.Cleanup();
			}

			tweenJanitor.Add(() => {
				numValue.GetPropertyChangedSignal("Value").Connect(() => {
					const totalPoints = this.cachedConveyorLocations.get(this.nearestTycoon)![dropperType].size();
					const currentProgress = math.floor(totalPoints * numValue.Value);
					if (currentProgress >= totalPoints) {
						tweenJanitor.Cleanup();
					}
				});
			});
		});

		newTween.Completed.Connect(() => {
			part.Destroy();
		});

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
}
