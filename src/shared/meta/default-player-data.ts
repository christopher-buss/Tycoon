import { Profile } from "@rbxts/profileservice/globals";

const DefaultPlayerData = {
	cash: 1000,
	inGroup: false,
	rebirths: 0,
	moneySpent: 0,

	purchased: [] as number[], // uses the part-identifiers rather than strings.

	obbyLastCompleted: os.clock(),

	gamePasses: {
		// tools
		cloudGamepass: false,
		speedCoilGamepass: false,

		doubleMoneyGamepass: true,

		sparkleEffectGamepass: false,
		fireEffectGamepass: false,
	},

	settings: {
		background: true,
		effects: true,
		music: true,
	},

	effectsActivated: {
		sparkle: false,
		fire: false,
	},

	acquiredTools: [] as string[], // tools that the player has acquired through the game.
};

export default DefaultPlayerData;

export type PlayerKey = keyof typeof DefaultPlayerData;
export type GamepassPlayerKey = keyof typeof DefaultPlayerData.gamePasses;
export type SettingsPlayerKey = keyof typeof DefaultPlayerData.settings;
export type EffectsActivatedPlayerKey = keyof typeof DefaultPlayerData.effectsActivated;

export type IPlayerData = typeof DefaultPlayerData;
export type PlayerDataProfile = Profile<IPlayerData>;
