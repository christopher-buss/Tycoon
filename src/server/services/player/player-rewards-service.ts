import { OnInit, Service } from "@flamework/core";
import { default as PlayerEntity, default as playerEntity } from "server/modules/classes/player-entity";
import withPlayerEntity from "server/modules/with-player-entity";
import { Events } from "server/network";
import { GROUP_ID } from "shared/shared-constants";
import { NotificationService } from "../notification-service";
import { MoneyService } from "../stores/money-service";
import { OnPlayerJoin } from "./player-service";

const CASH_AWARDED_FOR_JOINING_GROUP = 2000;

@Service({})
export class PlayerRewardsService implements OnInit, OnPlayerJoin {
	constructor(
		private readonly moneyService: MoneyService,
		private readonly notificationService: NotificationService,
	) {}

	public onInit(): void {
		Events.joinedGroup.connect(
			withPlayerEntity((playerEntity) => {
				this.checkIfPlayerAwardedCash(playerEntity);
			}),
		);
	}

	public onPlayerJoin(playerEntity: playerEntity): void {
		this.checkIfPlayerAwardedCash(playerEntity);
		this.checkIfPlayerHasFriendsInGame(playerEntity.player);
	}

	private checkIfPlayerAwardedCash(playerEntity: PlayerEntity): void {
		if (playerEntity.player.IsInGroup(GROUP_ID) && !playerEntity.data.inGroup) {
			this.moneyService.givePlayerMoney(playerEntity.player, CASH_AWARDED_FOR_JOINING_GROUP);

			playerEntity.updateData((data) => {
				data.inGroup = true;
				return data;
			});

			this.notificationService.sendNotificationToPlayer(playerEntity.player, {
				Title: "You joined the group!",
				Text: "Here is " + CASH_AWARDED_FOR_JOINING_GROUP + " cash for joining the group!",
				Icon: "rbxassetid://0",
				Duration: 5,
			});
		}
	}

	private checkIfPlayerHasFriendsInGame(player: Player) {}
}
