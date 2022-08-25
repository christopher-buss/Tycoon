import { Dependency } from "@flamework/core";
import Log from "@rbxts/log";
import { Result } from "@rbxts/rust-classes";
import { PlayerService } from "server/services/player/player-service";
import { ServerError } from "types/interfaces/network-types";
import PlayerEntity from "./classes/player-entity";

let playerService: PlayerService;

/**
 * This method wraps a callback and replaces the first argument (that must be
 * of type `Player`) with that players `PlayerEntity` class.
 */
export default function withPlayerEntity<T extends Array<unknown>, R = void>(
	callback: (playerEntity: PlayerEntity, ...args: T) => R,
) {
	if (!playerService) {
		playerService = Dependency<PlayerService>();
	}

	return (player: Player, ...args: T) => {
		const entity = playerService.getEntity(player);
		if (entity.isSome()) {
			return callback(entity.unwrap(), ...args);
		}

		Log.Error(
			`Unable to find entity for player "{@Player}", unable to call callback. Stacktrace: \n{@Stacktrace}`,
			player,
			debug.traceback(),
		);

		return Result.err(ServerError.NoPlayerEntity);
	};
}
