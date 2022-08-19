import { Controller, OnStart } from "@flamework/core";
import Log from "@rbxts/log";
import { Events, Functions } from "client/network";
import { ClientStore } from "client/rodux/rodux";
import { IPlayerData } from "shared/meta/default-player-data";
import { NetResult, PlayerDataRequested } from "shared/util/networking";

/**
 * Controller than handles receiving player data updates from the server. Also
 * requests the players data on load.
 */
@Controller({})
export default class DataController implements OnStart {
	/** @hidden */
	public onStart(): void {
		Events.playerDataChanged.connect((n) => this.onGotNewData(n));

		// Request initial player data from the server
		Functions.requestPlayerData()
			.andThen((serialized: PlayerDataRequested) => {
				const result = NetResult.deserialize(serialized);
				if (result.isErr()) {
					Log.Error("Could not get initial player data from server because:\n{@Reason}", result.unwrapErr());
				}

				this.onGotNewData(result.unwrap());
			})
			.catch(error);
	}

	private onGotNewData(newPlayerData: Partial<IPlayerData>) {
		Log.Verbose("Got new player data from server {@Data}", newPlayerData);
		ClientStore.dispatch({ type: "SetPlayerData", newPlayerData });
	}
}
