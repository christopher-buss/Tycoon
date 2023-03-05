import { Flamework, Modding } from "@flamework/core";
import Log, { Logger } from "@rbxts/log";
import { setupLogger } from "shared/functions/setup-logger";
import { GAME_NAME } from "shared/shared-constants";

// RunService.IsStudio() ? LogLevel.Verbose : LogLevel.Information

// GameAnalytics.initialize({
// 	gameKey: "fff28ab62db8cea9c1190d4d251c8206",
// 	secretKey: "e69c170df0ba48cd85e15c91e6167d6342e237d5",
// });

// GameAnalytics.configureAvailableResourceCurrencies(["Cash"]);
// GameAnalytics.configureBuild("0.0.1");

// if (RunService.IsStudio()) {
// 	GameAnalytics.setEnabledVerboseLog(true);
// }

setupLogger();
Log.Warn(`${GAME_NAME} is starting up!`);

Modding.registerDependency<Logger>((ctor) => {
	return Log.ForContext(ctor);
});

Flamework.addPaths("src/server/components");
Flamework.addPaths("src/server/services");
Flamework.addPaths("src/shared/components");

Flamework.ignite();
