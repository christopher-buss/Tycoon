import { Dependency } from "@flamework/core";
import PlayerEntity from "server/modules/classes/player-entity";
import { MtxService } from "server/services/mtx-service";
import { MoneyService } from "server/services/stores/money-service";
import { DeveloperProducts } from "shared/meta/gamepasses";

const Products = {
	[DeveloperProducts["1000Cash"]]: (playerEntity: PlayerEntity): void => {
		Dependency<MoneyService>().updatePlayerMoney(true, playerEntity, 1000);
	},

	[DeveloperProducts["5000Cash"]]: (playerEntity: PlayerEntity): void => {
		Dependency<MoneyService>().updatePlayerMoney(true, playerEntity, 5000);
	},

	[DeveloperProducts["10000Cash"]]: (playerEntity: PlayerEntity): void => {
		Dependency<MoneyService>().updatePlayerMoney(true, playerEntity, 10000);
	},

	[DeveloperProducts.InstantRebirth]: (playerEntity: PlayerEntity): void => {
		Dependency<MtxService>().instantRebirthProduct(playerEntity);
	},
};

export default Products;
