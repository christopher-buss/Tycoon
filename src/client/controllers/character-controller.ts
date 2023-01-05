import { Controller, OnStart } from "@flamework/core";
import { initaliseClient } from "@rbxts/character-realism";

@Controller({})
export class CharacterController implements OnStart {
	public onStart(): void {
		initaliseClient().Start({
			Sounds: {
				Dirt: 178054124,
				Wood: 177940988,
				Concrete: 277067660,
				Grass: 4776173570,
				Metal: 4790537991,
				Sand: 4777003964,
				Fabric: 4776951843,
				Gravel: 4776998555,
				Marble: 4776962643,
			},

			MaterialMap: {
				Mud: "Dirt",
				Pebble: "Dirt",
				Ground: "Dirt",

				Sand: "Sand",
				Snow: "Sand",
				Sandstone: "Sand",

				Rock: "Gravel",
				Basalt: "Gravel",
				Asphalt: "Gravel",
				Glacier: "Gravel",
				Slate: "Gravel",

				WoodPlanks: "Wood",
				LeafyGrass: "Grass",

				Ice: "Marble",
				Salt: "Marble",
				Marble: "Marble",
				Pavement: "Marble",
				Limestone: "Marble",

				Foil: "Metal",
				DiamondPlate: "Metal",
				CorrodedMetal: "Metal",
			},

			RotationFactors: {
				Head: {
					Pitch: 0.8,
					Yaw: 0.75,
				},

				UpperTorso: {
					Pitch: 0.5,
					Yaw: 0.5,
				},

				LeftUpperArm: {
					Pitch: 0.0,
					Yaw: -0.5,
				},

				RightUpperArm: {
					Pitch: 0.0,
					Yaw: -0.5,
				},

				Torso: {
					Pitch: 0.4,
					Yaw: 0.2,
				},

				["Left Arm"]: {
					Pitch: 0.0,
					Yaw: -0.5,
				},

				["Right Arm"]: {
					Pitch: 0.0,
					Yaw: -0.5,
				},

				["Left Leg"]: {
					Pitch: 0.0,
					Yaw: -0.2,
				},

				["Right Leg"]: {
					Pitch: 0.0,
					Yaw: -0.2,
				},
			},
		});
	}
}
