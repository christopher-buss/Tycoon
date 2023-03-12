import { Profile } from "@rbxts/profileservice/globals";

const DefaultPlayerData = {
	cash: 0,
	inGroup: false,
	rebirths: 0,
	moneySpent: 0,
	frenzyTimeLeft: 0,

	purchased: [] as Array<number>, // uses the part-identifiers rather than strings.

	obbyLastCompleted: os.time(),

	gamePasses: {
		// tools
		// cloudGamepass: false,
		// speedCoilGamepass: false,

		doubleMoneyGamepass: false,
		vipGamepass: false,

		// sparkleEffectGamepass: false,
		// fireEffectGamepass: false,
	},

	settings: {
		background: true,
		displayNextItem: true,
		effects: true,
		music: true,
	},

	effectsActivated: {
		sparkle: false,
		fire: false,
	},

	acquiredTools: [] as Array<string>, // tools that the player has acquired through the game.

	/** Likely to be migrated by default when building new experiences. */
	migrated: true, // whether or not the player has been migrated to profile service.
};

export default DefaultPlayerData;

export type PlayerKey = keyof typeof DefaultPlayerData;
export type GamepassPlayerKey = keyof typeof DefaultPlayerData.gamePasses;
export type SettingsPlayerKey = keyof typeof DefaultPlayerData.settings;
export type EffectsActivatedPlayerKey = keyof typeof DefaultPlayerData.effectsActivated;

export type IPlayerData = typeof DefaultPlayerData;
export type PlayerDataProfile = Profile<IPlayerData>;
