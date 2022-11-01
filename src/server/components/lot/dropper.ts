import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Logger } from "@rbxts/log";
import { DropperService } from "server/services/tycoon/dropper-service";
import { PathType } from "shared/meta/path-types";
import { FlameworkUtil } from "shared/util/flamework-utils";
import { Tag } from "types/enum/tags";
import { IOnPurchaseButtonBought, PurchaseButton } from "./purchase-button";

export interface IDropperAttributes {
	PathType: PathType;
	StartProgress?: number;
}

export interface IDropperInfo {
	DropperType: string;
	Owner: Player;
	PathType: PathType;
	StartProgress: number;
}

@Component({
	tag: Tag.Dropper,
})
export class Dropper extends BaseComponent<IDropperAttributes> implements OnStart, IOnPurchaseButtonBought {
	constructor(private readonly logger: Logger, private readonly dropperService: DropperService) {
		super();
	}

	public onStart() {
		FlameworkUtil.waitForComponentOnInstance<PurchaseButton>(this.instance).andThen((component) => {
			assert(component !== undefined, "Button is undefined");
			component.addListener(this);
		});
	}

	public onPurchaseButtonBought(owner: Player): void {
		this.logger.Info(`Dropper ${this.instance.Name} was bought by ${owner.Name}`);

		const dropperInfo: IDropperInfo = {
			DropperType: this.instance.Name,
			PathType: this.attributes.PathType,
			Owner: owner,
			StartProgress: this.attributes.StartProgress ?? 0,
		};

		this.dropperService.addOwnedDropper(dropperInfo);
	}
}
