import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { FormatCompact } from "@rbxts/format-number";
import { Logger } from "@rbxts/log";
import PlayerEntity from "server/modules/classes/player-entity";
import { PlayerChatService } from "server/services/player/player-chat-service";
import { PlayerService } from "server/services/player/player-service";
import { MoneyService } from "server/services/stores/money-service";
import { LotService } from "server/services/tycoon/lot-service";
import { encoderPartIdentifiers } from "shared/meta/part-identifiers";
import { BASE_REBIRTH_PRICE, REBIRTH_ADDITIONAL_PRICE } from "shared/shared-constants";
import { PlayerUtil } from "shared/util/player-util";
import { Tag } from "types/enum/tags";
import { IRebirthButtonAttributes, IRebirthButtonModel } from "types/interfaces/buttons";

@Component({
	tag: Tag.RebirthButton,
})
export class RebirthButton extends BaseComponent<IRebirthButtonAttributes, IRebirthButtonModel> implements OnStart {
	private debounce: Map<Player, boolean>;

	constructor(
		private readonly logger: Logger,
		private readonly lotService: LotService,
		private readonly moneyService: MoneyService,
		private readonly playerChatService: PlayerChatService,
		private readonly playerService: PlayerService,
	) {
		super();
		this.debounce = new Map();
	}

	public onStart() {
		this.instance.TouchPart.Touched.Connect((part: BasePart) => {
			this.onComponentTouched(part);
		});
	}

	/** @hidden */
	private onComponentTouched(part: BasePart): void {
		const player_opt = PlayerUtil.getPlayerFromDescendant(part);
		if (player_opt.isNone()) {
			return;
		}

		const player = player_opt.unwrap();
		if (this.debounce.get(player)) {
			return;
		}

		this.debounce.set(player, true);

		const playerEntity_opt = this.playerService.getEntity(player);
		if (playerEntity_opt.isNone()) {
			this.logger.Error(`Player entity for ${player} could not be found`);
			this.debounce.set(player, false);
			return;
		}

		this.logger.Info(`Player ${player} is attempting to rebirth.`);

		const playerEntity = playerEntity_opt.unwrap();
		const playerData = playerEntity.data;
		const totalRebirths = playerData.rebirths;

		const rebirthPrice = BASE_REBIRTH_PRICE + totalRebirths + REBIRTH_ADDITIONAL_PRICE;
		if (playerData.cash >= rebirthPrice && this.checkIfPlayerOwnsAllItems(playerEntity)) {
			this.logger.Info(`Player ${player} is rebirthing.`);

			this.moneyService.setPlayerMoneyToZero(playerEntity);
			playerEntity.updateData((data) => {
				data.rebirths += 1;
				data.purchased = [];
				return data;
			});

			for (const [id, event] of this.lotService.onPlayerRebirthedEvents) {
				debug.profilebegin(id);
				Promise.try(() => {
					event.onPlayerRebirthed(playerEntity);
				});
				debug.profilebegin(id);
			}

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

			player.LoadCharacter();

			task.wait(0.5);
			this.debounce.set(player, false);
		} else {
			this.logger.Info(`Player ${player} does not meet the requirements to rebirth.`);

			this.playerChatService.sendLocalSystemMessage(
				player,
				"You can only Rebirth when you have purchased all Droppers and Tycoon Objects, and can pay a Rebirth Fee of in-game ¥" +
					FormatCompact(BASE_REBIRTH_PRICE * totalRebirths + REBIRTH_ADDITIONAL_PRICE) +
					". Rebirth will make your Yen Multiplier " +
					string.format(
						"%.1f",
						(1 + totalRebirths / 5 + 0.2) * (playerData.gamePasses.doubleMoneyGamepass ? 2 : 1),
					) +
					"X.",
				{
					ChatColor: Color3.fromRGB(255, 0, 4),
				},
			);

			task.wait(0.5);
			this.debounce.set(player, false);
		}
	}

	private checkIfPlayerOwnsAllItems(playerEntity: PlayerEntity): boolean {
		const data = playerEntity.data.purchased.filter(
			(item) =>
				item !== encoderPartIdentifiers["Robux Dropper"] || item !== encoderPartIdentifiers["Robux Upgrader"],
		);

		return data.size() >= this.lotService.numberOfPurchaseableItems;
	}
}
