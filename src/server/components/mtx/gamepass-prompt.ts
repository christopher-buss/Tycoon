import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Janitor } from "@rbxts/janitor";
import { Logger } from "@rbxts/log";
import { MarketplaceService } from "@rbxts/services";
import { MtxService } from "server/services/mtx-service";
import { PlayerUtil } from "shared/util/player-util";

interface Attributes {
	GamepassId: number;
}

interface IGamepassPromptModel extends Model {
	Primary: BasePart;
}

@Component({})
export class GamepassPrompt extends BaseComponent<Attributes, IGamepassPromptModel> implements OnStart {
	private readonly Janitor: Janitor<void>;

	constructor(private readonly logger: Logger, private readonly mtxService: MtxService) {
		super();
		this.Janitor = new Janitor();
	}

	public onStart() {
		this.Janitor.Add(this.instance.Primary.Touched.Connect((...args) => this.onTouched(...args)));
	}

	private onTouched(part: BasePart) {
		const player_opt = PlayerUtil.getPlayerFromDescendant(part);
		if (player_opt.isNone()) {
			return;
		}

		const player = player_opt.unwrap();

		this.mtxService
			.checkForGamepassOwned(player, this.attributes.GamepassId)
			.then((hasPass) => {
				if (!hasPass) {
					MarketplaceService.PromptGamePassPurchase(player, this.attributes.GamepassId);
				}
			})
			.catch((err) => {
				this.logger.Warn(`Error checking for gamepass owned: ${err}`);
			});
	}

	public destroy(): void {
		super.destroy();
		this.Janitor.Destroy();
	}
}
