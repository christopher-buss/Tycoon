import { Janitor } from "@rbxts/janitor";
import Log from "@rbxts/log";
import { Events } from "server/network";
import { IPlayerData, PlayerDataProfile } from "shared/meta/default-player-data";
import { Immutable } from "types/util/readonly";

/**
 * A Player Entity class that is attached to all players in the game.
 *
 * This is used to manage player data, and to attach events that should occur
 * once a player has left the game.
 */
export default class PlayerEntity {
	/** Username of the player. */
	public readonly name: string;

	/**
	 * Readonly version of the players data. Updates should be done through the
	 * `updateData` method.
	 */
	public data: Immutable<IPlayerData>;

	/**
	 * This class should handle *everything* to do with a specific player. This
	 * includes things like their data and state.
	 */
	constructor(
		/** Reference to the actual Player instance. */
		public readonly player: Player,
		public readonly janitor: Janitor,
		public readonly playerRemoving: Janitor,
		/** @hidden */
		public readonly dataProfile: PlayerDataProfile,
	) {
		this.name = player.Name;
		this.data = dataProfile.Data;
	}

	/**
	 * Method used to update the players data and alert the client of data changes.
	 * @param callback Callback that gets passed the players existing data and returns
	 * their new data.
	 */
	public updateData(callback: (existingData: IPlayerData) => IPlayerData): void {
		const currentData = this.dataProfile.Data;
		const newData = callback(currentData);
		this.dataProfile.Data = newData;
		this.data = newData;

		// TODO: Only send changed keys
		Events.playerDataChanged(this.player, newData);
		Log.Verbose("Player data for {Player} updated to {@Data}", this.player, newData);
	}
}
