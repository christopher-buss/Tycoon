export interface ILotModel extends Model {
	// Primary: BasePart;
	Buttons: Folder;
	Essentials: Folder & {
		Claim: BasePart & {
			Gui: BillboardGui & {
				PlayerName: TextBox;
				TycoonName: TextBox;
			};
		};
	};
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
