import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Janitor } from "@rbxts/janitor";
import { CollectionService } from "@rbxts/services";
import { RobloxUtil } from "shared/util/roblox";
import { Tag } from "types/enum/tags";

interface Attributes {
	PettingID: number;
}

@Component({
	tag: Tag.Pet,
})
export class Pet extends BaseComponent<Attributes> implements OnStart {
	private debounce;

	private readonly janitor: Janitor;
	private readonly animationId: string;

	constructor() {
		super();
		this.debounce = false;
		this.janitor = new Janitor();
		this.animationId = RobloxUtil.assetUrlWithId(this.attributes.PettingID);
	}

	public onStart(): void {
		const proximityPrompt = new Instance("ProximityPrompt");
		proximityPrompt.ActionText = "Pet";
		proximityPrompt.TriggerEnded.Connect(() => this.petTheDamnDog());
		proximityPrompt.Parent = this.instance;
	}

	public petTheDamnDog(): void {
		if (this.debounce) {
			return;
		}

		this.debounce = true;

		if (CollectionService.HasTag(this.instance, Tag.Animate)) {
			CollectionService.RemoveTag(this.instance, Tag.Animate);
		}

		const humanoid = this.instance.FindFirstChildWhichIsA("Humanoid");
		if (humanoid === undefined) {
			return;
		}

		const track = RobloxUtil.playAnimationOnHumanoid(humanoid, this.animationId);
		track.Ended.Once(() => {
			CollectionService.AddTag(this.instance, Tag.Animate);
			this.debounce = false;
		});
	}

	public destroy(): void {
		super.destroy();
		this.janitor.Destroy();
	}
}
