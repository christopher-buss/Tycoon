import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { MoneyService } from "server/services/stores/money-service";
import { PlayerUtil } from "shared/util/player-util";

interface Attributes {}

@Component({
	tag: "Debug",
})
export class Debug extends BaseComponent<Attributes, BasePart> implements OnStart {
	private debounce = false;

	constructor(private readonly moneyService: MoneyService) {
		super();
	}

	public onStart(): void {
		this.instance.Touched.Connect((part) => {
			PlayerUtil.getPlayerFromDescendant(part).match(
				(player) => {
					this.debounce = true;
					this.moneyService.givePlayerMoney(player, 500);
					task.delay(0.5, () => {
						this.debounce = false;
					});
				},
				() => {},
			);
		});
	}
}
