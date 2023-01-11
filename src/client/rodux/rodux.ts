import Rodux from "@rbxts/rodux";

import { DataActions, dataReducer, IDataReducer } from "./reducers/data-reducer";
import { INotificationReducer, NotificationActions, notificationReducer } from "./reducers/notification-reducer";

export interface IClientStore {
	playerData: IDataReducer;
	notificationData: INotificationReducer;
}

export type StoreActions = DataActions | NotificationActions;

export const StoreReducer = Rodux.combineReducers<IClientStore, StoreActions>({
	playerData: dataReducer,
	notificationData: notificationReducer,
});

export const ClientStore = new Rodux.Store<IClientStore, StoreActions>(StoreReducer, {}, [
	Rodux.thunkMiddleware,
] as never);
