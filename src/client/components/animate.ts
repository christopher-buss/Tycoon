import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Janitor } from "@rbxts/janitor";
import { RobloxUtil } from "shared/util/roblox";
import { Tag } from "types/enum/tags";

interface Attributes {
	AnimationID: number;
}

@Component({
	tag: Tag.Animate,
})
export class Animate extends BaseComponent<Attributes> implements OnStart {
	private readonly janitor: Janitor;
	private readonly animationId: string;

	constructor() {
		super();
		this.janitor = new Janitor();
		this.animationId = RobloxUtil.assetUrlWithId(this.attributes.AnimationID);
	}

	public onStart(): void {
		const humanoid = this.instance.WaitForChild("Humanoid", 10);
		if (humanoid === undefined || !humanoid.IsA("Humanoid")) {
			return;
		}

		RobloxUtil.playAnimationOnHumanoid(humanoid, this.animationId);
	}

	public destroy(): void {
		super.destroy();
		this.janitor.Destroy();
	}
}
