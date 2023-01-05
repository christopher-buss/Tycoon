export type DropperKey = {
	Price: number;
	Value: number;
	DropTime: number;
};

export type UpgraderKey = string & {
	Price: number;
	Additive: number;
	Multiplier: number;
};

export type ItemKey = {
	Price: 0;
	Value: 0;
};

export type PartInfoKey = DropperKey | ItemKey;

export type PartInfoType = keyof typeof PartInfo;
export type PartInfoValue = typeof PartInfo["Perfume"];

export type PartInfoUpgraderKey = keyof typeof PartInfo["Basic Upgrader1"];
export type PartInfoUpgrader = typeof PartInfo["Basic Upgrader1"];

export const PartInfo = {
	//**************************************************************************
	//** Droppers
	//**************************************************************************
	["Perfume"]: {
		Price: 0,
		Value: 1,
		DropTime: 2,
	} as DropperKey,

	["Lipstick"]: {
		Price: 0,
		Value: 0,
		DropTime: 2,
	} as DropperKey,

	["Beauty Set"]: {
		Price: 0,
		Value: 1,
		DropTime: 2,
	} as DropperKey,

	["Eyeliner"]: {
		Price: 0,
		Value: 0,
		DropTime: 2,
	} as DropperKey,

	["Brush"]: {
		Price: 0,
		Value: 0,
		DropTime: 2,
	} as DropperKey,

	["Premium Perfume"]: {
		Price: 0,
		Value: 0,
		DropTime: 2,
	} as DropperKey,

	["Shampoo"]: {
		Price: 0,
		Value: 0,
		DropTime: 3,
	} as DropperKey,

	["Comb"]: {
		Price: 0,
		Value: 0,
		DropTime: 3,
	} as DropperKey,

	["Conditioner"]: {
		Price: 0,
		Value: 0,
		DropTime: 3,
	} as DropperKey,

	["Moisturizer"]: {
		Price: 0,
		Value: 0,
		DropTime: 3,
	} as DropperKey,

	["Mirror"]: {
		Price: 0,
		Value: 0,
		DropTime: 3,
	} as DropperKey,

	["Deluxe Hairspray"]: {
		Price: 0,
		Value: 0,
		DropTime: 3,
	} as DropperKey,

	["Pet Toy"]: {
		Price: 0,
		Value: 0,
		DropTime: 3,
	} as DropperKey,

	["Pet Food"]: {
		Price: 0,
		Value: 0,
		DropTime: 3,
	} as DropperKey,

	["Pet Comb"]: {
		Price: 0,
		Value: 0,
		DropTime: 3,
	} as DropperKey,

	["Pet Treats"]: {
		Price: 0,
		Value: 0,
		DropTime: 3,
	} as DropperKey,

	["Pet Soap"]: {
		Price: 0,
		Value: 0,
		DropTime: 3,
	} as DropperKey,

	["Pet House"]: {
		Price: 0,
		Value: 0,
		DropTime: 3,
	} as DropperKey,

	["Water"]: {
		Price: 0,
		Value: 0,
		DropTime: 3,
	} as DropperKey,

	//**************************************************************************
	//** Upgraders
	//**************************************************************************
	["Basic Upgrader1"]: {
		Price: 10,
		Additive: 0,
		Multiplier: 1,
	} as UpgraderKey,

	["Basic Upgrader2"]: {
		Price: 10,
		Additive: 0,
		Multiplier: 1,
	} as UpgraderKey,

	["Basic Upgrader3"]: {
		Price: 10,
		Additive: 0,
		Multiplier: 1,
	} as UpgraderKey,

	["Deluxe Upgrader1"]: {
		Price: 10,
		Additive: 0,
		Multiplier: 1,
	} as UpgraderKey,

	["Deluxe Upgrader2"]: {
		Price: 10,
		Additive: 0,
		Multiplier: 1,
	} as UpgraderKey,

	["Deluxe Upgrader3"]: {
		Price: 10,
		Additive: 0,
		Multiplier: 1,
	} as UpgraderKey,

	["Rainbow Upgrader1"]: {
		Price: 10,
		Additive: 0,
		Multiplier: 1,
	} as UpgraderKey,

	["Rainbow Upgrader2"]: {
		Price: 10,
		Additive: 0,
		Multiplier: 1,
	} as UpgraderKey,

	["Rainbow Upgrader3"]: {
		Price: 10,
		Additive: 0,
		Multiplier: 1,
	} as UpgraderKey,

	//**************************************************************************
	//** Items
	//**************************************************************************
	["Beauty Desk1"]: {
		Price: 0,
		Value: 0,
	} as ItemKey,

	["Beauty Desk2"]: {
		Price: 0,
		Value: 0,
	} as ItemKey,

	["Beauty Desk3"]: {
		Price: 0,
		Value: 0,
	} as ItemKey,

	["Beauty Desk4"]: {
		Price: 0,
		Value: 0,
	} as ItemKey,

	["Salon"]: {
		Price: 0,
		Value: 0,
	} as ItemKey,

	["Receptionist"]: {
		Price: 0,
		Value: 0,
	} as ItemKey,

	["Reception Desk"]: {
		Price: 0,
		Value: 0,
	} as ItemKey,

	["Pet Bath2"]: {
		Price: 0,
		Value: 0,
	} as ItemKey,

	["Pet Bath3"]: {
		Price: 0,
		Value: 0,
	} as ItemKey,

	["Pet Bath1"]: {
		Price: 0,
		Value: 0,
	} as ItemKey,

	["Pet Bath4"]: {
		Price: 0,
		Value: 0,
	} as ItemKey,

	["Seating2"]: {
		Price: 0,
		Value: 0,
	} as ItemKey,

	["Conveyor Belt2"]: {
		Price: 0,
		Value: 0,
	} as ItemKey,

	["Pet Salon"]: {
		Price: 0,
		Value: 0,
	} as ItemKey,

	["Conveyor Belt1"]: {
		Price: 0,
		Value: 0,
	} as ItemKey,

	["Seating3"]: {
		Price: 0,
		Value: 0,
	} as ItemKey,

	["Roof"]: {
		Price: 0,
		Value: 0,
	} as ItemKey,

	["Seating4"]: {
		Price: 0,
		Value: 0,
	} as ItemKey,

	["Customer3"]: {
		Price: 0,
		Value: 0,
	} as ItemKey,

	["Cleansing Sink1"]: {
		Price: 0,
		Value: 0,
	} as ItemKey,

	["Customer4"]: {
		Price: 0,
		Value: 0,
	} as ItemKey,

	["Customer6"]: {
		Price: 0,
		Value: 0,
	} as ItemKey,

	["Customer8"]: {
		Price: 0,
		Value: 0,
	} as ItemKey,

	["Cleansing Sink2"]: {
		Price: 0,
		Value: 0,
	} as ItemKey,

	["Cleansing Sink3"]: {
		Price: 0,
		Value: 0,
	} as ItemKey,

	["Cleansing Sink4"]: {
		Price: 0,
		Value: 0,
	} as ItemKey,

	["Customer5"]: {
		Price: 0,
		Value: 0,
	} as ItemKey,

	["Customer2"]: {
		Price: 0,
		Value: 0,
	} as ItemKey,

	["Customer1"]: {
		Price: 0,
		Value: 0,
	} as ItemKey,

	["Customer7"]: {
		Price: 0,
		Value: 0,
	} as ItemKey,

	["Seating6"]: {
		Price: 0,
		Value: 0,
	} as ItemKey,

	["Seating5"]: {
		Price: 0,
		Value: 0,
	} as ItemKey,

	["Seating1"]: {
		Price: 0,
		Value: 0,
	} as ItemKey,

	["Frog"]: {
		Price: 0,
		Value: 0,
	} as ItemKey,

	["Fox"]: {
		Price: 0,
		Value: 0,
	} as ItemKey,

	["Lizard"]: {
		Price: 0,
		Value: 0,
	} as ItemKey,

	["Bunny"]: {
		Price: 0,
		Value: 0,
	} as ItemKey,

	["Cat"]: {
		Price: 0,
		Value: 0,
	} as ItemKey,

	["Dog"]: {
		Price: 0,
		Value: 0,
	} as ItemKey,

	["Water Bowl"]: {
		Price: 0,
		Value: 0,
	} as ItemKey,

	["Conveyor Belt3"]: {
		Price: 0,
		Value: 0,
	} as ItemKey,
};

export const Progress = {
	["Rainbow Upgrader1"]: {
		Path: 0,
		Progress: 11,
		Audio: "1",
	},
};

export type ProgressKey = keyof typeof Progress;
