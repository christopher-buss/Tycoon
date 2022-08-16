import { Profile } from "@rbxts/profileservice/globals";

const DefaultPlayerData = {
	cash: 0,
	inGroup: false,
	rebirths: 0,
	moneySpent: 0,
	// purchased: [],
	obbyLastCompleted: os.clock(),

	gamePasses: {
		// tools
		cloud: false,
		speedCoil: false,

		multiplier: 1,
	},

	settings: {
		background: true,
		effects: true,
		music: true,
	},
};

export default DefaultPlayerData;

export type IPlayerData = typeof DefaultPlayerData;
export type PlayerDataProfile = Profile<IPlayerData>;
