import { Networking } from "@flamework/networking";
import { INotificationEntry } from "server/meta/notification-data";
import { NetPlayerData } from "types/interfaces/network-types";
import { IPlayerData } from "./meta/default-player-data";

export type DropperInfo = Vector3int16;

interface ServerEvents {
	/** Called by the client to update their settings. */
	updateSettings(newSettings: Partial<IPlayerData["settings"]>): void;

	/** Called by the client to activate an effect. */
	modifyEffect(activate: boolean, effectName: string): void;
}

interface ClientEvents {
	/** Fired by the server when the players data changes. */
	playerDataChanged(newPlayerData: Partial<IPlayerData>): void;

	/** Fired by the server when a player is assigned to a lot. */
	playerAssignedToLot(lotId: string): void;

	/** Fired by the server when a dropper should spawn a new item. */
	dropperSpawned(dropperType: number, dropperInfo: DropperInfo): void;

	/** Fired by the server when a notification should be displayed on the client. */
	sendNotification(notificationData: INotificationEntry): void;
}

interface ServerFunctions {
	/** Called by the client to request their game data. */
	requestPlayerData(): NetPlayerData;
}

interface ClientFunctions {}

export const GlobalEvents = Networking.createEvent<ServerEvents, ClientEvents>();
export const GlobalFunctions = Networking.createFunction<ServerFunctions, ClientFunctions>();
