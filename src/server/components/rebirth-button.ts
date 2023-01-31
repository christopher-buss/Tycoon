import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Logger } from "@rbxts/log";
import { MarketplaceService } from "@rbxts/services";
import PlayerEntity from "server/modules/classes/player-entity";
import { MtxService } from "server/services/mtx-service";
import { PlayerChatService } from "server/services/player/player-chat-service";
import { PlayerService } from "server/services/player/player-service";
import { MoneyService } from "server/services/stores/money-service";
import { LotService } from "server/services/tycoon/lot-service";
import { DeveloperProducts } from "shared/meta/gamepasses";
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
		private readonly mtxService: MtxService,
		private readonly playerChatService: PlayerChatService,
		private readonly playerService: PlayerService,
	) {
		super();
		this.debounce = new Map();
	}

	public onStart(): void {
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

		if (this.checkIfPlayerOwnsAllItems(playerEntity)) {
			this.logger.Info(`Player ${player} is rebirthing.`);

			this.moneyService.setPlayerMoneyToZero(playerEntity);
			playerEntity.updateData((data) => {
				data.rebirths += 1;
				data.purchased = [];
				return data;
			});

			this.lotService.onPlayerRebirthedEvents.forEach((event, id) => {
				debug.profilebegin(id);
				Promise.try(() => {
					event.onPlayerRebirthed(playerEntity);
				}).catch((err) => {
					this.logger.Error(`Error in onPlayerRebirthed event ${id}: ${err}`);
				});
				debug.profilebegin(id);
			});

			// TODO: Convert this into an overhead ui
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
			// const lot_opt = this.lotService.getLotFromPlayer(playerEntity.player);
			// if (lot_opt.isNone()) {
			// 	return;
			// }

			// const lot = lot_opt.unwrap();

			// const purchased = lot.itemsOwnedByOwner;
			// const totalItems = lot.purchaseableItemsForOwner;

			this.logger.Info(`Player ${player} does not meet the requirements to rebirth.`);
			MarketplaceService.PromptProductPurchase(player, DeveloperProducts.InstantRebirth);
			// Events.sendOnScreenMessage(
			// 	playerEntity.player,
			// 	"You may only Rebirth after you have purchased everything and can pay " +
			// 		FormatCompact(BASE_REBIRTH_PRICE * totalRebirths + REBIRTH_ADDITIONAL_PRICE) +
			// 		".\n You have purchased " +
			// 		purchased +
			// 		"/" +
			// 		totalItems +
			// 		" items so far.",
			// );

			// this.playerChatService.sendLocalSystemMessage(
			// 	player,
			// 	"You can only Rebirth when you have purchased all Droppers and Tycoon Objects, and can pay a Rebirth Fee of in-game $" +
			// 		FormatCompact(BASE_REBIRTH_PRICE * totalRebirths + REBIRTH_ADDITIONAL_PRICE) +
			// 		". Rebirth will make your Cash Multiplier " +
			// 		string.format(
			// 			"%.1f",
			// 			(1 + totalRebirths / 5 + 0.2) * (playerData.gamePasses.doubleMoneyGamepass ? 2 : 1),
			// 		) +
			// 		"X.",
			// 	{
			// 		ChatColor: Color3.fromRGB(255, 0, 4),
			// 	},
			// );

			task.wait(0.5);
			this.debounce.set(player, false);
		}
	}

	private checkIfPlayerOwnsAllItems(playerEntity: PlayerEntity): boolean {
		const lot_opt = this.lotService.getLotFromPlayer(playerEntity.player);
		if (lot_opt.isNone()) {
			return false;
		}

		const lot = lot_opt.unwrap();
		return lot.purchaseableItemsForOwner === lot.itemsOwnedByOwner;
	}
}
