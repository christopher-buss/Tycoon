import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { FlameworkUtil } from "shared/util/flamework-utils";
import { IOnPurchaseButtonBought, PurchaseButton } from "./purchase-button";

interface Attributes {}

@Component({
	tag: "PurchaseItem",
})
export class PurchaseItem extends BaseComponent<Attributes> implements OnStart, IOnPurchaseButtonBought {
	onStart() {
		FlameworkUtil.waitForComponentOnInstance<PurchaseButton>(
			this.instance.Parent?.Parent?.FindFirstChild("Buttons")?.FindFirstChild(this.instance.Name) as Model,
		).andThen((component) => {
			assert(component !== undefined, "Button is undefined");

			component.addListener(this);
		});
	}

	onPurchaseButtonBought(): void {}
}
