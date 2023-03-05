import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Janitor } from "@rbxts/janitor";
import { Logger } from "@rbxts/log";
import { ServerStorage } from "@rbxts/services";
import PlayerEntity from "server/modules/classes/player-entity";
import { OnPlayerRebirthed } from "server/services/tycoon/lot-service";
import { FlameworkUtil } from "shared/util/flamework-utils";
import { Tag } from "types/enum/tags";
import { ILotModel } from "types/interfaces/lots";

import { IOnPurchaseButtonBought, PurchaseButton } from "./purchase-button";

interface Attributes {
	ItemToRemove: string;
}

@Component({
	tag: Tag.Remover,
})
export class Remover extends BaseComponent<Attributes> implements OnStart, IOnPurchaseButtonBought, OnPlayerRebirthed {
	private owner: ILotModel;
	private toRemove: Model;

	constructor(private readonly logger: Logger) {
		super();
		this.owner = {} as ILotModel;
		this.toRemove = {} as Model;
	}

	public onStart(): void {
		const owner = this.instance.Parent?.Parent as ILotModel;
		assert(owner, "Owner is undefined");
		this.owner = owner;

		const toRemove = owner.Objects.FindFirstChild(this.attributes.ItemToRemove) as Model;
		assert(toRemove, "Item to remove is undefined");
		this.toRemove = toRemove;

		FlameworkUtil.waitForComponentOnInstance<PurchaseButton>(this.instance)
			.andThen((component) => {
				assert(component !== undefined, "Button is undefined");
				component.addListener(this);
			})
			.catch((err) => {
				this.logger.Error(err);
			});
	}

	public onPurchaseButtonBought(owner: PlayerEntity, janitor: Janitor): void {
		this.logger.Info(`Remover ${this.instance.Name} was bought by ${owner.player.Name}`);
		this.toRemove.Parent = ServerStorage;

		janitor.Add(() => this.reset());
	}

	public onPlayerRebirthed(playerEntity: PlayerEntity): void {
		const lot = playerEntity.player.GetAttribute("Lot") as string | undefined;
		if (lot === undefined) {
			this.logger.Error(`Could not find lot for player ${playerEntity.player}`);
			return;
		}

		if (lot !== this.owner.Name) {
			return;
		}

		this.reset();
	}

	public reset(): void {
		this.logger.Debug(`Resetting remover ${this.instance.Name}`);
		this.toRemove.Parent = this.owner.Objects;
	}
}
