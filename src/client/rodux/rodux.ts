import Rodux from "@rbxts/rodux";
import { DataActions, dataReducer, IDataReducer } from "./reducers/data-reducer";

export interface IClientStore {
	playerData: IDataReducer;
}

export type StoreActions = DataActions;

export const StoreReducer = Rodux.combineReducers<IClientStore, StoreActions>({
	playerData: dataReducer,
});

export const ClientStore = new Rodux.Store<IClientStore, StoreActions>(StoreReducer, {}, [
	Rodux.thunkMiddleware,
] as never);
