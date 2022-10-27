export interface IPurchaseButtonAttributes {
	ComponentId?: string;
	Dependency?: string;
	DisplayName?: string;
	GamepassId?: number;
	Price?: number;
}

export interface IPurchaseButtonModel extends Model {
	Head: BasePart & MeshPart;
}

export interface IRebirthButtonAttributes {}

// export interface IRebirthButtonModel extends Model {
// 	TouchPart: BasePart;
// 	Board: BasePart;
// }

export interface IRebirthButtonModel extends BasePart {
	TouchPart: BasePart;
}
