export interface Attributes {
	DisplayName?: string;
	LinkedComponentId: string;
	Price: number;
}

export interface IPurchaseButtonModel extends Model {
	Primary: BasePart;
}
