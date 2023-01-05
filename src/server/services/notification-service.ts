import { OnStart, Service } from "@flamework/core";
import notificationData, { AllNotificationData, INotificationEntry } from "server/meta/notification-data";
import { Events } from "server/network";

@Service({})
export class NotificationService implements OnStart {
	private readonly notificationData: AllNotificationData;
	private recentAds: Array<number>;
	private readonly totalNotifications: number;
	private readonly waitPeriod: number;

	constructor() {
		this.notificationData = notificationData;
		this.recentAds = [];
		this.totalNotifications = notificationData.size();
		this.waitPeriod = 120;
	}

	public onStart(): void {
		while (true) {
			let nextAdIndex = math.random(1, this.totalNotifications);

			while (this.recentAds.includes(nextAdIndex)) {
				nextAdIndex = math.random(1, this.totalNotifications);
			}

			this.sendNotificationToAllPlayers(this.notificationData[nextAdIndex]);

			if (this.recentAds.size() > 3) {
				this.recentAds.pop();
			}

			this.recentAds.push(nextAdIndex);

			task.wait(this.waitPeriod);
		}
	}

	private sendNotificationToAllPlayers(data: INotificationEntry): void {
		Events.sendNotification.broadcast(data);
	}

	public sendNotificationToPlayer(player: Player, data: INotificationEntry): void {
		Events.sendNotification.fire(player, data);
	}
}
