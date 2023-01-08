import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Janitor } from "@rbxts/janitor";
import { Logger } from "@rbxts/log";
import { FlameworkUtil } from "shared/util/flamework-utils";
import { Tag } from "types/enum/tags";
import { ILotModel } from "types/interfaces/lots";

import { IOnPurchaseButtonBought, PurchaseButton } from "./purchase-button";

interface Attributes {}

interface ILotSignModel extends Model {
	Claim: BasePart & {
		Claimed: SurfaceGui & {
			IconBox: Frame & {
				PlayerIcon: ImageLabel;
			};
			TextBox: Frame & {
				TextLabel: TextLabel;
				Username: TextLabel;
			};
		};
		Unclaimed: SurfaceGui & {
			Label1: TextLabel;
			Label2: TextLabel;
		};
	};
}

@Component({
	tag: Tag.LotSign,
})
export class LotSign extends BaseComponent<Attributes> implements OnStart, IOnPurchaseButtonBought {
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

	public onPurchaseButtonBought(player: Player, janitor: Janitor): void {
		const owner = this.instance.Parent?.Parent as ILotModel;
		if (!owner) {
			this.logger.Error(`Owner is undefined for ${this.instance.Name}`);
			return;
		}

		const sign = owner.Objects.FindFirstChild(this.instance.Name) as ILotSignModel;
		if (!sign) {
			this.logger.Error(`Lot sign is undefined for ${this.instance.Name}`);
			return;
		}

		this.logger.Debug(`Updating lot sign for ${owner.Name}`);

		const claimPart = sign.Claim;

		claimPart.Unclaimed.Enabled = false;
		claimPart.Claimed.Enabled = true;
		claimPart.Claimed.TextBox.Username.Text = `${player.Name}'s`;
		claimPart.Claimed.IconBox.PlayerIcon.Image = `rbxthumb://type=AvatarHeadShot&id=${player.UserId}&w=420&h=420`;

		janitor.Add(() => this.reset(claimPart));
	}

	public reset(claimPart: ILotSignModel["Claim"]): void {
		claimPart.Unclaimed.Enabled = true;
		claimPart.Claimed.Enabled = false;
	}
}
