import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { FormatCompact } from "@rbxts/format-number";
import { Logger } from "@rbxts/log";
import { PlayerChatService } from "server/services/player/player-chat-service";
import { PlayerService } from "server/services/player/player-service";
import { BASE_REBIRTH_PRICE, REBIRTH_ADDITIONAL_PRICE } from "shared/shared-constants";
import { PlayerUtil } from "shared/util/player-util";
import { IRebirthButtonAttributes, IRebirthButtonModel } from "types/interfaces/buttons";

@Component({})
export class RebirthButton extends BaseComponent<IRebirthButtonAttributes, IRebirthButtonModel> implements OnStart {
	private debounce: boolean;

	constructor(
		private readonly logger: Logger,
		private readonly playerService: PlayerService,
		private readonly playerChatService: PlayerChatService,
	) {
		super();
		this.debounce = false;
	}

	public onStart() {
		this.instance.TouchPart.Touched.Connect((part: BasePart) => {
			this.onComponentTouched(part);
		});
	}

	/** @hidden */
	private onComponentTouched(part: BasePart): void {
		if (this.debounce) {
			return;
		}

		this.debounce = true;

		const player_opt = PlayerUtil.getPlayerFromDescendant(part);
		if (player_opt.isNone()) {
			this.debounce = false;
			return;
		}

		const player = player_opt.unwrap();
		const playerEntity_opt = this.playerService.getEntity(player);
		if (playerEntity_opt.isNone()) {
			this.logger.Error(`Player entity for ${player} could not be found`);
			this.debounce = false;
			return;
		}

		this.logger.Info(`Player ${player} is attempting to rebirth.`);

		const playerEntity = playerEntity_opt.unwrap();
		const playerData = playerEntity.data;
		const totalRebirths = playerData.rebirths;

		//todo: check if player owns all items

		if (playerData.cash >= BASE_REBIRTH_PRICE + totalRebirths + REBIRTH_ADDITIONAL_PRICE) {
			this.logger.Info(`Player ${player} is rebirthing.`);
			playerEntity.updateData((data) => {
				data.rebirths += 1;
				data.cash = 0;
				data.purchased = [];
				return data;
			});

			this.playerChatService.sendSystemMessage(
				player.Name +
					" is rebirthing! They have rebirthed " +
					tostring(totalRebirths + 1) +
					(totalRebirths + 1 === 1 ? " time." : " times."),

				{
					NameColor: Color3.fromRGB(255, 0, 4),
					ChatColor: Color3.fromRGB(255, 0, 4),
				},
			);
		} else {
			this.logger.Info(`Player ${player} does not meet the requirements to rebirth.`);

			this.playerChatService.sendLocalSystemMessage(
				player,
				"You can only Rebirth when you have purchased all Droppers and Tycoon Objects, and can pay a Rebirth Fee of in-game ¥" +
					FormatCompact(BASE_REBIRTH_PRICE + totalRebirths + REBIRTH_ADDITIONAL_PRICE) +
					". Rebirth will make your Yen Multiplier " +
					string.format(
						"%.1f",
						(1 + totalRebirths / 5 + 0.2) * (playerData.gamePasses.doubleMoneyGamepass ? 1 : 2),
					) +
					"X.",
				{
					ChatColor: Color3.fromRGB(255, 0, 4),
				},
			);
		}
	}
}
