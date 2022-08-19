import { Result } from "@rbxts/rust-classes";
import { IPlayerData } from "shared/meta/default-player-data";
import { ServerError } from "types/interfaces/network-types";

export interface NetOk<T extends defined> {
	readonly type: "Ok";
	readonly value: T;
}

export interface NetErr<E extends defined> {
	readonly type: "Err";
	readonly err: E;
}

export type NetResult<T extends defined, E extends defined> = NetOk<T> | NetErr<E>;

export namespace NetResult {
	export function deserialize(serialized: NetResult<defined, defined>) {
		if (serialized.type === "Ok") {
			return Result.ok(serialized.value);
		} else {
			return Result.err(serialized.err);
		}
	}

	export function ok<T extends defined>(value: T): NetOk<T> {
		return identity<NetOk<T>>({
			type: "Ok",
			value: value,
		});
	}

	export function err<E extends defined>(err: E): NetErr<E> {
		return identity<NetErr<E>>({
			type: "Err",
			err: err,
		});
	}
}

export type PlayerDataRequested = NetResult<IPlayerData, ServerError>;
