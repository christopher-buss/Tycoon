import { Dependency } from "@flamework/core";
import PlayerEntity from "server/modules/classes/player-entity";
import { MoneyService } from "server/services/stores/money-service";

const Products = {
	/** 5k Cash Purchase */
	[1294743751]: (playerEntity: PlayerEntity) => {
		Dependency<MoneyService>().givePlayerMoney(playerEntity.player, 5000);
	},

	/** 25k Cash Purchase */
	[1294743752]: (playerEntity: PlayerEntity) => {
		Dependency<MoneyService>().givePlayerMoney(playerEntity.player, 25000);
	},

	/** 50k Cash Purchase */
	[1296359145]: (playerEntity: PlayerEntity) => {
		Dependency<MoneyService>().givePlayerMoney(playerEntity.player, 50000);
	},
};

export default Products;
