import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Logger } from "@rbxts/log";
import { DropperService } from "server/services/tycoon/dropper-service";
import { FlameworkUtil } from "shared/util/flamework-utils";
import { Tag } from "types/enum/tags";
import { PathNumber } from "types/interfaces/droppers";

import { IOnPurchaseButtonBought, PurchaseButton } from "./purchase-button";

export interface IDropperAttributes {
	Path: PathNumber;
	StartProgress?: number;
}

export interface IDropperInfo {
	DropperType: string;
	Owner: Player;
	Path: PathNumber;
	StartProgress: number;
}

@Component({
	tag: Tag.Dropper,
})
export class Dropper extends BaseComponent<IDropperAttributes> implements OnStart, IOnPurchaseButtonBought {
	constructor(private readonly logger: Logger, private readonly dropperService: DropperService) {
		super();
	}

	public onStart(): void {
		FlameworkUtil.waitForComponentOnInstance<PurchaseButton>(this.instance)
			.andThen((component) => {
				assert(component !== undefined, "Button is undefined");
				component.addListener(this);
			})
			.catch((err) => {
				this.logger.Error(err);
			});
	}

	public onPurchaseButtonBought(owner: Player): void {
		this.logger.Info(`Dropper ${this.instance.Name} was bought by ${owner.Name}`);

		const dropperInfo: IDropperInfo = {
			DropperType: this.instance.Name,
			Path: this.attributes.Path,
			Owner: owner,
			StartProgress: this.attributes.StartProgress ?? 1,
		};

		this.dropperService.addOwnedDropper(dropperInfo);
	}
}
