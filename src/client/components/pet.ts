import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Logger } from "@rbxts/log";
import { IPetModel } from "server/components/pet";
import { FlameworkUtil } from "shared/util/flamework-utils";
import { RobloxUtil } from "shared/util/roblox";
import { Tag } from "types/enum/tags";

import { Animate } from "./animate";

interface Attributes {
	PettingID: number;
	PettingLength?: number;
	ShouldPet?: boolean;
}

@Component({
	tag: Tag.Pet,
})
export class Pet extends BaseComponent<Attributes, IPetModel> implements OnStart {
	// private readonly idleAnimation: AnimationTrack;
	private petAnimation!: Animation;
	private animationTrack!: AnimationTrack;

	private animateComponent!: Animate;

	constructor(private readonly logger: Logger) {
		super();
	}

	public async onStart(): Promise<void> {
		const promise1 = FlameworkUtil.waitForComponentOnInstance<Animate>(this.instance).andThen(
			(animateComponent) => {
				this.animateComponent = animateComponent;
			},
		);

		const promise2 = RobloxUtil.preloadAnimation(RobloxUtil.assetUrlWithId(this.attributes.PettingID))
			.andThen((animation) => {
				this.petAnimation = animation;
			})
			.catch((err) => {
				this.logger.Warn(`Could not get animation for ${this.instance.Name}: ${err}`);
			});

		await Promise.all([promise1, promise2]);

		this.onAttributeChanged("ShouldPet", (value, oldValue) => {
			if (value === oldValue) {
				return;
			}

			if (value) {
				// this.idleAnimation.Stop();
				this.playPetAnimation();
			} else {
				this.stopPetAnimation();
			}
		});
	}

	public playPetAnimation(): void {
		this.animateComponent.pauseAnimation();

		RobloxUtil.playAnimationOnHumanoid(this.instance.Humanoid, this.petAnimation)
			.andThen((animationTrack) => {
				this.animationTrack = animationTrack;
			})
			.catch((err) => {
				this.logger.Warn(`Could not play animation for ${this.instance.Name}: ${err}`);
			});
	}

	public stopPetAnimation(): void {
		assert(this.animationTrack);
		this.animationTrack.Stop();

		this.animateComponent.resumeAnimation();
	}
}
