import { Networking } from "@flamework/networking";
import { NetPlayerData } from "types/interfaces/network-types";
import { IPlayerData } from "./meta/default-player-data";

interface ServerEvents {}

interface ClientEvents {
	/** Fired by the server when the players data changes. */
	playerDataChanged(newPlayerData: Partial<IPlayerData>): void;
}

interface ServerFunctions {
	/** Called by the client to request their game data. */
	requestPlayerData(): NetPlayerData;
}

interface ClientFunctions {}

export const GlobalEvents = Networking.createEvent<ServerEvents, ClientEvents>();
export const GlobalFunctions = Networking.createFunction<ServerFunctions, ClientFunctions>();
