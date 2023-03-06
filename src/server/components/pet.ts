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

export interface IPetModel extends Model {
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

	private readonly janitor: Janitor;
	private readonly animationId: string;

	public animationLength: number | undefined;
	public proximityPrompt!: ProximityPrompt;

	constructor(private readonly logger: Logger) {
		super();
		this.debounce = false;
		this.janitor = new Janitor();
		this.animationId = RobloxUtil.assetUrlWithId(this.attributes.PettingID);

		const proximityPrompt = new Instance("ProximityPrompt");
		this.proximityPrompt = proximityPrompt;
		proximityPrompt.ActionText = "Pet";
		proximityPrompt.TriggerEnded.Connect(() => this.petTheDamnDog());
		proximityPrompt.Parent = this.instance;
	}

	public onStart(): void {
		RobloxUtil.initializeAnimation(this.animationId, this.instance.Humanoid)
			.andThen((track) => {
				this.animationLength = track.Length;
			})
			.catch((err) => {
				this.logger.Warn(`Could not get animation length for ${this.instance.Name}: ${err}`);
			});
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

		this.playEffects();

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
