import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Logger } from "@rbxts/log";
import { DropperService } from "server/services/dropper-service";
import { PathType } from "shared/meta/path-types";
import { FlameworkUtil } from "shared/util/flamework-utils";
import { IOnPurchaseButtonBought, PurchaseButton } from "./purchase-button";

export interface IDropperAttributes {
	PathType?: PathType;
}

export interface IDropperInfo {
	DropperType: string;
	PathType: PathType;
	Owner: Player; // may need later on
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

	public onPurchaseButtonBought(owner: Player): void {
		this.logger.Info(`Dropper ${this.instance.Name} was bought!`);

		const dropperInfo: IDropperInfo = {
			DropperType: this.instance.Name,
			PathType: this.attributes.PathType!,
			Owner: owner,
		};

		this.dropperService.addOwnedDropper(dropperInfo);
		// Register Dropper as being purchased
	}
}
