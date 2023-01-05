import { Dependency, Flamework, Modding } from "@flamework/core";
import Log, { Logger } from "@rbxts/log";
import { ZirconConfigurationBuilder, ZirconDefaultGroup, ZirconFunctionBuilder, ZirconServer } from "@rbxts/zircon";
import { setupLogger } from "shared/functions/setup-logger";
import { GAME_NAME } from "shared/shared-constants";

import { LeaderstatsService } from "./services/leaderstats-service";
import { PlayerService } from "./services/player/player-service";
import { MoneyService } from "./services/stores/money-service";

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

const SetMoney = new ZirconFunctionBuilder("set_money").AddArgument("number").Bind((context, cash) => {
	const playerEntity_opt = Dependency<PlayerService>().getEntity(context.GetExecutor());
	if (playerEntity_opt.isSome()) {
		Dependency<MoneyService>().updatePlayerMoney(true, playerEntity_opt.unwrap(), cash);
	}
});

const Rebirths = new ZirconFunctionBuilder("rebirth")
	.AddArgument("boolean")
	.AddDescription("Force rebirth?")
	.AddArgument("number")
	.AddDescription("Amount of rebirths to add")
	.Bind((context, force, amount) => {
		const playerEntity_opt = Dependency<PlayerService>().getEntity(context.GetExecutor());
		if (playerEntity_opt.isSome()) {
			const playerEntity = playerEntity_opt.unwrap();
			if (force) {
				playerEntity.updateData((data) => {
					data.rebirths += amount;
					return data;
				});
				return;
			}

			playerEntity.updateData((data) => {
				data.rebirths += amount;
				data.purchased = [];
				return data;
			});

			Dependency<LeaderstatsService>()
				.getStatObject(playerEntity.player, "Rebirths")
				.match(
					(stat) => {
						stat.Value = playerEntity.data.rebirths;
					},
					() => {},
				);
		}
	});

ZirconServer.Registry.Init(
	new ZirconConfigurationBuilder()
		// Creates a 'creator' group
		.CreateDefaultCreatorGroup()
		// Creates a 'user' group
		.CreateDefaultUserGroup()
		// Adds an executable function called 'print_message', allowed to be executed by `User` (everyone)
		.AddFunction(SetMoney, [ZirconDefaultGroup.User])
		.AddFunction(Rebirths, [ZirconDefaultGroup.User])
		// Builds the configuration for Zircon
		.Build(),
);

Flamework.ignite();
