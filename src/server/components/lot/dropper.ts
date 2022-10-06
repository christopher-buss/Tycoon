import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Logger } from "@rbxts/log";
import { DropperService } from "server/services/dropper-service";
import { FlameworkUtil } from "shared/util/flamework-utils";
import { IOnPurchaseButtonBought, PurchaseButton } from "./purchase-button";

export interface IDropperAttributes {
	PathType?: string;
}

@Component({
	tag: "Dropper",
})
export class Dropper extends BaseComponent<IDropperAttributes> implements OnStart, IOnPurchaseButtonBought {
	constructor(private readonly logger: Logger, private readonly dropperService: DropperService) {
		super();
	}

	public onStart() {
		FlameworkUtil.waitForComponentOnInstance<PurchaseButton>(
			this.instance.Parent?.Parent?.FindFirstChild("Buttons")?.FindFirstChild(this.instance.Name) as Model,
		).andThen((component) => {
			assert(component !== undefined, "Button is undefined");

			component.addListener(this);
		});
	}

	public onPurchaseButtonBought(): void {
		this.logger.Info(`Dropper ${this.instance.Name} was bought!`);
		this.dropperService.addOwnedDropper(this.instance.Name, this.attributes.PathType!);
		// Register Dropper as being purchased
	}
}
