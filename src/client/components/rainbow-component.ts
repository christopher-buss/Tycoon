import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Tag } from "types/enum/tags";

interface Attributes {
	Speed: number;
}

interface IModel extends BasePart {}

@Component({
	tag: Tag.Rainbow,
})
export class RainbowComponent extends BaseComponent<Attributes, IModel> implements OnStart {
	public onStart(): void {
		while (true) {
			for (let i = 0; i < 1; i += 0.001 * this.attributes.Speed) {
				this.instance.Color = Color3.fromHSV(i, 1, 1);
				task.wait();
			}
		}
	}
}
