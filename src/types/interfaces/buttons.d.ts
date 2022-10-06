export interface IPurchaseButtonAttributes {
	ComponentId?: string;
	DisplayName?: string;
	// LinkedComponentId: string;
	Price: number;
}

export interface IPurchaseButtonModel extends Model {
	Head: BasePart & MeshPart;
}
