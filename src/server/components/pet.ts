import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Janitor } from "@rbxts/janitor";
import { Logger } from "@rbxts/log";
import { CollectionService } from "@rbxts/services";
import { RobloxUtil } from "shared/util/roblox";
import { Tag } from "types/enum/tags";

interface Attributes {
	PettingID: number;
}

interface IPetModel extends Model {
	Head: MeshPart & {
		Hearts: ParticleEmitter;
	};

	Humanoid: Humanoid;
}
@Component({
	tag: Tag.Pet,
})
export class Pet extends BaseComponent<Attributes, IPetModel> implements OnStart {
	private debounce;
	private proximityPrompt!: ProximityPrompt;

	private readonly janitor: Janitor;
	private readonly animationId: string;

	constructor(private readonly logger: Logger) {
		super();
		this.debounce = false;
		this.janitor = new Janitor();
		this.animationId = RobloxUtil.assetUrlWithId(this.attributes.PettingID);
	}

	public onStart(): void {
		const proximityPrompt = new Instance("ProximityPrompt");
		this.proximityPrompt = proximityPrompt;
		proximityPrompt.ActionText = "Pet";
		proximityPrompt.TriggerEnded.Connect(() => this.petTheDamnDog());
		proximityPrompt.Parent = this.instance;
	}

	public petTheDamnDog(): void {
		if (this.debounce) {
			return;
		}

		this.debounce = true;

		this.logger.Debug(`Petting ${this.instance.Name}...`);

		if (CollectionService.HasTag(this.instance, Tag.Animate)) {
			CollectionService.RemoveTag(this.instance, Tag.Animate);
		}

		task.spawn(() => this.playEffects());

		// We want to ensure that the Animate collection tag has been removed
		// before we start the petting animation.
		task.defer(() => this.animatePet());
	}

	private playEffects(): void {
		const effect = this.instance.Head.Hearts;
		effect.Enabled = true;
		task.delay(2, () => {
			effect.Enabled = false;
		});
	}

	private animatePet(): void {
		this.proximityPrompt.Enabled = false;
		const track = RobloxUtil.playAnimationOnHumanoid(this.instance.Humanoid, this.animationId);
		track.Ended.Once(() => {
			this.logger.Debug(`Finished petting ${this.instance.Name}...`);
			CollectionService.AddTag(this.instance, Tag.Animate);
			task.wait(0.5);
			this.debounce = false;
			this.proximityPrompt.Enabled = true;
		});
	}

	public destroy(): void {
		super.destroy();
		this.janitor.Destroy();
	}
}
