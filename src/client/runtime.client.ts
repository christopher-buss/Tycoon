import { Flamework, Modding } from "@flamework/core";
import Log, { Logger, LogLevel } from "@rbxts/log";
import { RunService } from "@rbxts/services";

Log.SetLogger(
	Logger.configure()
		.SetMinLogLevel(RunService.IsStudio() ? LogLevel.Verbose : LogLevel.Information)
		.EnrichWithProperty("Version", PKG_VERSION)
		.WriteTo(Log.RobloxOutput({ TagFormat: "full" }))
		.Create(),
);

Modding.registerDependency<Logger>((ctor) => {
	return Log.ForContext(ctor);
});

Flamework.addPaths("src/client/components");
Flamework.addPaths("src/client/controllers");
Flamework.addPaths("src/shared/components");

Flamework.ignite();
