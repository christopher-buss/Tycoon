import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Janitor } from "@rbxts/janitor";
import { Logger } from "@rbxts/log";
import { PlayerService } from "server/services/player/player-service";
import { OnLotOwned } from "server/services/tycoon/lot-service";
import { EncodePartIdentifier, encoderPartIdentifiers } from "shared/meta/part-identifiers";
import { FlameworkUtil } from "shared/util/flamework-utils";
import { Tag } from "types/enum/tags";
import { IPurchaseButtonAttributes, IPurchaseButtonModel } from "types/interfaces/buttons";

import { Lot } from "./lot";
import { IOnPurchaseButtonBought, PurchaseButton } from "./purchase-button";

interface Attributes extends IPurchaseButtonAttributes {
	Time: number;
}

@Component({
	tag: Tag.TimerButton,
})
export class TimerButton
	extends BaseComponent<Attributes, IPurchaseButtonModel>
	implements OnStart, OnLotOwned, IOnPurchaseButtonBought
{
	private readonly janitor: Janitor;
	private gamepassIdCache: number;
	private timeCache: number;

	constructor(private readonly logger: Logger, private readonly playerService: PlayerService) {
		super();
		assert(this.attributes.GamepassId !== undefined, "GamepassId is undefined");
		this.gamepassIdCache = this.attributes.GamepassId;
		this.attributes.GamepassId = undefined;
		this.janitor = new Janitor();
		this.timeCache = this.attributes.Time;
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

	public onLotOwned(lot: Lot, newOwner: Player): void {
		const playerEntity_opt = this.playerService.getEntity(newOwner);
		if (playerEntity_opt.isNone()) {
			this.logger.Error(`Player entity not found for player ${newOwner.Name}`);
			return;
		}

		const encoded = encoderPartIdentifiers[this.instance.Name as keyof EncodePartIdentifier];

		const playerEntity = playerEntity_opt.unwrap();
		if (playerEntity.data.rebirths === 0 && !playerEntity.data.purchased.includes(encoded)) {
			this.attributes.GamepassId = this.gamepassIdCache;

			this.janitor.Add(
				task.delay(this.timeCache, () => {
					this.attributes.GamepassId = undefined;
				}),
			);
		} else {
			this.onPurchaseButtonBought(newOwner);
		}

		playerEntity.playerRemoving.Add(() => {
			this.janitor.Cleanup();
		});
	}

	public onPurchaseButtonBought(owner: Player): void {}
}
