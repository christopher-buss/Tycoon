import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Janitor } from "@rbxts/janitor";
import { ModelWithPrimaryPart, RobloxUtil } from "shared/util/roblox";
import { TweenUtil } from "shared/util/tween-utils";
import { Tag } from "types/enum/tags";

interface IAttributes {
	/** Time taken to do a full rotation */
	SpinTime: number;
}

interface IModel extends Model {}

@Component({
	tag: Tag.Spinner,
})
export class SpinComponent extends BaseComponent<IAttributes, IModel> implements OnStart {
	private readonly janitor: Janitor;

	constructor() {
		super();
		this.janitor = new Janitor();
		assert(this.instance.ModelStreamingMode === Enum.ModelStreamingMode.Atomic);
	}

	public onStart(): void {
		if (RobloxUtil.hasPrimaryPart(this.instance)) {
			this.spinModel(this.instance).catch((err) => warn(err));
		}
	}

	private async spinModel(model: ModelWithPrimaryPart): Promise<void> {
		const info = new TweenInfo(this.attributes.SpinTime / 3, Enum.EasingStyle.Linear);

		while (this.instance !== undefined) {
			await this.janitor.AddPromise(
				TweenUtil.tweenPromise(model.PrimaryPart, info, {
					CFrame: model.PrimaryPart.CFrame.mul(CFrame.Angles(0, -math.rad(120), 0)),
				}),
			);
		}
	}

	public destroy(): void {
		super.destroy();
		this.janitor.Destroy();
	}
}
