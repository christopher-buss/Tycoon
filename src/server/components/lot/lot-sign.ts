import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Janitor } from "@rbxts/janitor";
import { Logger } from "@rbxts/log";
import PlayerEntity from "server/modules/classes/player-entity";
import { FlameworkUtil } from "shared/util/flamework-utils";
import { Tag } from "types/enum/tags";
import { ILotModel, ILotSignModel } from "types/interfaces/lots";

import { IOnPurchaseButtonBought, PurchaseButton } from "./purchase-button";

interface Attributes {}

@Component({
	tag: Tag.LotSign,
})
export class LotSign extends BaseComponent<Attributes, ILotSignModel> implements OnStart, IOnPurchaseButtonBought {
	constructor(private readonly logger: Logger) {
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

	public onPurchaseButtonBought(playerEntity: PlayerEntity, janitor: Janitor): void {
		janitor.Add(() => this.reset(claimPart));

		const owner = this.instance.Parent?.Parent as ILotModel;
		if (!owner) {
			this.logger.Error(`Owner is undefined for ${this.instance.Name}`);
			return;
		}

		this.logger.Debug(`Updating lot sign for ${owner.Name}`);

		const claimPart = this.instance.Claim;

		claimPart.Unclaimed.Enabled = false;
		claimPart.Claimed.Enabled = true;
		claimPart.Claimed.TextBox.Username.Text = `${playerEntity.name}'s`;
		claimPart.Claimed.IconBox.PlayerIcon.Image = `rbxthumb://type=AvatarHeadShot&id=${playerEntity.player.UserId}&w=420&h=420`;
	}

	public reset(claimPart: ILotSignModel["Claim"]): void {
		claimPart.Unclaimed.Enabled = true;
		claimPart.Claimed.Enabled = false;
		claimPart.Claimed.TextBox.Username.Text = "";
		claimPart.Claimed.IconBox.PlayerIcon.Image = "";
	}
}
