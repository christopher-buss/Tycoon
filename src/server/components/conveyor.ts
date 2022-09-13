import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";

interface IConveyor extends BasePart {
	AttStart: Attachment;
	AttEnd: Attachment;
}

@Component({
	tag: "ConveyorBelt",
})
export class conveyor extends BaseComponent<{}, IConveyor> implements OnStart {
	private readonly conveyorSpeed = 22;

	public onStart(): void {
		const direction = this.instance.AttEnd.WorldPosition.sub(this.instance.AttStart.WorldPosition);

		const velocity = direction.Unit.mul(this.conveyorSpeed);
		this.instance.AssemblyLinearVelocity = velocity;

		this.destroy();
	}

	public destroy(): void {
		super.destroy();
	}
}
