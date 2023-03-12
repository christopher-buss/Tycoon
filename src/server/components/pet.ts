import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Janitor } from "@rbxts/janitor";
import { Logger } from "@rbxts/log";
import { RobloxUtil } from "shared/util/roblox";
import { Tag } from "types/enum/tags";

interface Attributes {
	PettingID: number;
	PettingLength?: number;
	ShouldPet?: boolean;
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

	public pettingAnimation!: Animation;
	public proximityPrompt!: ProximityPrompt;

	constructor(private readonly logger: Logger) {
		super();
		assert(this.instance.ModelStreamingMode === Enum.ModelStreamingMode.Atomic);

		this.debounce = false;
		this.janitor = new Janitor();

		const proximityPrompt = new Instance("ProximityPrompt");
		this.proximityPrompt = proximityPrompt;
		proximityPrompt.ActionText = "Pet";
		proximityPrompt.TriggerEnded.Connect(() => this.petTheDamnDog());
		proximityPrompt.Parent = this.instance;
	}

	public onStart(): void {
		RobloxUtil.preloadAnimation(RobloxUtil.assetUrlWithId(this.attributes.PettingID))
			.andThen((animation) => {
				this.pettingAnimation = animation;
			})
			.catch((err) => {
				this.logger.Warn(`Could not get animation for ${this.instance.Name}: ${err}`);
			});
	}

	public petTheDamnDog(): void {
		if (this.debounce) {
			return;
		}

		this.debounce = true;

		this.logger.Debug(`Petting ${this.instance.Name}...`);

		this.animatePet();
		this.playEffects();
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
		// Tell the client to play the petting animation
		this.attributes.ShouldPet = true;

		const waitTime = this.attributes.PettingLength ?? 3;
		task.delay(waitTime, () => {
			//this.attributes.PettingLength, () => {
			this.logger.Debug(`Finished petting ${this.instance.Name}...`);
			this.attributes.ShouldPet = false;
			this.proximityPrompt.Enabled = true;
			this.debounce = false;
		});
	}

	public destroy(): void {
		super.destroy();
		this.janitor.Destroy();
	}
}
