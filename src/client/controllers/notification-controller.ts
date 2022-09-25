import { Controller, OnInit } from "@flamework/core";
import { Events } from "client/network";
import CoreCall from "client/util/core-call";
import { INotificationEntry } from "server/meta/notification-data";

@Controller({})
export class NotificationController implements OnInit {
	public onInit() {
		Events.sendNotification.connect((data: INotificationEntry) => this.showNotification(data));
	}

	private showNotification(data: INotificationEntry) {
		CoreCall("SetCore", "SendNotification", data);
	}
}
