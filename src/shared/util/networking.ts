import { Result } from "@rbxts/rust-classes";
import { NetErr, NetOk } from "types/interfaces/network-types";

export type NetResult<T extends defined, E extends defined> = NetOk<T> | NetErr<E>;

/**
 * Utility functions for sending rust-style Result's over the network.
 */
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
