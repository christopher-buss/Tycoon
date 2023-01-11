import Rodux from "@rbxts/rodux";

export interface ActionOpenNotification extends Rodux.Action<"ShowNotificationWindow"> {
	showNotification: boolean;
}

export interface ActionSetNotificationMessage extends Rodux.Action<"SetNotificationMessage"> {
	message: string;
}
