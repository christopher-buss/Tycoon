import { Flamework, Modding } from "@flamework/core";
import Log, { Logger } from "@rbxts/log";
import { ZirconClient } from "@rbxts/zircon";
import { setupLogger } from "shared/functions/setup-logger";
import { GAME_NAME } from "shared/shared-constants";

setupLogger();
Log.Warn(`${GAME_NAME} client version: ${game.PlaceVersion}`);

Modding.registerDependency<Logger>((ctor) => {
	return Log.ForContext(ctor);
});

Flamework.addPaths("src/client/apps");
Flamework.addPaths("src/client/components");
Flamework.addPaths("src/client/controllers");
Flamework.addPaths("src/shared/components");

ZirconClient.Init({});

Flamework.ignite();
