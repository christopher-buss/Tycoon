const Parts = {
	["Robux Dropper"]: {
		Price: -1,
		Value: 3,
		DropTime: 5,
	},

	["Dumpling"]: {
		Price: 0,
		Value: 8,
		DropTime: 5,
	},

	["Peppered Dumpling"]: {
		Price: 25,
		Value: 8,
		DropTime: 6,
	},

	["Mint Dumpling"]: {
		Price: 0,
		Value: 8,
		DropTime: 7,
	},

	["Cool Mint Dumpling"]: {
		Price: 0,
		Value: 8,
		DropTime: 8,
	},

	["Sugar Dumpling"]: {
		Price: 0,
		Value: 9,
		DropTime: 9,
	},

	["Sugar Cream Dumpling"]: {
		Price: 0,
		Value: 10,
		DropTime: 10,
	},

	["Pineapple Dumpling"]: {
		Price: 0,
		Value: 11,
		DropTime: 11,
	},

	["Cinnamon Dumpling"]: {
		Price: 0,
		Value: 12,
		DropTime: 13,
	},

	["Cream Dumpling"]: {
		Price: 0,
		Value: 13,
		DropTime: 14,
	},

	["Velvet Dumpling"]: {
		Price: 0,
		Value: 14,
		DropTime: 15,
	},

	["Plum Dumpling"]: {
		Price: 0,
		Value: 15,
		DropTime: 16,
	},

	["Chocolate Dumpling"]: {
		Price: 0,
		Value: 15,
		DropTime: 17,
	},

	["Jelly Dumpling"]: {
		Price: 0,
		Value: 15,
		DropTime: 18,
	},

	["Vegetable Dumpling"]: {
		Price: 0,
		Value: 15,
		DropTime: 19,
	},

	["Sugar Vegetable Dumpling"]: {
		Price: 0,
		Value: 15,
		DropTime: 20,
	},

	["Chocolate Spread Dumpling"]: {
		Price: 0,
		Value: 15,
		DropTime: 21,
	},

	["Layered Velvet Dumpling"]: {
		Price: 0,
		Value: 15,
		DropTime: 22,
	},

	["Strawberry Dumpling"]: {
		Price: 0,
		Value: 15,
		DropTime: 23,
	},

	["Color Creamed Dumpling"]: {
		Price: 0,
		Value: 15,
		DropTime: 24,
	},

	["Rose Scent Dumpling"]: {
		Price: 0,
		Value: 15,
		DropTime: 25,
	},

	["Chili Pepper Dumpling"]: {
		Price: 0,
		Value: 15,
		DropTime: 26,
	},

	["King Sugar Dumpling"]: {
		Price: 0,
		Value: 15,
		DropTime: 27,
	},

	["Emperor Dumpling"]: {
		Price: 0,
		Value: 15,
		DropTime: 28,
	},

	["Rose Crested Dumpling"]: {
		Price: 0,
		Value: 15,
		DropTime: 29,
	},

	["Imperial Dumpling"]: {
		Price: 0,
		Value: 15,
		DropTime: 30,
	},
	["Cabbage"]: {
		Price: 0,
		Value: 5,
		DropTime: 5,
	},

	["Spring Onion"]: {
		Price: 0,
		Value: 6,
		DropTime: 6,
	},

	["Blue Octopus"]: {
		Price: 0,
		Value: 7,
		DropTime: 7,
	},

	["Blue Squid"]: {
		Price: 0,
		Value: 8,
		DropTime: 8,
	},

	["Crab"]: {
		Price: 0,
		Value: 9,
		DropTime: 9,
	},

	["Lobster"]: {
		Price: 0,
		Value: 10,
		DropTime: 10,
	},

	["Filleted Salmon"]: {
		Price: 0,
		Value: 11,
		DropTime: 11,
	},

	["Salmon Rice Cake"]: {
		Price: 0,
		Value: 12,
		DropTime: 12,
	},

	["Seaweed Rice Cake"]: {
		Price: 0,
		Value: 13,
		DropTime: 12,
	},
};

export default Parts;

export type PartInfoKey = keyof typeof Parts;
export type PartInfoValue = typeof Parts[PartInfoKey];
