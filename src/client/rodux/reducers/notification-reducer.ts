import Rodux from "@rbxts/rodux";

import { ActionOpenNotification, ActionSetNotificationMessage } from "../actions/notification-actions";

export interface INotificationReducer {
	showNotification: boolean;
	message: string;
}

const InitialState: INotificationReducer = { showNotification: false, message: "404: Message not found!" };

export type NotificationActions = ActionOpenNotification | ActionSetNotificationMessage;

export const notificationReducer = Rodux.createReducer<INotificationReducer, NotificationActions>(InitialState, {
	ShowNotificationWindow: (state, action) => {
		return {
			...state,
			showNotification: action.showNotification,
		};
	},

	SetNotificationMessage: (state, action) => {
		return {
			...state,
			message: action.message,
		};
	},
});
