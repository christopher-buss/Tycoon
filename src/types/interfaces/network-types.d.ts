import { IPlayerData } from "shared/meta/default-player-data";
import { NetResult } from "shared/util/networking";

export const enum ServerError {
	NoPlayerEntity = 1,
}

export const enum CodeMessage {
	Success = 1,
	InvalidCode = 2,
	AlreadyRedeemed = 3,
	Error = 4,
}

export interface NetOk<T extends defined> {
	readonly type: "Ok";
	readonly value: T;
}

export interface NetErr<E extends defined> {
	readonly err: E;
	readonly type: "Err";
}

export type NetPlayerData = NetResult<IPlayerData, ServerError>;
