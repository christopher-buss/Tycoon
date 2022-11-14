import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Janitor } from "@rbxts/janitor";
import { Logger } from "@rbxts/log";
import { ServerStorage } from "@rbxts/services";
import { Events } from "server/network";
import { DropperService } from "server/services/tycoon/dropper-service";
import { PartInfo, PartInfoKey } from "shared/meta/part-info";
import { PathType } from "shared/meta/path-types";
import { FlameworkUtil } from "shared/util/flamework-utils";
import { Tag } from "types/enum/tags";
import { ILotModel } from "types/interfaces/lots";
import { IOnPurchaseButtonBought, PurchaseButton } from "./purchase-button";

export interface IUpgraderAttributes {
	PathType: PathType;
}

export interface IUpgraderInfo {
	PathType: PathType;
	Owner: Player;
	Value: number;
}

/**
 * Upgrader component.
 */
@Component({
	tag: Tag.Upgrader,
})
export class Upgrader extends BaseComponent<IUpgraderAttributes> implements OnStart, IOnPurchaseButtonBought {
	private owner: ILotModel;
	private upgrader: Model;

	constructor(private readonly logger: Logger, private readonly dropperService: DropperService) {
		super();
		this.owner = {} as ILotModel;
		this.upgrader = {} as Model;
	}

	public onStart() {
		const owner = this.instance.Parent?.Parent as ILotModel;
		assert(owner, "Owner is undefined");
		this.owner = owner;

		const upgrader = this.owner.Objects.FindFirstChild(this.instance.Name) as Model;
		assert(upgrader, "Upgrader is undefined");
		this.upgrader = upgrader;

		FlameworkUtil.waitForComponentOnInstance<PurchaseButton>(this.instance).andThen((component) => {
			assert(component !== undefined, "Button is undefined");
			component.addListener(this);
		});

		upgrader.Parent = ServerStorage.Upgraders.FindFirstChild(this.owner.Name);
	}

	public onPurchaseButtonBought(player: Player, janitor: Janitor): void {
		this.logger.Info(`Upgrader ${this.instance.Name} was bought by ${player.Name}`);

		this.upgrader.Parent = this.owner.Objects;

		Events.playerBoughtObject.broadcast(this.owner.Name, this.attributes.PathType, this.instance.Name);

		const upgraderInfo: IUpgraderInfo = {
			PathType: this.attributes.PathType,
			Owner: player,
			Value: PartInfo[this.instance.Name as PartInfoKey].Value,
		};

		// Register Dropper as being purchased
		this.dropperService.addOwnedUpgrader(upgraderInfo);

		janitor.Add(() => this.reset());
	}

	public reset(): void {
		this.logger.Debug(`Resetting upgrader ${this.instance.Name}`);
		this.upgrader.Parent = ServerStorage.Upgraders;
	}
}
