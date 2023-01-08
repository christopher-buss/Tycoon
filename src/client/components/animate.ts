import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Janitor } from "@rbxts/janitor";
import { Logger } from "@rbxts/log";
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

	constructor(private readonly logger: Logger) {
		super();
		this.janitor = new Janitor();
		this.animationId = RobloxUtil.assetUrlWithId(this.attributes.AnimationID);
	}

	public onStart(): void {
		const humanoid = this.instance.WaitForChild("Humanoid", 10);
		if (humanoid === undefined || !humanoid.IsA("Humanoid")) {
			return;
		}

		this.logger.Debug(`Playing idle animation for ${this.instance.Name}`);
		const track = RobloxUtil.playAnimationOnHumanoid(humanoid, this.animationId);
		this.janitor.Add(() => {
			track.Stop();
			track.Destroy();
		});
	}

	public destroy(): void {
		this.logger.Debug(`Stopping idle animation for ${this.instance.Name}`);
		super.destroy();
		this.janitor.Destroy();
	}
}
