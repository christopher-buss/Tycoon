import { OnInit, Service } from "@flamework/core";
import { Logger } from "@rbxts/log";
import { HttpService } from "@rbxts/services";
import { default as PlayerEntity, default as playerEntity } from "server/modules/classes/player-entity";
import withPlayerEntity from "server/modules/with-player-entity";
import { Events } from "server/network";
import { GROUP_ID } from "shared/shared-constants";

import { NotificationService } from "../notification-service";
import { MoneyService } from "../stores/money-service";
import { OnPlayerJoin } from "./player-service";

const CASH_AWARDED_FOR_JOINING_GROUP = 0; //2000;
const CASH_AWARDED_FOR_FRIENDS_IN_GAME = 500;

@Service({})
export class PlayerRewardsService implements OnInit, OnPlayerJoin {
	constructor(
		private readonly logger: Logger,
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

	public async onPlayerJoin(playerEntity: playerEntity): Promise<void> {
		this.checkIfPlayerAwardedCash(playerEntity);
		Promise.retryWithDelay(async () => this.checkIfPlayerWasInvited(playerEntity), 5, 0.5).catch((err) => {
			this.logger.Error(err);
		});
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

	private checkIfPlayerWasInvited(playerEntity: PlayerEntity): Promise<void> {
		return new Promise((resolve, reject) => {
			const joinData = playerEntity.player.GetJoinData().TeleportData as string | undefined;
			if (joinData !== undefined) {
				const [success, result] = pcall(() => HttpService.JSONDecode(joinData));
				if (!success) {
					this.logger.Warn(`Failed to decode join data for player ${playerEntity.player.Name}`);
					return reject();
				}

				// handle data
				print("TODO: handle join data");
				resolve();
			}
		});
	}
}
