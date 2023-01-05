export interface ILotModel extends Folder {
	Buttons: Folder;
	Essentials: Folder & {
		Claim: BasePart & {
			Claimed: SurfaceGui & {
				IconBox: Frame & {
					PlayerIcon: ImageLabel;
				};
				TextBox: Frame & {
					TextLabel: TextLabel;
					Username: TextLabel;
				};
			};
			Unclaimed: SurfaceGui & {
				Label1: TextLabel;
				Label2: TextLabel;
			};
		};
	};
	Objects: Folder;
	Spawn: SpawnLocation;
}

export interface ILotAttributes {
	OwnerId?: number;
}

export const enum LotErrors {
	LotOwned = 1,
	PlayerAlreadyHasLot = 2,
	NoLots = 3,
	InvalidLot = 4,
	ClearOwnership = 5,
}

export type LotName = string;
