export interface ILotModel extends Model {
	Primary: BasePart;
	Spawn: SpawnLocation;
}

export interface ILotAttributes {
	ComponentId?: string;
	Owner: number;
}
