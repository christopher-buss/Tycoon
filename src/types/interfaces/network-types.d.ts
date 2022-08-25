import { IPlayerData } from "shared/meta/default-player-data";
import { NetResult } from "shared/util/networking";

export const enum ServerError {
	NoPlayerEntity = 1,
}

export interface NetOk<T extends defined> {
	readonly type: "Ok";
	readonly value: T;
}

export interface NetErr<E extends defined> {
	readonly type: "Err";
	readonly err: E;
}

export type NetPlayerData = NetResult<IPlayerData, ServerError>;
