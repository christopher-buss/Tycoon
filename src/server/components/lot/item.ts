import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Logger } from "@rbxts/log";
import { CollectionService, ServerStorage } from "@rbxts/services";
import { MoneyService } from "server/services/stores/money-service";
import { ItemKey, PartInfo, PartInfoType } from "shared/meta/part-info";
import { FlameworkUtil } from "shared/util/flamework-utils";
import { Tag } from "types/enum/tags";
import { ILotModel } from "types/interfaces/lots";

import { IOnPurchaseButtonBought, PurchaseButton } from "./purchase-button";

export interface IItemAttributes {}

export interface IItemInfo {
	Owner: Player;
	Path: number;
	Value: number;
}

/**
 * An item component.
 * This component will add an item into the world, and provide a flat set of
 * money to the player who purchases it every second.
 *
 * An extension of the {@link PurchaseButton} component.
 */
@Component({
	tag: Tag.Item,
})
export class Item extends BaseComponent<IItemAttributes> implements OnStart, IOnPurchaseButtonBought {
	private owner: ILotModel;
	private item: Model;

	constructor(private readonly logger: Logger, private readonly moneyService: MoneyService) {
		super();
		this.owner = {} as ILotModel;
		this.item = {} as Model;
	}

	public onStart(): void {
		const owner = this.instance.Parent?.Parent as ILotModel;
		assert(owner, "Owner is undefined");
		this.owner = owner;

		const item = this.owner.Objects.FindFirstChild(this.instance.Name) as Model;
		assert(item, "Item is undefined");
		this.item = item;

		FlameworkUtil.waitForComponentOnInstance<PurchaseButton>(this.instance)
			.andThen((component) => {
				assert(component !== undefined, "Button is undefined");
				component.addListener(this);
			})
			.catch((err) => {
				this.logger.Error(err);
			});

		// Removes the item from the world, and stores it in ServerStorage for
		// later retrieval.
		item.Parent = ServerStorage.Upgraders.FindFirstChild(this.owner.Name);
	}

	/**
	 * Called when the linked purchase button is successfully purchased.
	 *
	 * @param player The player who purchased the button.
	 */
	public onPurchaseButtonBought(player: Player): void {
		this.logger.Info(`Item ${this.instance.Name} was bought by ${player.Name}`);

		this.item.Parent = this.owner.Objects;

		if (CollectionService.HasTag(this.instance, Tag.Dropper)) {
			return;
		}

		// Events.playerBoughtObject.broadcast(this.owner.Name, this.attributes.Path, this.instance.Name);

		print("ITEM");
		const value = (PartInfo[this.instance.Name as PartInfoType] as ItemKey).Value;
		this.moneyService.addMoneyConnection(player, value);

		// const upgraderInfo: IUpgraderInfo = {
		// 	Path: this.attributes.Path,
		// 	Owner: player,
		// 	Value: PartInfo[this.instance.Name as PartInfoKey].Value,
		// };

		// // Register upgrader as being purchased
		// this.dropperService.addOwnedUpgrader(upgraderInfo);
	}
}
