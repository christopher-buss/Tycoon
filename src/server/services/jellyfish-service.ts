import { OnInit, OnStart, Service } from "@flamework/core";
import { Logger } from "@rbxts/log";
import { ReplicatedStorage, Workspace } from "@rbxts/services";
import { NumberUtil } from "shared/util/number-util";

import { MoneyService } from "./stores/money-service";

const SPAWN_TIMER = 1;
const MAX_JELLYFISH = 10;
const FRENZY_TIME = 20;
const FRENZY_MULTIPLIER = 2;

@Service({})
export class JellyfishService implements OnStart, OnInit {
	private currentlyAlive: number;
	private jellyfishLocations: Array<BasePart>;
	private storage: Folder;
	private jellyfishModels: Array<Model>;

	private getRandomJellyfishIndex: () => number;

	constructor(private readonly logger: Logger, private readonly moneyService: MoneyService) {
		this.currentlyAlive = 0;
		this.jellyfishLocations = new Array();

		this.storage = new Instance("Folder");
		this.storage.Name = "JellyfishStorage";
		this.storage.Parent = Workspace;

		this.jellyfishModels = ReplicatedStorage.Jellyfish.GetChildren() as Array<Model>;
		assert(this.jellyfishModels.size() > 0, "No jellyfish models found");

		this.getRandomJellyfishIndex = NumberUtil.setRandomInterval(0, this.jellyfishModels.size() - 1);
	}

	public collectJellyfish(player: Player): void {
		this.logger.Info(`Collected jellyfish for ${player.Name}!`);
		this.currentlyAlive -= 1;
		this.moneyService.setFrenzyMultiplier(player, FRENZY_MULTIPLIER, FRENZY_TIME);
	}

	public onInit(): void {
		/* Store jellyfish part locations */
		const parts = Workspace.FindFirstChild("JellyfishLocations");
		assert(parts !== undefined, "JellyfishLocations not found");
		this.jellyfishLocations = parts.GetChildren() as Array<BasePart>;
	}

	public onStart(): void {
		while (true) {
			if (this.currentlyAlive >= MAX_JELLYFISH) {
				task.wait(1);
				return;
			}

			// spawn jellyfish at random locations
			const newPart = this.jellyfishModels[this.getRandomJellyfishIndex()].Clone();
			// CollectionService.AddTag(newPart, Tag.Jellyfish);
			newPart.PivotTo(this.getNewJellyfishLocation());
			newPart.Parent = this.storage;
			this.currentlyAlive++;
			task.wait(SPAWN_TIMER);
		}
	}

	private getNewJellyfishLocation(): CFrame {
		const randomIndex = math.random(0, this.jellyfishLocations.size() - 1);
		const part = this.jellyfishLocations[randomIndex].Clone();

		return part.CFrame.mul(
			new CFrame(
				(math.random() - 0.5) * part.Size.X,
				(math.random() - 0.5) * part.Size.Y + 2,
				(math.random() - 0.5) * part.Size.Z,
			),
		);
	}
}
