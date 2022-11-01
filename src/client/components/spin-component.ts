import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Janitor } from "@rbxts/janitor";
import { observeChild } from "@rbxts/streamable";
import { TweenUtil } from "shared/util/tween-utils";
import { Tag } from "types/enum/tags";

interface IModel extends BasePart {}

@Component({
	tag: Tag.Spinner,
})
export class SpinComponent extends BaseComponent<{}, IModel> implements OnStart {
	private readonly janitor: Janitor<void>;

	constructor() {
		super();
		this.janitor = new Janitor();
	}

	public onStart(): void {
		this.janitor.Add(
			observeChild(this.instance, "Mesh", (_primary) => {
				this.spinModel();
				return () => {};
			}),
		);
	}

	private spinModel() {
		print("SPINNING MODEL");
		this.janitor.AddPromise(
			TweenUtil.tweenPromise<BasePart>(
				this.instance,
				new TweenInfo(3, Enum.EasingStyle.Linear, Enum.EasingDirection.In, -1, false, 0),
				{
					Orientation: new Vector3(this.instance.Orientation.X, 360, this.instance.Orientation.Y),
				},
			),
		);
	}

	public destroy(): void {
		super.destroy();
		this.janitor.Destroy();
	}
}
