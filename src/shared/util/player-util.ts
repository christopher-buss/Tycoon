import { Option } from "@rbxts/rust-classes";
import { Players } from "@rbxts/services";

export namespace PlayerUtil {
	/**
	 * Gets the player from a given part on the character.
	 *
	 * @param characterPart the part on the character to get the player from.
	 * @returns The player if it exists.
	 */
	export function getPlayerFromDescendant(characterPart: BasePart): Option<Player> {
		const character = characterPart.Parent;
		if (!character || !character.IsA("Model")) {
			return Option.none<Player>();
		}

		// // This is a workaround for Players.GetPlayerFromCharacter() returning nil
		// // due to atomic streaming mode.
		// for (const player of Players.GetChildren()) {
		// 	if (player.IsA("Player")) {
		// 		if (player.Name === character.Name) {
		// 			return Option.some<Player>(player);
		// 		}
		// 	}
		// }

		// return Option.none<Player>();

		return Option.wrap<Player>(Players.GetPlayerFromCharacter(character));
	}
}
