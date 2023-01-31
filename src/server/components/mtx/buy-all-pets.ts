import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Janitor } from "@rbxts/janitor";
import { Logger } from "@rbxts/log";
import PlayerEntity from "server/modules/classes/player-entity";
import { MtxService } from "server/services/mtx-service";
import { Gamepasses } from "shared/meta/gamepasses";
import { FlameworkUtil } from "shared/util/flamework-utils";
import { Tag } from "types/enum/tags";

import { IOnPurchaseButtonBought, PurchaseButton } from "../lot/purchase-button";

interface Attributes {}

@Component({
	tag: Tag.BuyAllPets,
})
export class BuyAllPets extends BaseComponent<Attributes> implements OnStart, IOnPurchaseButtonBought {
	constructor(private readonly logger: Logger, private readonly mtxService: MtxService) {
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

	public onPurchaseButtonBought(owner: PlayerEntity, _janitor: Janitor): void {
		this.mtxService
			.checkForGamepassOwned(owner.player, Gamepasses.BuyAllPets)
			.andThen((owned) => {
				if (!owned) {
					return;
				}

				this.logger.Info(`BuyAllPets was bought by ${owner.player.Name}`);

				this.mtxService.buyAllPetsGamepass(owner);
			})
			.catch((err) => {
				this.logger.Error(err);
			});
	}
}
