export interface Attributes {
	ComponentId?: string;
	DisplayName?: string;
	// LinkedComponentId: string;
	Price: number;
}

export interface IPurchaseButtonModel extends Model {
	Primary: BasePart & MeshPart;
}
