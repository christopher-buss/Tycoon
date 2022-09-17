import PlayerEntity from "server/modules/classes/player-entity";

const Products = {
	/** 5k Cash Purchase */
	[1294743751]: (playerEntity: PlayerEntity) => {
		playerEntity.updateData((data) => {
			data.cash += 5000;
			return data;
		});
	},

	/** 25k Cash Purchase */
	[1294743752]: (playerEntity: PlayerEntity) => {
		playerEntity.updateData((data) => {
			data.cash += 25000;
			return data;
		});
	},

	/** 50k Cash Purchase */
	[1296359145]: (playerEntity: PlayerEntity) => {
		playerEntity.updateData((data) => {
			data.cash += 50000;
			return data;
		});
	},
};

export default Products;
