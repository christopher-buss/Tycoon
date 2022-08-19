import { Networking } from "@flamework/networking";
import { IPlayerData } from "./meta/default-player-data";
import { PlayerDataRequested } from "./util/networking";

interface ServerEvents {}

interface ClientEvents {
	/** Fired by the server when the players data changes */
	playerDataChanged(newPlayerData: Partial<IPlayerData>): void;
}

interface ServerFunctions {
	requestPlayerData(): PlayerDataRequested;
}

interface ClientFunctions {}

export const GlobalEvents = Networking.createEvent<ServerEvents, ClientEvents>();
export const GlobalFunctions = Networking.createFunction<ServerFunctions, ClientFunctions>();
