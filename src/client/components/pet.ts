import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";

interface Attributes {
	PettingID: number;
}

// TODO
@Component({})
export class pet extends BaseComponent<{}> implements OnStart {
	// private readonly idleAnimation: AnimationTrack;
	// private readonly petAnimation: AnimationTrack;

	constructor() {
		super();
	}

	public onStart(): void {}
}
