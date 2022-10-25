import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Logger } from "@rbxts/log";
import { ServerStorage } from "@rbxts/services";
import { Events } from "server/network";
import { DropperService } from "server/services/tycoon/dropper-service";
import { PathType } from "shared/meta/path-types";
import { FlameworkUtil } from "shared/util/flamework-utils";
import { Tag } from "types/enum/tags";
import { ILotModel } from "types/interfaces/lots";
import { IOnPurchaseButtonBought, PurchaseButton } from "./purchase-button";

export interface IUpgraderAttributes {
	PathType?: PathType;
}

export interface IDropperInfo {
	DropperType: string;
	PathType: PathType;
	Owner: Player; // may need later on
}

@Component({
	tag: Tag.Upgrader,
})
export class Upgrader extends BaseComponent<IUpgraderAttributes> implements OnStart, IOnPurchaseButtonBought {
	private readonly owner!: ILotModel;
	private readonly upgrader!: Model;

	constructor(private readonly logger: Logger, private readonly dropperService: DropperService) {
		super();
		const owner = this.instance.Parent?.Parent as ILotModel;
		assert(owner, "Owner is undefined");
		this.owner = owner;

		const upgrader = this.instance.Parent?.Parent?.FindFirstChild("Objects")?.FindFirstChild(
			this.instance.Name,
		) as Model;
		assert(upgrader, "Upgrader is undefined");
		this.upgrader = upgrader;
	}

	public onStart() {
		this.upgrader.Parent = ServerStorage.Folder.FindFirstChild(this.owner.Name);

		FlameworkUtil.waitForComponentOnInstance<PurchaseButton>(this.instance).andThen((component) => {
			assert(component !== undefined, "Button is undefined");

			component.addListener(this);
		});
	}

	public onPurchaseButtonBought(player: Player): void {
		this.logger.Info(`Upgrader ${this.instance.Name} was bought by ${player.Name}`);

		this.upgrader.Parent = this.owner.Objects;

		Events.playerBoughtObject.fire(
			this.dropperService.getPlayersInRangeOfLot(this.owner.Name),
			this.upgrader.GetFullName(),
		);

		// const dropperInfo: IDropperInfo = {
		// 	DropperType: this.instance.Name,
		// 	PathType: this.attributes.PathType!,
		// 	Owner: owner,
		// };

		// this.dropperService.addOwnedDropper(dropperInfo);
		// Register Dropper as being purchased
	}
}
