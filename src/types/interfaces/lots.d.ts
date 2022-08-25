export interface ILotModel extends Model {
	Primary: BasePart;
	Spawn: SpawnLocation;
}

export interface ILotAttributes {
	ComponentId?: string;
	OwnerId?: number;
}

export const enum LotErrors {
	LotOwned = 1,
	PlayerAlreadyHasLot = 2,
	NoLots = 3,
	InvalidLot = 4,
	ClearOwnership = 5,
}
