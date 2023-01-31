import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Janitor } from "@rbxts/janitor";
import { Logger } from "@rbxts/log";
import { MarketplaceService } from "@rbxts/services";
import { MtxService } from "server/services/mtx-service";
import { PlayerUtil } from "shared/util/player-util";
import { Tag } from "types/enum/tags";

interface Attributes {
	GamepassId: number;
	DeveloperProduct?: boolean;
}

export interface IGamepassPromptModel extends Model {
	Root: BasePart;
}

@Component({
	tag: Tag.GamepassPrompt,
})
export class GamepassPrompt extends BaseComponent<Attributes, IGamepassPromptModel> implements OnStart {
	private readonly Janitor: Janitor<void>;
	private debounce = false;

	constructor(private readonly logger: Logger, private readonly mtxService: MtxService) {
		super();
		this.Janitor = new Janitor();
	}

	public onStart(): void {
		this.instance.Root.CanTouch = true;
		this.Janitor.Add(this.instance.Root.Touched.Connect((...args) => this.onTouched(...args)));
	}

	private onTouched(part: BasePart): void {
		if (this.debounce) {
			return;
		}

		this.debounce = true;
		task.delay(1, () => {
			this.debounce = false;
		});

		const player_opt = PlayerUtil.getPlayerFromDescendant(part);
		if (player_opt.isNone()) {
			return;
		}

		const player = player_opt.unwrap();

		if (this.attributes.DeveloperProduct !== undefined && this.attributes.DeveloperProduct) {
			MarketplaceService.PromptProductPurchase(player, this.attributes.GamepassId);
			return;
		}

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
