export interface IPurchaseButtonAttributes {
	Dependency?: string;
	DisplayName?: string;
	GamepassId?: number;
	Price?: number;
	Rebirths?: number;
}

export interface IPurchaseButtonModel extends Model {
	TouchPart: BasePart & MeshPart;
}

export interface IRebirthButtonAttributes {}

export interface IRebirthButtonModel extends Model {
	TouchPart: BasePart;
}
