declare const enum PlayerKickReason {
	// Player entity related
	PlayerEntityInstantiationError = 1,

	// Player data related
	PlayerProfileUndefined = 2,
	PlayerProfileReleased = 3,
	PlayerMigrationFailed = 4,

	// Player game related
	PlayerFullServer = 5,
}

export default PlayerKickReason;
