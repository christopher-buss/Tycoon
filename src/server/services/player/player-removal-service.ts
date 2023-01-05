import { Service } from "@flamework/core";
import { Logger } from "@rbxts/log";
import PlayerKickReason from "types/enum/kick-reason";

/**
 * A service that handles removing players from the server.
 */
@Service({})
export default class PlayerRemovalService {
	constructor(private readonly logger: Logger) {}

	/**
	 *
	 * @param code
	 * @returns
	 */
	public toMessage(code: PlayerKickReason): string {
		switch (code) {
			case PlayerKickReason.PlayerEntityInstantiationError:
				return `There was an error instantiating your player entity. Please rejoin the game.`;
			case PlayerKickReason.PlayerProfileUndefined:
				return `Your player profile is undefined. Please rejoin the game.`;
			case PlayerKickReason.PlayerProfileReleased:
				return `Your player profile has been released. Please rejoin the game.`;
			case PlayerKickReason.PlayerMigrationFailed:
				return `There was an error migrating your player data. Please rejoin the game.`;
			case PlayerKickReason.PlayerFullServer:
				return `The server is full. Please try again later.`;
			default:
				return `Error code: ${code}`;
		}
	}

	/**
	 * Removes a player from the server due to a bug.
	 *
	 * @param player The player to remove.
	 * @param code The reason the player was removed.
	 */
	public removeForBug(player: Player, code: PlayerKickReason): void {
		this.logger.Warn(`Removing {@Player} due to bug: ${this.toMessage(code)}`);

		player.Kick(this.toMessage(code));
	}
}
