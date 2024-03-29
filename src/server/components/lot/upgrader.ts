import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Janitor } from "@rbxts/janitor";
import { Logger } from "@rbxts/log";
import { ServerStorage } from "@rbxts/services";
import { AnimationUtil } from "server/functions/animate-item";
import PlayerEntity from "server/modules/classes/player-entity";
import { Events } from "server/network";
import { DropperService } from "server/services/tycoon/dropper-service";
import { PartInfo, PartInfoType, UpgraderKey } from "shared/meta/part-info";
import { FlameworkUtil } from "shared/util/flamework-utils";
import { Tag } from "types/enum/tags";
import { ILotModel } from "types/interfaces/lots";

import { IOnPurchaseButtonBought, PurchaseButton } from "./purchase-button";

export interface IUpgraderAttributes {
	Color?: Color3;
	Path: number;
}

export interface IUpgraderInfo {
	Color?: Color3;
	Owner: Player;
	Path: number;
	Additive: number;
	Multiplier: number;
}

/**
 * An upgrader component.
 * This component will add an upgrade into the world, and register the attached
 * object with the dropper service.
 *
 * An extension of the {@link PurchaseButton} component.
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

	public onStart(): void {
		const owner = this.instance.Parent?.Parent as ILotModel;
		assert(owner, "Owner is undefined");
		this.owner = owner;

		const upgrader = this.owner.Objects.FindFirstChild(this.instance.Name) as Model;
		assert(upgrader, "Upgrader is undefined");
		this.upgrader = upgrader;

		FlameworkUtil.waitForComponentOnInstance<PurchaseButton>(this.instance)
			.andThen((component) => {
				assert(component !== undefined, "Button is undefined");
				component.addListener(this);
			})
			.catch((err) => {
				this.logger.Error(err);
			});

		// Removes the upgrader from the world, and stores it in ServerStorage
		// for later retrieval.
		upgrader.Parent = ServerStorage.Upgraders.FindFirstChild(this.owner.Name);
	}

	/**
	 * Called when the linked purchase button is successfully purchased.
	 *
	 * @param player The player who purchased the button.
	 */
	public onPurchaseButtonBought(playerEntity: PlayerEntity, janitor: Janitor): void {
		this.logger.Info(`Upgrader ${this.instance.Name} was bought by ${playerEntity.name}`);

		this.upgrader.Parent = this.owner.Objects;

		const lotName = this.owner.Name;

		Events.playerBoughtObject.broadcast(lotName, this.attributes.Path, this.instance.Name, this.attributes.Color);

		AnimationUtil.animateItem(lotName, this.upgrader);

		const upgraderInfo: IUpgraderInfo = {
			Color: this.attributes.Color,
			Path: this.attributes.Path,
			Owner: playerEntity.player,
			Additive: (PartInfo[this.instance.Name as PartInfoType] as UpgraderKey).Additive,
			Multiplier: (PartInfo[this.instance.Name as PartInfoType] as UpgraderKey).Multiplier,
		};

		// Register upgrader as being purchased
		this.dropperService.addOwnedUpgrader(upgraderInfo);

		janitor.Add(() => this.reset());
	}

	public reset(): void {
		this.logger.Debug(`Resetting upgrader ${this.instance.Name}`);
		this.upgrader.Parent = ServerStorage.Upgraders;
	}
}
