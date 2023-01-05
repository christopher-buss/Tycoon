import { Networking } from "@flamework/networking";
import { INotificationEntry } from "server/meta/notification-data";
import { PathNumber } from "types/interfaces/droppers";
import { NetPlayerData } from "types/interfaces/network-types";

import { IPlayerData } from "./meta/default-player-data";

export type DropperInfo = Vector2int16; // Path Type, Part Type

interface ServerEvents {
	/** Called by the client to update their settings. */
	updateSettings(newSettings: Partial<IPlayerData["settings"]>): void;

	/** Called by the client to activate an effect. */
	modifyEffect(activate: boolean, effectName: string): void;

	/** Called by the client to state that they've joined the group. */
	joinedGroup(): void;
}

interface ClientEvents {
	/** Fired by the server when the players data changes. */
	playerDataChanged(newPlayerData: Partial<IPlayerData>): void;

	/** Fired by the server when a player is assigned to a lot. */
	playerAssignedToLot(lotId: string): void;

	/** Fired by the server when a dropper should spawn a new item. */
	dropperSpawned(dropperInfo: DropperInfo): void;

	/** Fired by the server when a notification should be displayed on the client. */
	sendNotification(notificationData: INotificationEntry): void;

	/** Fired by the server when a player is in range of a tycoon and doesn't have it's data. */
	playerInRangeOfLot(lotName: string, data: Array<Vector3int16>): void;

	/**Fired by the server when a player is no longer in range of a tycoon */
	playerOutOfRangeOfLot(): void;

	/** Fired by the server when a player buys an object */
	playerBoughtObject(lotName: string, pathNumber: PathNumber, objectName: string): void;

	/** Fired by the server when a player is teleported by a teleport */
	playerTeleported(orientation: Vector3): void;
}

interface ServerFunctions {
	/** Called by the client to request their game data. */
	requestPlayerData(): NetPlayerData;
}

interface ClientFunctions {}

export const GlobalEvents = Networking.createEvent<ServerEvents, ClientEvents>();
export const GlobalFunctions = Networking.createFunction<ServerFunctions, ClientFunctions>();
