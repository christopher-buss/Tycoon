import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Janitor } from "@rbxts/janitor";
import { ModelWithPrimaryPart, RobloxUtil } from "shared/util/roblox";
import { TweenUtil } from "shared/util/tween-utils";
import { Tag } from "types/enum/tags";

interface Attributes {
	FloatTime: number;
	Height: number;
}

interface IModel extends Model {}

@Component({
	tag: Tag.Float,
})
export class FloatComponent extends BaseComponent<Attributes, IModel> implements OnStart {
	private readonly janitor: Janitor;

	constructor() {
		super();
		this.janitor = new Janitor();
		assert(this.instance.ModelStreamingMode === Enum.ModelStreamingMode.Atomic);
	}

	public onStart(): void {
		if (RobloxUtil.hasPrimaryPart(this.instance)) {
			this.floatModel(this.instance).catch((err) => warn(err));
		}
	}

	private async floatModel(model: ModelWithPrimaryPart): Promise<void> {
		const info = new TweenInfo(
			this.attributes.FloatTime,
			Enum.EasingStyle.Linear,
			Enum.EasingDirection.In,
			-1,
			true,
			0,
		);

		// const info = new TweenInfo(this.attributes.FloatTime / 3, Enum.EasingStyle.Linear);

		while (this.instance !== undefined) {
			await this.janitor.AddPromise(
				TweenUtil.tweenPromise(model.PrimaryPart, info, {
					CFrame: new CFrame(
						model.PrimaryPart.Position.X,
						model.PrimaryPart.Position.Y + this.attributes.Height,
						model.PrimaryPart.Position.Z,
					),
				}),
			);
		}
	}

	public destroy(): void {
		super.destroy();
		this.janitor.Destroy();
	}
}
