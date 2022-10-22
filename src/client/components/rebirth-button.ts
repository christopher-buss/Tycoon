import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";

interface Attributes {}

@Component({})
export class RebirthButton extends BaseComponent<Attributes> implements OnStart {
	public onStart() {}
}
