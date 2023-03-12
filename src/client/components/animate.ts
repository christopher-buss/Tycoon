import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Janitor } from "@rbxts/janitor";
import { Logger } from "@rbxts/log";
import { RobloxUtil } from "shared/util/roblox";
import { Tag } from "types/enum/tags";

interface Attributes {
	AnimationID: number;
}

interface AnimateModel extends Model {
	Humanoid: Humanoid;
}

@Component({
	tag: Tag.Animate,
})
export class Animate extends BaseComponent<Attributes, AnimateModel> implements OnStart {
	private animation!: Animation;
	private animationTrack!: AnimationTrack;

	private readonly janitor: Janitor;

	constructor(private readonly logger: Logger) {
		super();
		this.janitor = new Janitor();

		assert(this.instance.ModelStreamingMode === Enum.ModelStreamingMode.Atomic);
	}

	public onStart(): void {
		RobloxUtil.preloadAnimation(RobloxUtil.assetUrlWithId(this.attributes.AnimationID))
			.andThen((animation) => {
				this.animation = animation;
			})
			.catch((err) => {
				this.logger.Warn(`Could not get animation for ${this.instance.Name}: ${err}`);
			});

		this.logger.Debug(`Playing idle animation for ${this.instance.Name}`);
		RobloxUtil.playAnimationOnHumanoid(this.instance.Humanoid, this.animation)
			.andThen((animationTrack) => {
				this.animationTrack = animationTrack;
				this.janitor.Add(() => {
					this.animationTrack.Stop();
					this.animationTrack.Destroy();
				});
			})
			.catch((err) => {
				this.logger.Warn(`Could not play animation for ${this.instance.Name}: ${err}`);
			});
	}

	public pauseAnimation(): void {
		this.animationTrack.Stop();
	}

	public resumeAnimation(): void {
		this.animationTrack.Play();
	}

	public destroy(): void {
		this.logger.Debug(`Stopping idle animation for ${this.instance.Name}`);
		super.destroy();
		this.janitor.Destroy();
	}
}
