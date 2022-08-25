import { Service } from "@flamework/core";
import { GAME_NAME } from "shared/shared-constants";
import KickCode from "types/enum/kick-reason";

/**
 * A service that handles removing players from the server.
 */
@Service({})
export default class PlayerRemovalService {
	/**
	 * Removes a player from the server due to an unforeseen bug.
	 *
	 * @param player The player to remove.
	 * @param code The reason the player was removed.
	 */
	public removeForBug(player: Player, code: KickCode): void {
		player.Kick(
			"\n\nYou were kicked from the game due to a bug. This has been logged " +
				"internally but you should also report it with more information and " +
				"reproduction steps in our communication server.\n\n" +
				`(${GAME_NAME} Error Code: ${code})`,
		);
	}
}
