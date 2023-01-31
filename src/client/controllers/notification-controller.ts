import { Controller, OnInit } from "@flamework/core";
import { Events } from "client/network";
import { ClientStore } from "client/rodux/rodux";
import CoreCall from "client/util/core-call";
import { INotificationEntry } from "server/meta/notification-data";

@Controller({})
export class NotificationController implements OnInit {
	/**
	 *
	 */
	constructor() {}

	public onInit(): void {
		Events.sendNotification.connect((data: INotificationEntry) => this.showNotification(data));

		Events.sendOnScreenMessage.connect((message) => this.showGuiNotification(message));
	}

	private showNotification(data: INotificationEntry): void {
		CoreCall("SetCore", "SendNotification", data);
	}

	private showGuiNotification(message: string): void {
		ClientStore.dispatch({ type: "SetNotificationMessage", message });
		ClientStore.dispatch({ type: "ShowNotificationWindow", showNotification: true });
	}
}
