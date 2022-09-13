import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";

interface IConveyorAttributes {
	ConveyorSpeed: number;
}

interface IConveyor extends BasePart {
	AttStart: Attachment;
	AttEnd: Attachment;
}

/**
 * Sets up the velocity of a given conveyor.
 *
 * This is only used as an initial setup, therefore the component is destroyed
 * once setup is complete.
 */
@Component({
	tag: "ConveyorBelt",
})
export class conveyor extends BaseComponent<IConveyorAttributes, IConveyor> implements OnStart {
	public onStart(): void {
		const direction = this.instance.AttEnd.WorldPosition.sub(this.instance.AttStart.WorldPosition);

		const velocity = direction.Unit.mul(this.attributes.ConveyorSpeed);
		this.instance.AssemblyLinearVelocity = velocity;

		this.destroy();
	}

	public destroy(): void {
		super.destroy();
	}
}
