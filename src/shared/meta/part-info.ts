export type DropperKey = {
	Price: number;
	Value: number;
	DropTime: number;
};

export type UpgraderKey = string & {
	Price: number;
	Additive: number;
	Multiplier: number;
	Gamepass?: boolean;
};

export type ItemKey = {
	Price: number;
	Value: number;
};

export type PartInfoKey = DropperKey | ItemKey;

export type PartInfoType = keyof typeof PartInfo;
export type PartInfoValue = (typeof PartInfo)["Perfume"];

export type PartInfoUpgraderKey = keyof (typeof PartInfo)["Basic Upgrader1"];
export type PartInfoUpgrader = (typeof PartInfo)["Basic Upgrader1"];

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
		Price: 15,
		Value: 1,
		DropTime: 2,
	} as DropperKey,

	["Beauty Set"]: {
		Price: 100,
		Value: 2,
		DropTime: 2,
	} as DropperKey,

	["Eyeliner"]: {
		Price: 300,
		Value: 3,
		DropTime: 2,
	} as DropperKey,

	["Brush"]: {
		Price: 1000,
		Value: 4,
		DropTime: 2,
	} as DropperKey,

	["Premium Perfume"]: {
		Price: 1500,
		Value: 5,
		DropTime: 2,
	} as DropperKey,

	["Shampoo"]: {
		Price: 2000,
		Value: 5,
		DropTime: 2,
	} as DropperKey,

	["Comb"]: {
		Price: 2500,
		Value: 6,
		DropTime: 2,
	} as DropperKey,

	["Conditioner"]: {
		Price: 3500,
		Value: 6,
		DropTime: 2,
	} as DropperKey,

	["Moisturizer"]: {
		Price: 3750,
		Value: 7,
		DropTime: 2,
	} as DropperKey,

	["Mirror"]: {
		Price: 5000,
		Value: 8,
		DropTime: 2,
	} as DropperKey,

	["Deluxe Hairspray"]: {
		Price: 6000,
		Value: 10,
		DropTime: 2,
	} as DropperKey,

	["Pet Toy"]: {
		Price: 15000,
		Value: 0,
		DropTime: 2,
	} as DropperKey,

	["Pet Food"]: {
		Price: 8500,
		Value: 0,
		DropTime: 2,
	} as DropperKey,

	["Pet Comb"]: {
		Price: 10000,
		Value: 12,
		DropTime: 2,
	} as DropperKey,

	["Pet Treats"]: {
		Price: 11500,
		Value: 13,
		DropTime: 2,
	} as DropperKey,

	["Pet Soap"]: {
		Price: 13500,
		Value: 0,
		DropTime: 2,
	} as DropperKey,

	["Pet House"]: {
		Price: 15000,
		Value: 0,
		DropTime: 2,
	} as DropperKey,

	["Water"]: {
		Price: 7500,
		Value: 0,
		DropTime: 2,
	} as DropperKey,

	//**************************************************************************
	//** Upgraders
	//**************************************************************************
	["Basic Upgrader1"]: {
		Price: 150,
		Additive: 2,
		Multiplier: 1,
	} as UpgraderKey,

	["Basic Upgrader2"]: {
		Price: 3750,
		Additive: 4,
		Multiplier: 1,
	} as UpgraderKey,

	["Basic Upgrader3"]: {
		Price: 9000,
		Additive: 5,
		Multiplier: 1,
	} as UpgraderKey,

	["Deluxe Upgrader1"]: {
		Price: 1500,
		Additive: 7,
		Multiplier: 1,
	} as UpgraderKey,

	["Deluxe Upgrader2"]: {
		Price: 5750,
		Additive: 0,
		Multiplier: 1,
	} as UpgraderKey,

	["Deluxe Upgrader3"]: {
		Price: 14500,
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
		Price: 5,
		Value: 0,
	} as ItemKey,

	["Beauty Desk2"]: {
		Price: 45,
		Value: 0,
	} as ItemKey,

	["Beauty Desk3"]: {
		Price: 500,
		Value: 0,
	} as ItemKey,

	["Beauty Desk4"]: {
		Price: 1250,
		Value: 0,
	} as ItemKey,

	["Salon"]: {
		Price: 0,
		Value: 0,
	} as ItemKey,

	["Receptionist"]: {
		Price: 1000,
		Value: 5,
	} as ItemKey,

	["Reception Desk"]: {
		Price: 200,
		Value: 1,
	} as ItemKey,

	["Pet Bath2"]: {
		Price: 10500,
		Value: 5,
	} as ItemKey,

	["Pet Bath3"]: {
		Price: 9500,
		Value: 5,
	} as ItemKey,

	["Pet Bath1"]: {
		Price: 12500,
		Value: 5,
	} as ItemKey,

	["Pet Bath4"]: {
		Price: 8000,
		Value: 5,
	} as ItemKey,

	["Seating2"]: {
		Price: 100,
		Value: 0.5,
	} as ItemKey,

	["Conveyor Belt2"]: {
		Price: 2000,
		Value: 0,
	} as ItemKey,

	["Pet Salon"]: {
		Price: 10000,
		Value: 0,
	} as ItemKey,

	["Conveyor Belt1"]: {
		Price: 0,
		Value: 0,
	} as ItemKey,

	["Seating3"]: {
		Price: 2500,
		Value: 3,
	} as ItemKey,

	["Roof"]: {
		Price: 600,
		Value: 2,
	} as ItemKey,

	["Seating4"]: {
		Price: 30,
		Value: 0.5,
	} as ItemKey,

	["Customer3"]: {
		Price: 600,
		Value: 4,
	} as ItemKey,

	["Cleansing Sink1"]: {
		Price: 2250,
		Value: 0,
	} as ItemKey,

	["Customer4"]: {
		Price: 1350,
		Value: 5,
	} as ItemKey,

	["Customer6"]: {
		Price: 3000,
		Value: 10,
	} as ItemKey,

	["Customer8"]: {
		Price: 5250,
		Value: 10,
	} as ItemKey,

	["Cleansing Sink2"]: {
		Price: 2750,
		Value: 0,
	} as ItemKey,

	["Cleansing Sink3"]: {
		Price: 4250,
		Value: 0,
	} as ItemKey,

	["Cleansing Sink4"]: {
		Price: 5000,
		Value: 0,
	} as ItemKey,

	["Customer5"]: {
		Price: 2375,
		Value: 10,
	} as ItemKey,

	["Customer2"]: {
		Price: 50,
		Value: 2,
	} as ItemKey,

	["Customer1"]: {
		Price: 5,
		Value: 1,
	} as ItemKey,

	["Customer7"]: {
		Price: 4750,
		Value: 10,
	} as ItemKey,

	["Seating6"]: {
		Price: 9500,
		Value: 5,
	} as ItemKey,

	["Seating5"]: {
		Price: 10000,
		Value: 5,
	} as ItemKey,

	["Seating1"]: {
		Price: 2750,
		Value: 5,
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
		Price: 20000,
		Value: 0,
	} as ItemKey,

	["Water Bowl"]: {
		Price: 0,
		Value: 0,
	} as ItemKey,

	["Conveyor Belt3"]: {
		Price: 5000,
		Value: 0,
	} as ItemKey,

	["Magic Unicorn"]: {
		Price: 0,
		Value: 0,
	} as ItemKey,
};

export const Progress = {
	// Conveyor 1
	["Basic Upgrader1"]: {
		Path: 0,
		Progress: 15,
		Audio: "0",
	},

	["Rainbow Upgrader1"]: {
		Path: 0,
		Progress: 44,
		Audio: "0",
	},

	["Deluxe Upgrader1"]: {
		Path: 0,
		Progress: 73,
		Audio: "0",
	},

	// Conveyor 2
	["Basic Upgrader2"]: {
		Path: 1,
		Progress: 15,
		Audio: "0",
	},

	["Rainbow Upgrader2"]: {
		Path: 1,
		Progress: 44,
		Audio: "0",
	},

	["Deluxe Upgrader2"]: {
		Path: 1,
		Progress: 73,
		Audio: "0",
	},

	// Conveyor 3
	["Basic Upgrader3"]: {
		Path: 2,
		Progress: 56,
		Audio: "0",
	},

	["Rainbow Upgrader3"]: {
		Path: 2,
		Progress: 103,
		Audio: "0",
	},

	["Deluxe Upgrader3"]: {
		Path: 2,
		Progress: 31,
		Audio: "0",
	},
};

export type ProgressKey = keyof typeof Progress;
