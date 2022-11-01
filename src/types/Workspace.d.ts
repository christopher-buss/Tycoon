interface Workspace extends Model {
	Prompts: Folder & {
		["Rebirth Now"]: Model & {
			["Elite Effect"]: Model & {
				Primary: Part & {
					Weld: Weld;
				};
			};
			Board: Part & {
				TouchPart: Part;
			};
			Head: Part & {
				sparkles1: ParticleEmitter;
				PointLight: PointLight;
				Mesh: SpecialMesh;
			};
		};
	};
	["Sparkle Trail"]: Model & {
		Sign: Model & {
			Configuration: Configuration & {
				Color: BrickColorValue;
				Text: StringValue;
			};
			Board: Part & {
				["Board Terrain Joint"]: ManualWeld;
				Face: BillboardGui & {
					Contents: TextLabel;
				};
			};
		};
		["Elite Effect"]: Model & {
			Primary: Part;
		};
		Open: Model & {
			Part: Part;
			TouchPart: Part;
			Hologram: UnionOperation;
		};
		Mesh: Part & {
			sparkles1: ParticleEmitter;
			PointLight: PointLight;
		};
	};
	Glider: Part & {
		Part: Part & {
			Weld: Weld;
			BillboardGui: BillboardGui & {
				ImageLabel: ImageLabel & {
					Script: Script;
				};
			};
		};
		ProximityPrompt: ProximityPrompt;
		Weld: Weld;
		Glider: Model & {
			Mesh: Part & {
				Mesh: SpecialMesh;
				PointLight: PointLight;
			};
		};
	};
	Part: Part & {
		Decal: Decal;
	};
	Simulator: Folder & {
		["Jelly Dumpling"]: Folder & {
			FishBelt: Model & {
				["53"]: Part;
				["43"]: Part;
				["51"]: Part;
				["41"]: Part;
				["47"]: Part;
				["37"]: Part;
				["45"]: Part;
				["35"]: Part;
				["59"]: Part;
				["49"]: Part;
				["39"]: Part;
				["29"]: Part;
				["1"]: Part;
				["5"]: Part;
				["3"]: Part;
				["2"]: Part;
				["19"]: Part;
				["4"]: Part;
				["7"]: Part;
				["6"]: Part;
				["9"]: Part;
				["15"]: Part;
				["27"]: Part;
				["17"]: Part;
				["13"]: Part;
				["21"]: Part;
				["11"]: Part;
				["23"]: Part;
				["42"]: Part;
				["52"]: Part;
				["40"]: Part;
				["50"]: Part;
				["36"]: Part;
				["46"]: Part;
				["34"]: Part;
				["44"]: Part;
				["48"]: Part;
				["58"]: Part;
				["28"]: Part;
				["38"]: Part;
				["60"]: Part;
				["57"]: Part;
				["56"]: Part;
				["55"]: Part;
				["54"]: Part;
				["33"]: Part;
				["32"]: Part;
				["31"]: Part;
				["30"]: Part;
				["18"]: Part;
				["8"]: Part;
				["25"]: Part;
				["14"]: Part;
				["24"]: Part;
				["16"]: Part;
				["26"]: Part;
				["20"]: Part;
				["12"]: Part;
				["22"]: Part;
				["10"]: Part;
			};
			Buttons: Folder & {
				["Pineapple Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Dumpling Boat Upgrade"]: Model & {
					Head: MeshPart;
				};
				["Blue Octopus"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart & {
						Mesh: BlockMesh;
					};
				};
				["Cream Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Vegetable Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Dumpling Gold Standard"]: Model & {
					Head: MeshPart & {
						Mesh: BlockMesh;
					};
				};
				["Fishery Boat Upgrade"]: Model & {
					Head: MeshPart & {
						Mesh: BlockMesh;
					};
				};
				["Chocolate Spread Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Robux Upgrader"]: Model & {
					Head: MeshPart;
				};
				["Fishery Chemical Wash"]: Model & {
					Head: MeshPart & {
						Mesh: BlockMesh;
					};
				};
				Crab: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Salmon Rice Cake"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Velvet Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Sugar Vegetable Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Sugar Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Sugar Cream Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Fishery Pressure Wash"]: Model & {
					Head: MeshPart & {
						Mesh: BlockMesh;
					};
				};
				["Strawberry Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Dumpling Tube Cleaner"]: Model & {
					Head: MeshPart & {
						Mesh: BlockMesh;
					};
				};
				["Dumpling Tube Upgrade"]: Model & {
					Head: MeshPart & {
						Mesh: BlockMesh;
					};
				};
				["Seaweed Rice Cake"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Dumpling Packager"]: Model & {
					Head: MeshPart & {
						Mesh: BlockMesh;
					};
				};
				["Chocolate Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				Cabbage: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Cinnamon Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Plum Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Dumpling Scenter"]: Model & {
					Head: MeshPart;
				};
				["Dumpling Oven"]: Model & {
					Head: MeshPart & {
						Mesh: BlockMesh;
					};
				};
				["Crate Net Machine"]: Model & {
					Head: MeshPart & {
						Mesh: BlockMesh;
					};
				};
				Dumpling: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Filleted Salmon"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Color Creamed Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Pressure Washer"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart & {
						Mesh: BlockMesh;
					};
				};
				["Peppered Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Layered Velvet Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Robux Dropper"]: Model & {
					Head: MeshPart;
				};
				["Imperial Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Mint Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				Lobster: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Emperor Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["King Sugar Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Chili Pepper Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Blue Squid"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Jelly Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Rose Crested Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Cool Mint Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Spring Onion"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Rose Scent Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
			};
			["Double Yen"]: Model & {
				Sign: Model & {
					Configuration: Configuration & {
						Color: BrickColorValue;
						Text: StringValue;
					};
					Board: Part & {
						Face: BillboardGui & {
							Contents: TextLabel;
						};
					};
				};
				Open: Model & {
					Part: Part;
					TouchPart: Part;
				};
				["Day 14 - Radiant Treasure"]: Model & {
					Primary: Part;
					Prop: Folder & {
						Part: Part;
						Chest: Model & {
							KeyHole: Part;
							PivotPart: Part;
						};
					};
					Effect: Folder & {
						Area: Part & {
							Sparkles: ParticleEmitter;
						};
					};
				};
			};
			Objects: Folder & {
				["Pineapple Dumpling"]: Model & {
					Drop: Part;
				};
				["Dumpling Boat Upgrade"]: Model & {
					Parrot: Model & {
						Eyes: Model;
						RightArm: MeshPart;
						Beak: Model;
						LeftArm: MeshPart;
						LeftBoot: MeshPart;
						Torso: MeshPart & {
							Model: Model;
						};
						RightBoot: MeshPart;
						FakeHead: MeshPart;
					};
				};
				["Blue Octopus"]: Model & {
					Drop: Part;
				};
				["Cream Dumpling"]: Model & {
					Drop: Part;
				};
				["Vegetable Dumpling"]: Model & {
					Drop: Part;
				};
				["Dumpling Boat 1"]: Model;
				["Dumpling Gold Standard"]: Model & {
					Upgrader: Model & {
						Upgrader: Part & {
							Core: Part & {
								Attachment: Attachment & {
									Flare: ParticleEmitter;
									Wave: ParticleEmitter;
								};
							};
							Weld: Weld;
						};
						Core: Part & {
							Attachment: Attachment & {
								Bolts: ParticleEmitter;
								Bubble: ParticleEmitter;
							};
						};
					};
					TouchPart: Part & {
						Weld: Weld;
						Attachment2: Attachment & {
							Bubble: ParticleEmitter;
							Bolts: ParticleEmitter;
						};
						Sound: Sound;
						Attachment1: Attachment & {
							Flare: ParticleEmitter;
							Wave: ParticleEmitter;
						};
					};
				};
				["Fishery Boat Upgrade"]: Model & {
					Parrot: Model & {
						Eyes: Model;
						RightArm: MeshPart;
						Beak: Model;
						LeftArm: MeshPart;
						LeftBoot: MeshPart;
						Torso: MeshPart & {
							Model: Model;
						};
						RightBoot: MeshPart;
						FakeHead: MeshPart;
					};
				};
				["Chocolate Spread Dumpling"]: Model & {
					Drop: Part;
				};
				["Robux Upgrader"]: Model & {
					TouchPart: Part & {
						ParticleEmitter: ParticleEmitter;
					};
					Model: Model & {
						Part: Part;
						DropperBase: Model;
					};
				};
				["Fishery Chemical Wash"]: Model & {
					Button: Model;
					TouchPart: Part & {
						Sound: Sound;
					};
					["Water Tank"]: Model;
				};
				Crab: Model & {
					Drop: Part;
				};
				Lobster: Model & {
					Drop: Part;
				};
				["Color Creamed Dumpling"]: Model & {
					Drop: Part;
				};
				["Sugar Vegetable Dumpling"]: Model & {
					Drop: Part;
				};
				["Sugar Dumpling"]: Model & {
					Drop: Part;
				};
				["Sugar Cream Dumpling"]: Model & {
					Drop: Part;
				};
				["Strawberry Dumpling"]: Model & {
					Drop: Part;
				};
				["Fishery Pressure Wash"]: Model & {
					Button: Model;
					TouchPart: Part & {
						Sound: Sound;
					};
					["Water Tank"]: Model;
				};
				["Seaweed Rice Cake"]: Model & {
					Drop: Part;
				};
				["Dumpling Tube Cleaner"]: Part & {
					ParticleEmitter: ParticleEmitter;
				};
				["Salmon Rice Cake"]: Model & {
					Drop: Part;
				};
				["Dumpling Packager"]: Model & {
					TouchPart: Part & {
						Sound2: Sound;
						Sound1: Sound;
						CrateSpawn: Part;
					};
					Lever: Model & {
						Handle: Part;
						Base: UnionOperation & {
							Weld: Weld;
						};
						Shaft: Part;
					};
				};
				["Dumpling Tube Upgrade"]: Part & {
					ParticleEmitter: ParticleEmitter;
				};
				["Chocolate Dumpling"]: Model & {
					Drop: Part;
				};
				Cabbage: Model & {
					Drop: Part;
				};
				["Cinnamon Dumpling"]: Model & {
					Drop: Part;
				};
				["Plum Dumpling"]: Model & {
					Drop: Part;
				};
				["Dumpling Scenter"]: Model & {
					TouchPart: Part & {
						Sound: Sound;
					};
				};
				["Dumpling Oven"]: Model & {
					TouchPart: Part & {
						Sound: Sound;
					};
				};
				["Crate Net Machine"]: Model & {
					TouchPart: Part & {
						Sound: Sound;
					};
					Wedge: WedgePart;
				};
				["Blue Squid"]: Model & {
					Drop: Part;
				};
				["Filleted Salmon"]: Model & {
					Drop: Part;
				};
				["Robux Dropper"]: Model & {
					Drop: Part;
					Part: Part;
					DropperBase: Model;
				};
				["Pressure Washer"]: Model & {
					Button: Model;
					["Water Tank"]: Model;
					TouchPart: Part & {
						Sound: Sound;
					};
				};
				["Peppered Dumpling"]: Model & {
					Drop: Part;
				};
				["Layered Velvet Dumpling"]: Model & {
					Drop: Part;
				};
				["Velvet Dumpling"]: Model & {
					Drop: Part;
				};
				["Imperial Dumpling"]: Model & {
					Drop: Part;
				};
				["Mint Dumpling"]: Model & {
					Drop: Part;
				};
				["Fishery Boat 1"]: Model;
				["Emperor Dumpling"]: Model & {
					Drop: Part;
				};
				["King Sugar Dumpling"]: Model & {
					Drop: Part;
				};
				["Chili Pepper Dumpling"]: Model & {
					Drop: Part;
				};
				Dumpling: Model & {
					Drop: Part;
				};
				["Jelly Dumpling"]: Model & {
					Drop: Part;
				};
				["Rose Crested Dumpling"]: Model & {
					Drop: Part;
				};
				["Cool Mint Dumpling"]: Model & {
					Drop: Part;
				};
				["Spring Onion"]: Model & {
					Drop: Part;
				};
				["Rose Scent Dumpling"]: Model & {
					Drop: Part;
				};
			};
			Spawn: SpawnLocation & {
				Decal: Decal;
				Weld: Weld;
			};
			Model: Model;
			Essentials: Folder & {
				["5k Yen"]: Model & {
					TouchPart: Part & {
						Board: Part & {
							Face: BillboardGui & {
								Contents: TextLabel;
							};
						};
					};
					Mesh: Part & {
						Mesh: SpecialMesh;
						Decal: Decal;
					};
					LightningBolt: Part & {
						P2: ParticleEmitter;
					};
				};
				["Flying Cloud Prompt"]: Model & {
					Sign: Model & {
						Configuration: Configuration & {
							Color: BrickColorValue;
							Text: StringValue;
						};
						Board: Part & {
							Face: BillboardGui & {
								Contents: TextLabel;
							};
						};
					};
					["Elite Effect"]: Model & {
						Primary: Part;
						Effect: Folder & {
							Core: Part & {
								Attachment: Attachment;
							};
							Area: Part;
						};
					};
					Open: Model & {
						Part: Part & {
							Weld: Weld;
						};
						TouchPart: Part;
						Hologram: UnionOperation;
					};
					Mesh: Part & {
						Mesh: SpecialMesh;
						PointLight: PointLight;
					};
				};
				["Dumpling Store Prop"]: Model & {
					Board: Part & {
						Face: BillboardGui & {
							Contents: TextLabel;
						};
					};
				};
				["50k Yen"]: Model & {
					TouchPart: Part & {
						Board: Part & {
							Face: BillboardGui & {
								Contents: TextLabel;
							};
						};
					};
					Mesh: Part & {
						Mesh: SpecialMesh;
						Decal: Decal;
					};
					LightningBolt: Part & {
						P2: ParticleEmitter;
					};
				};
				["Dumpling Tower"]: Model;
				PathToIsland: Model & {
					Model: Model;
				};
				VIP: Model & {
					Sign: Model & {
						Configuration: Configuration & {
							Color: BrickColorValue;
							Text: StringValue;
						};
						Board: Part & {
							Face: BillboardGui & {
								Contents: TextLabel;
							};
						};
					};
					["Elite Effect"]: Model & {
						Primary: Part;
						Effect: Folder & {
							Core: Part & {
								Attachment: Attachment;
							};
							Area: Part;
						};
					};
					Open: Model & {
						TouchPart: Part;
					};
					Mesh: Part & {
						Mesh: SpecialMesh;
						PointLight: PointLight;
					};
				};
				Baseplate: Model & {
					Baseplate: MeshPart;
					MeshPart: MeshPart;
				};
				["Soup Path"]: Model & {
					Part: Part;
				};
				["Pink Octopus PlushyAccessory"]: Part & {
					OriginalSize: Vector3Value;
					HatAttachment: Attachment;
					SpecialMesh: SpecialMesh;
					AvatarPartScaleType: StringValue;
				};
				CollectorFish: Part;
				IslandDecoration: Model & {
					["Sushi Props"]: Model;
					Tree2: Model;
					["Sushi Prop"]: Model;
					["Stair Left"]: Model;
					["Turtle/sea turtle"]: Model & {
						["Turtle shell"]: Model;
						["Turtle base"]: Model & {
							["back flippers"]: MeshPart;
							Head: MeshPart;
							tail: MeshPart;
							["front flippers"]: MeshPart;
							body: MeshPart;
						};
						["Turtle spots"]: Model;
						["Turtle eyes"]: MeshPart;
					};
					["Dock Arch"]: Model;
					["Tycoon Paths"]: Model & {
						Path: Model;
					};
					["Tycoon Arch"]: Model;
					["Stair Right"]: Model;
					Tree1: Model;
				};
				["Speed Coil"]: Model & {
					Sign: Model & {
						Configuration: Configuration & {
							Color: BrickColorValue;
							Text: StringValue;
						};
						Board: Part & {
							["Board Terrain Joint"]: ManualWeld;
							Face: BillboardGui & {
								Contents: TextLabel;
							};
						};
					};
					["Elite Effect"]: Model & {
						Primary: Part;
						Effect: Folder & {
							Core: Part & {
								Attachment: Attachment;
							};
							Area: Part;
						};
					};
					Open: Model & {
						Part: Part & {
							Weld: Weld;
						};
						TouchPart: Part;
						Hologram: UnionOperation;
					};
					Mesh: Part & {
						Mesh: SpecialMesh;
						PointLight: PointLight;
					};
				};
				Path: Model & {
					Model: Model;
				};
				Wall: Model;
				["Sushi Prop market"]: Model & {
					Model: Model;
					Board: Part & {
						Face: BillboardGui & {
							Contents: TextLabel;
						};
					};
				};
				Conveyor: Model;
				Claim: Part & {
					Gui: BillboardGui & {
						PlayerName: TextBox;
						TycoonName: TextBox;
					};
				};
			};
			["Dumpling TOWER MODEL"]: Model;
			ConveyorBelt: Model & {
				["236"]: Part;
				["136"]: Part;
				["436"]: Part;
				["336"]: Part;
				["537"]: Part;
				["137"]: Part;
				["237"]: Part;
				["337"]: Part;
				["437"]: Part;
				["151"]: Part;
				["551"]: Part;
				["536"]: Part;
				["351"]: Part;
				["251"]: Part;
				["146"]: Part;
				["246"]: Part;
				["346"]: Part;
				["446"]: Part;
				["547"]: Part;
				["247"]: Part;
				["147"]: Part;
				["447"]: Part;
				["347"]: Part;
				["140"]: Part;
				["540"]: Part;
				["440"]: Part;
				["340"]: Part;
				["240"]: Part;
				["546"]: Part;
				["196"]: Part;
				["496"]: Part;
				["396"]: Part;
				["296"]: Part;
				["293"]: Part;
				["197"]: Part;
				["493"]: Part;
				["393"]: Part;
				["497"]: Part;
				["297"]: Part;
				["397"]: Part;
				["1"]: Part;
				["490"]: Part;
				["190"]: Part;
				["290"]: Part;
				["5"]: Part;
				["4"]: Part;
				["7"]: Part;
				["6"]: Part;
				["9"]: Part;
				["8"]: Part;
				["282"]: Part;
				["182"]: Part;
				["482"]: Part;
				["382"]: Part;
				["381"]: Part;
				["481"]: Part;
				["181"]: Part;
				["281"]: Part;
				["192"]: Part;
				["292"]: Part;
				["392"]: Part;
				["492"]: Part;
				["173"]: Part;
				["473"]: Part;
				["373"]: Part;
				["273"]: Part;
				["491"]: Part;
				["391"]: Part;
				["291"]: Part;
				["191"]: Part;
				["162"]: Part;
				["462"]: Part;
				["362"]: Part;
				["262"]: Part;
				["183"]: Part;
				["283"]: Part;
				["383"]: Part;
				["483"]: Part;
				["534"]: Part;
				["480"]: Part;
				["380"]: Part;
				["280"]: Part;
				["180"]: Part;
				["456"]: Part;
				["172"]: Part;
				["256"]: Part;
				["156"]: Part;
				["472"]: Part;
				["272"]: Part;
				["372"]: Part;
				["357"]: Part;
				["457"]: Part;
				["157"]: Part;
				["257"]: Part;
				["353"]: Part;
				["253"]: Part;
				["553"]: Part;
				["453"]: Part;
				["366"]: Part;
				["466"]: Part;
				["142"]: Part;
				["266"]: Part;
				["342"]: Part;
				["242"]: Part;
				["542"]: Part;
				["442"]: Part;
				["467"]: Part;
				["367"]: Part;
				["267"]: Part;
				["167"]: Part;
				["463"]: Part;
				["263"]: Part;
				["363"]: Part;
				["254"]: Part;
				["154"]: Part;
				["454"]: Part;
				["354"]: Part;
				["555"]: Part;
				["155"]: Part;
				["255"]: Part;
				["355"]: Part;
				["455"]: Part;
				["164"]: Part;
				["264"]: Part;
				["364"]: Part;
				["464"]: Part;
				["265"]: Part;
				["165"]: Part;
				["465"]: Part;
				["365"]: Part;
				["544"]: Part;
				["118"]: Part;
				["218"]: Part;
				["234"]: Part;
				["134"]: Part;
				["535"]: Part;
				["335"]: Part;
				["435"]: Part;
				["135"]: Part;
				["235"]: Part;
				["554"]: Part;
				["344"]: Part;
				["444"]: Part;
				["144"]: Part;
				["244"]: Part;
				["509"]: Part;
				["545"]: Part;
				["445"]: Part;
				["209"]: Part;
				["309"]: Part;
				["145"]: Part;
				["508"]: Part;
				["194"]: Part;
				["394"]: Part;
				["294"]: Part;
				["494"]: Part;
				["219"]: Part;
				["119"]: Part;
				["419"]: Part;
				["195"]: Part;
				["295"]: Part;
				["395"]: Part;
				["495"]: Part;
				["518"]: Part;
				["208"]: Part;
				["108"]: Part;
				["408"]: Part;
				["308"]: Part;
				["174"]: Part;
				["474"]: Part;
				["374"]: Part;
				["274"]: Part;
				["175"]: Part;
				["475"]: Part;
				["275"]: Part;
				["375"]: Part;
				["184"]: Part;
				["484"]: Part;
				["284"]: Part;
				["384"]: Part;
				["185"]: Part;
				["485"]: Part;
				["385"]: Part;
				["285"]: Part;
				["53"]: Part;
				["43"]: Part;
				["73"]: Part;
				["63"]: Part;
				["93"]: Part;
				["83"]: Part;
				["159"]: Part;
				["359"]: Part;
				["259"]: Part;
				["459"]: Part;
				["238"]: Part;
				["338"]: Part;
				["138"]: Part;
				["13"]: Part;
				["438"]: Part;
				["538"]: Part;
				["42"]: Part;
				["52"]: Part;
				["62"]: Part;
				["72"]: Part;
				["82"]: Part;
				["92"]: Part;
				["229"]: Part;
				["329"]: Part;
				["129"]: Part;
				["429"]: Part;
				["529"]: Part;
				["148"]: Part;
				["348"]: Part;
				["248"]: Part;
				["548"]: Part;
				["448"]: Part;
				["22"]: Part;
				["32"]: Part;
				["339"]: Part;
				["239"]: Part;
				["139"]: Part;
				["539"]: Part;
				["439"]: Part;
				["398"]: Part;
				["498"]: Part;
				["198"]: Part;
				["298"]: Part;
				["389"]: Part;
				["489"]: Part;
				["189"]: Part;
				["289"]: Part;
				["328"]: Part;
				["228"]: Part;
				["128"]: Part;
				["528"]: Part;
				["428"]: Part;
				["87"]: Part;
				["77"]: Part;
				["97"]: Part;
				["47"]: Part;
				["37"]: Part;
				["67"]: Part;
				["57"]: Part;
				["499"]: Part;
				["115"]: Part;
				["215"]: Part;
				["315"]: Part;
				["415"]: Part;
				["515"]: Part;
				["299"]: Part;
				["199"]: Part;
				["114"]: Part;
				["27"]: Part;
				["17"]: Part;
				["178"]: Part;
				["278"]: Part;
				["76"]: Part;
				["86"]: Part;
				["96"]: Part;
				["207"]: Part;
				["36"]: Part;
				["46"]: Part;
				["56"]: Part;
				["66"]: Part;
				["106"]: Part;
				["206"]: Part;
				["306"]: Part;
				["406"]: Part;
				["506"]: Part;
				["125"]: Part;
				["325"]: Part;
				["225"]: Part;
				["169"]: Part;
				["269"]: Part;
				["488"]: Part;
				["124"]: Part;
				["224"]: Part;
				["26"]: Part;
				["424"]: Part;
				["524"]: Part;
				["288"]: Part;
				["188"]: Part;
				["71"]: Part;
				["61"]: Part;
				["51"]: Part;
				["41"]: Part;
				["91"]: Part;
				["81"]: Part;
				["479"]: Part;
				["379"]: Part;
				["279"]: Part;
				["179"]: Part;
				["31"]: Part;
				["21"]: Part;
				["11"]: Part;
				["60"]: Part;
				["70"]: Part;
				["40"]: Part;
				["50"]: Part;
				["80"]: Part;
				["90"]: Part;
				["305"]: Part;
				["205"]: Part;
				["105"]: Part;
				["505"]: Part;
				["405"]: Part;
				["204"]: Part;
				["304"]: Part;
				["468"]: Part;
				["104"]: Part;
				["20"]: Part;
				["168"]: Part;
				["404"]: Part;
				["10"]: Part;
				["533"]: Part;
				["433"]: Part;
				["333"]: Part;
				["252"]: Part;
				["352"]: Part;
				["452"]: Part;
				["552"]: Part;
				["233"]: Part;
				["450"]: Part;
				["330"]: Part;
				["430"]: Part;
				["530"]: Part;
				["549"]: Part;
				["469"]: Part;
				["214"]: Part;
				["130"]: Part;
				["230"]: Part;
				["117"]: Part;
				["223"]: Part;
				["477"]: Part;
				["478"]: Part;
				["486"]: Part;
				["425"]: Part;
				["268"]: Part;
				["260"]: Part;
				["502"]: Part;
				["522"]: Part;
				["422"]: Part;
				["143"]: Part;
				["243"]: Part;
				["122"]: Part;
				["443"]: Part;
				["543"]: Part;
				["321"]: Part;
				["421"]: Part;
				["521"]: Part;
				["504"]: Part;
				["369"]: Part;
				["507"]: Part;
				["121"]: Part;
				["221"]: Part;
				["510"]: Part;
				["451"]: Part;
				["33"]: Part;
				["23"]: Part;
				["513"]: Part;
				["514"]: Part;
				["319"]: Part;
				["517"]: Part;
				["413"]: Part;
				["313"]: Part;
				["85"]: Part;
				["75"]: Part;
				["65"]: Part;
				["55"]: Part;
				["45"]: Part;
				["35"]: Part;
				["316"]: Part;
				["216"]: Part;
				["116"]: Part;
				["432"]: Part;
				["132"]: Part;
				["232"]: Part;
				["516"]: Part;
				["416"]: Part;
				["431"]: Part;
				["331"]: Part;
				["519"]: Part;
				["531"]: Part;
				["327"]: Part;
				["12"]: Part;
				["231"]: Part;
				["131"]: Part;
				["25"]: Part;
				["15"]: Part;
				["310"]: Part;
				["410"]: Part;
				["110"]: Part;
				["210"]: Part;
				["523"]: Part;
				["526"]: Part;
				["94"]: Part;
				["227"]: Part;
				["127"]: Part;
				["84"]: Part;
				["54"]: Part;
				["64"]: Part;
				["34"]: Part;
				["427"]: Part;
				["226"]: Part;
				["302"]: Part;
				["525"]: Part;
				["126"]: Part;
				["527"]: Part;
				["193"]: Part;
				["426"]: Part;
				["102"]: Part;
				["501"]: Part;
				["390"]: Part;
				["301"]: Part;
				["401"]: Part;
				["101"]: Part;
				["201"]: Part;
				["3"]: Part;
				["2"]: Part;
				["14"]: Part;
				["24"]: Part;
				["532"]: Part;
				["520"]: Part;
				["166"]: Part;
				["368"]: Part;
				["220"]: Part;
				["120"]: Part;
				["213"]: Part;
				["200"]: Part;
				["176"]: Part;
				["417"]: Part;
				["376"]: Part;
				["276"]: Part;
				["270"]: Part;
				["476"]: Part;
				["312"]: Part;
				["412"]: Part;
				["512"]: Part;
				["177"]: Part;
				["277"]: Part;
				["377"]: Part;
				["112"]: Part;
				["212"]: Part;
				["222"]: Part;
				["511"]: Part;
				["411"]: Part;
				["311"]: Part;
				["211"]: Part;
				["111"]: Part;
				["470"]: Part;
				["399"]: Part;
				["324"]: Part;
				["323"]: Part;
				["322"]: Part;
				["320"]: Part;
				["314"]: Part;
				["414"]: Part;
				["318"]: Part;
				["317"]: Part;
				["303"]: Part;
				["403"]: Part;
				["503"]: Part;
				["186"]: Part;
				["286"]: Part;
				["386"]: Part;
				["103"]: Part;
				["203"]: Part;
				["107"]: Part;
				["307"]: Part;
				["187"]: Part;
				["407"]: Part;
				["387"]: Part;
				["287"]: Part;
				["202"]: Part;
				["487"]: Part;
				["388"]: Part;
				["16"]: Part;
				["420"]: Part;
				["153"]: Part;
				["326"]: Part;
				["245"]: Part;
				["249"]: Part;
				["334"]: Part;
				["163"]: Part;
				["500"]: Part;
				["400"]: Part;
				["300"]: Part;
				["261"]: Part;
				["100"]: Part;
				["461"]: Part;
				["371"]: Part;
				["370"]: Part;
				["30"]: Part;
				["152"]: Part;
				["133"]: Part;
				["361"]: Part;
				["360"]: Part;
				["378"]: Part;
				["356"]: Part;
				["59"]: Part;
				["49"]: Part;
				["39"]: Part;
				["29"]: Part;
				["99"]: Part;
				["89"]: Part;
				["79"]: Part;
				["69"]: Part;
				["343"]: Part;
				["150"]: Part;
				["332"]: Part;
				["345"]: Part;
				["19"]: Part;
				["550"]: Part;
				["250"]: Part;
				["350"]: Part;
				["217"]: Part;
				["158"]: Part;
				["258"]: Part;
				["358"]: Part;
				["458"]: Part;
				["271"]: Part;
				["95"]: Part;
				["471"]: Part;
				["113"]: Part;
				["434"]: Part;
				["418"]: Part;
				["74"]: Part;
				["423"]: Part;
				["123"]: Part;
				["44"]: Part;
				["402"]: Part;
				["48"]: Part;
				["58"]: Part;
				["28"]: Part;
				["38"]: Part;
				["88"]: Part;
				["98"]: Part;
				["68"]: Part;
				["78"]: Part;
				["109"]: Part;
				["149"]: Part;
				["160"]: Part;
				["349"]: Part;
				["449"]: Part;
				["18"]: Part;
				["409"]: Part;
				["460"]: Part;
				["170"]: Part;
				["141"]: Part;
				["171"]: Part;
				["161"]: Part;
				["441"]: Part;
				["541"]: Part;
				["241"]: Part;
				["341"]: Part;
			};
			Parts: Model;
		};
		["Imperial Dumpling"]: Folder & {
			FishBelt: Model & {
				["53"]: Part;
				["43"]: Part;
				["51"]: Part;
				["41"]: Part;
				["47"]: Part;
				["37"]: Part;
				["45"]: Part;
				["35"]: Part;
				["59"]: Part;
				["49"]: Part;
				["39"]: Part;
				["29"]: Part;
				["1"]: Part;
				["5"]: Part;
				["3"]: Part;
				["2"]: Part;
				["19"]: Part;
				["4"]: Part;
				["7"]: Part;
				["6"]: Part;
				["9"]: Part;
				["15"]: Part;
				["27"]: Part;
				["17"]: Part;
				["13"]: Part;
				["21"]: Part;
				["11"]: Part;
				["23"]: Part;
				["42"]: Part;
				["52"]: Part;
				["40"]: Part;
				["50"]: Part;
				["36"]: Part;
				["46"]: Part;
				["34"]: Part;
				["44"]: Part;
				["48"]: Part;
				["58"]: Part;
				["28"]: Part;
				["38"]: Part;
				["60"]: Part;
				["57"]: Part;
				["56"]: Part;
				["55"]: Part;
				["54"]: Part;
				["33"]: Part;
				["32"]: Part;
				["31"]: Part;
				["30"]: Part;
				["18"]: Part;
				["8"]: Part;
				["25"]: Part;
				["14"]: Part;
				["24"]: Part;
				["16"]: Part;
				["26"]: Part;
				["20"]: Part;
				["12"]: Part;
				["22"]: Part;
				["10"]: Part;
			};
			Buttons: Folder & {
				["Pineapple Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Dumpling Boat Upgrade"]: Model & {
					Head: MeshPart;
				};
				["Blue Octopus"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart & {
						Mesh: BlockMesh;
					};
				};
				["Cream Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Vegetable Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Dumpling Gold Standard"]: Model & {
					Head: MeshPart & {
						Mesh: BlockMesh;
					};
				};
				["Fishery Boat Upgrade"]: Model & {
					Head: MeshPart & {
						Mesh: BlockMesh;
					};
				};
				["Chocolate Spread Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Robux Upgrader"]: Model & {
					Head: MeshPart;
				};
				["Fishery Chemical Wash"]: Model & {
					Head: MeshPart & {
						Mesh: BlockMesh;
					};
				};
				Crab: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Salmon Rice Cake"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Velvet Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Sugar Vegetable Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Sugar Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Sugar Cream Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Fishery Pressure Wash"]: Model & {
					Head: MeshPart & {
						Mesh: BlockMesh;
					};
				};
				["Strawberry Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Dumpling Tube Cleaner"]: Model & {
					Head: MeshPart & {
						Mesh: BlockMesh;
					};
				};
				["Dumpling Tube Upgrade"]: Model & {
					Head: MeshPart & {
						Mesh: BlockMesh;
					};
				};
				["Seaweed Rice Cake"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Dumpling Packager"]: Model & {
					Head: MeshPart & {
						Mesh: BlockMesh;
					};
				};
				["Chocolate Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				Cabbage: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Cinnamon Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Plum Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Dumpling Scenter"]: Model & {
					Head: MeshPart;
				};
				["Dumpling Oven"]: Model & {
					Head: MeshPart & {
						Mesh: BlockMesh;
					};
				};
				["Crate Net Machine"]: Model & {
					Head: MeshPart & {
						Mesh: BlockMesh;
					};
				};
				Dumpling: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Filleted Salmon"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Color Creamed Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Pressure Washer"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart & {
						Mesh: BlockMesh;
					};
				};
				["Peppered Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Layered Velvet Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Robux Dropper"]: Model & {
					Head: MeshPart;
				};
				["Imperial Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Mint Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				Lobster: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Emperor Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["King Sugar Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Chili Pepper Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Blue Squid"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Jelly Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Rose Crested Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Cool Mint Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Spring Onion"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Rose Scent Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
			};
			["Double Yen"]: Model & {
				Sign: Model & {
					Configuration: Configuration & {
						Color: BrickColorValue;
						Text: StringValue;
					};
					Board: Part & {
						Face: BillboardGui & {
							Contents: TextLabel;
						};
					};
				};
				Open: Model & {
					Part: Part;
					TouchPart: Part;
				};
				["Day 14 - Radiant Treasure"]: Model & {
					Primary: Part;
					Prop: Folder & {
						Part: Part;
						Chest: Model & {
							KeyHole: Part;
							PivotPart: Part;
						};
					};
					Effect: Folder & {
						Area: Part & {
							Sparkles: ParticleEmitter;
						};
					};
				};
			};
			Objects: Folder & {
				["Pineapple Dumpling"]: Model & {
					Drop: Part;
				};
				["Dumpling Boat Upgrade"]: Model & {
					Parrot: Model & {
						Eyes: Model;
						RightArm: MeshPart;
						Beak: Model;
						LeftArm: MeshPart;
						LeftBoot: MeshPart;
						Torso: MeshPart & {
							Model: Model;
						};
						RightBoot: MeshPart;
						FakeHead: MeshPart;
					};
				};
				["Blue Octopus"]: Model & {
					Drop: Part;
				};
				["Cream Dumpling"]: Model & {
					Drop: Part;
				};
				["Vegetable Dumpling"]: Model & {
					Drop: Part;
				};
				["Dumpling Boat 1"]: Model;
				["Dumpling Gold Standard"]: Model & {
					Upgrader: Model & {
						Upgrader: Part & {
							Core: Part & {
								Attachment: Attachment & {
									Flare: ParticleEmitter;
									Wave: ParticleEmitter;
								};
							};
							Weld: Weld;
						};
						Core: Part & {
							Attachment: Attachment & {
								Bolts: ParticleEmitter;
								Bubble: ParticleEmitter;
							};
						};
					};
					TouchPart: Part & {
						Weld: Weld;
						Attachment2: Attachment & {
							Bubble: ParticleEmitter;
							Bolts: ParticleEmitter;
						};
						Sound: Sound;
						Attachment1: Attachment & {
							Flare: ParticleEmitter;
							Wave: ParticleEmitter;
						};
					};
				};
				["Fishery Boat Upgrade"]: Model & {
					Parrot: Model & {
						Eyes: Model;
						RightArm: MeshPart;
						Beak: Model;
						LeftArm: MeshPart;
						LeftBoot: MeshPart;
						Torso: MeshPart & {
							Model: Model;
						};
						RightBoot: MeshPart;
						FakeHead: MeshPart;
					};
				};
				["Chocolate Spread Dumpling"]: Model & {
					Drop: Part;
				};
				["Robux Upgrader"]: Model & {
					TouchPart: Part & {
						ParticleEmitter: ParticleEmitter;
					};
					Model: Model & {
						Part: Part;
						DropperBase: Model;
					};
				};
				["Fishery Chemical Wash"]: Model & {
					Button: Model;
					TouchPart: Part & {
						Sound: Sound;
					};
					["Water Tank"]: Model;
				};
				Crab: Model & {
					Drop: Part;
				};
				Lobster: Model & {
					Drop: Part;
				};
				["Color Creamed Dumpling"]: Model & {
					Drop: Part;
				};
				["Sugar Vegetable Dumpling"]: Model & {
					Drop: Part;
				};
				["Sugar Dumpling"]: Model & {
					Drop: Part;
				};
				["Sugar Cream Dumpling"]: Model & {
					Drop: Part;
				};
				["Strawberry Dumpling"]: Model & {
					Drop: Part;
				};
				["Fishery Pressure Wash"]: Model & {
					Button: Model;
					TouchPart: Part & {
						Sound: Sound;
					};
					["Water Tank"]: Model;
				};
				["Seaweed Rice Cake"]: Model & {
					Drop: Part;
				};
				["Dumpling Tube Cleaner"]: Part & {
					ParticleEmitter: ParticleEmitter;
				};
				["Salmon Rice Cake"]: Model & {
					Drop: Part;
				};
				["Dumpling Packager"]: Model & {
					TouchPart: Part & {
						Sound2: Sound;
						Sound1: Sound;
						CrateSpawn: Part;
					};
					Lever: Model & {
						Handle: Part;
						Base: UnionOperation & {
							Weld: Weld;
						};
						Shaft: Part;
					};
				};
				["Dumpling Tube Upgrade"]: Part & {
					ParticleEmitter: ParticleEmitter;
				};
				["Chocolate Dumpling"]: Model & {
					Drop: Part;
				};
				Cabbage: Model & {
					Drop: Part;
				};
				["Cinnamon Dumpling"]: Model & {
					Drop: Part;
				};
				["Plum Dumpling"]: Model & {
					Drop: Part;
				};
				["Dumpling Scenter"]: Model & {
					TouchPart: Part & {
						Sound: Sound;
					};
				};
				["Dumpling Oven"]: Model & {
					TouchPart: Part & {
						Sound: Sound;
					};
				};
				["Crate Net Machine"]: Model & {
					TouchPart: Part & {
						Sound: Sound;
					};
					Wedge: WedgePart;
				};
				["Blue Squid"]: Model & {
					Drop: Part;
				};
				["Filleted Salmon"]: Model & {
					Drop: Part;
				};
				["Robux Dropper"]: Model & {
					Drop: Part;
					Part: Part;
					DropperBase: Model;
				};
				["Pressure Washer"]: Model & {
					Button: Model;
					["Water Tank"]: Model;
					TouchPart: Part & {
						Sound: Sound;
					};
				};
				["Peppered Dumpling"]: Model & {
					Drop: Part;
				};
				["Layered Velvet Dumpling"]: Model & {
					Drop: Part;
				};
				["Velvet Dumpling"]: Model & {
					Drop: Part;
				};
				["Imperial Dumpling"]: Model & {
					Drop: Part;
				};
				["Mint Dumpling"]: Model & {
					Drop: Part;
				};
				["Fishery Boat 1"]: Model;
				["Emperor Dumpling"]: Model & {
					Drop: Part;
				};
				["King Sugar Dumpling"]: Model & {
					Drop: Part;
				};
				["Chili Pepper Dumpling"]: Model & {
					Drop: Part;
				};
				Dumpling: Model & {
					Drop: Part;
				};
				["Jelly Dumpling"]: Model & {
					Drop: Part;
				};
				["Rose Crested Dumpling"]: Model & {
					Drop: Part;
				};
				["Cool Mint Dumpling"]: Model & {
					Drop: Part;
				};
				["Spring Onion"]: Model & {
					Drop: Part;
				};
				["Rose Scent Dumpling"]: Model & {
					Drop: Part;
				};
			};
			Spawn: SpawnLocation & {
				Decal: Decal;
				Weld: Weld;
			};
			Model: Model;
			Essentials: Folder & {
				["5k Yen"]: Model & {
					TouchPart: Part & {
						Board: Part & {
							Face: BillboardGui & {
								Contents: TextLabel;
							};
						};
					};
					Mesh: Part & {
						Mesh: SpecialMesh;
						Decal: Decal;
					};
					LightningBolt: Part & {
						P2: ParticleEmitter;
					};
				};
				["Flying Cloud Prompt"]: Model & {
					Sign: Model & {
						Configuration: Configuration & {
							Color: BrickColorValue;
							Text: StringValue;
						};
						Board: Part & {
							["Board Terrain Joint"]: ManualWeld;
							Face: BillboardGui & {
								Contents: TextLabel;
							};
						};
					};
					["Elite Effect"]: Model & {
						Primary: Part;
						Effect: Folder & {
							Core: Part & {
								Attachment: Attachment;
							};
							Area: Part;
						};
					};
					Open: Model & {
						Part: Part & {
							Weld: Weld;
						};
						TouchPart: Part;
						Hologram: UnionOperation;
					};
					Mesh: Part & {
						Mesh: SpecialMesh;
						PointLight: PointLight;
					};
				};
				["Dumpling Store Prop"]: Model & {
					Board: Part & {
						Face: BillboardGui & {
							Contents: TextLabel;
						};
					};
				};
				["50k Yen"]: Model & {
					TouchPart: Part & {
						Board: Part & {
							Face: BillboardGui & {
								Contents: TextLabel;
							};
						};
					};
					Mesh: Part & {
						Mesh: SpecialMesh;
						Decal: Decal;
					};
					LightningBolt: Part & {
						P2: ParticleEmitter;
					};
				};
				["Dumpling Tower"]: Model;
				PathToIsland: Model & {
					Model: Model;
				};
				VIP: Model & {
					Sign: Model & {
						Configuration: Configuration & {
							Color: BrickColorValue;
							Text: StringValue;
						};
						Board: Part & {
							Face: BillboardGui & {
								Contents: TextLabel;
							};
						};
					};
					["Elite Effect"]: Model & {
						Primary: Part;
						Effect: Folder & {
							Core: Part & {
								Attachment: Attachment;
							};
							Area: Part;
						};
					};
					Open: Model & {
						TouchPart: Part;
					};
					Mesh: Part & {
						Mesh: SpecialMesh;
						PointLight: PointLight;
					};
				};
				Baseplate: Model & {
					Baseplate: MeshPart;
					MeshPart: MeshPart;
				};
				["Soup Path"]: Model & {
					Part: Part;
				};
				["Pink Octopus PlushyAccessory"]: Part & {
					OriginalSize: Vector3Value;
					HatAttachment: Attachment;
					SpecialMesh: SpecialMesh;
					AvatarPartScaleType: StringValue;
				};
				CollectorFish: Part;
				IslandDecoration: Model & {
					["Sushi Props"]: Model;
					Tree2: Model;
					["Sushi Prop"]: Model;
					["Stair Left"]: Model;
					["Turtle/sea turtle"]: Model & {
						["Turtle shell"]: Model;
						["Turtle base"]: Model & {
							["back flippers"]: MeshPart;
							Head: MeshPart;
							tail: MeshPart;
							["front flippers"]: MeshPart;
							body: MeshPart;
						};
						["Turtle spots"]: Model;
						["Turtle eyes"]: MeshPart;
					};
					["Dock Arch"]: Model;
					["Tycoon Paths"]: Model & {
						Path: Model;
					};
					["Tycoon Arch"]: Model;
					["Stair Right"]: Model;
					Tree1: Model;
				};
				["Speed Coil"]: Model & {
					Sign: Model & {
						Configuration: Configuration & {
							Color: BrickColorValue;
							Text: StringValue;
						};
						Board: Part & {
							["Board Terrain Joint"]: ManualWeld;
							Face: BillboardGui & {
								Contents: TextLabel;
							};
						};
					};
					["Elite Effect"]: Model & {
						Primary: Part;
						Effect: Folder & {
							Core: Part & {
								Attachment: Attachment;
							};
							Area: Part;
						};
					};
					Open: Model & {
						Part: Part & {
							Weld: Weld;
						};
						TouchPart: Part;
						Hologram: UnionOperation;
					};
					Mesh: Part & {
						Mesh: SpecialMesh;
						PointLight: PointLight;
					};
				};
				Path: Model & {
					Model: Model;
				};
				Wall: Model;
				["Sushi Prop market"]: Model & {
					Model: Model;
					Board: Part & {
						Face: BillboardGui & {
							Contents: TextLabel;
						};
					};
				};
				Conveyor: Model;
				Claim: Part & {
					Gui: BillboardGui & {
						PlayerName: TextBox;
						TycoonName: TextBox;
					};
				};
			};
			["Dumpling TOWER MODEL"]: Model;
			ConveyorBelt: Model & {
				["236"]: Part;
				["136"]: Part;
				["436"]: Part;
				["336"]: Part;
				["537"]: Part;
				["137"]: Part;
				["237"]: Part;
				["337"]: Part;
				["437"]: Part;
				["151"]: Part;
				["551"]: Part;
				["536"]: Part;
				["351"]: Part;
				["251"]: Part;
				["146"]: Part;
				["246"]: Part;
				["346"]: Part;
				["446"]: Part;
				["547"]: Part;
				["247"]: Part;
				["147"]: Part;
				["447"]: Part;
				["347"]: Part;
				["140"]: Part;
				["540"]: Part;
				["440"]: Part;
				["340"]: Part;
				["240"]: Part;
				["546"]: Part;
				["196"]: Part;
				["496"]: Part;
				["396"]: Part;
				["296"]: Part;
				["293"]: Part;
				["197"]: Part;
				["493"]: Part;
				["393"]: Part;
				["497"]: Part;
				["297"]: Part;
				["397"]: Part;
				["1"]: Part;
				["490"]: Part;
				["190"]: Part;
				["290"]: Part;
				["5"]: Part;
				["4"]: Part;
				["7"]: Part;
				["6"]: Part;
				["9"]: Part;
				["8"]: Part;
				["282"]: Part;
				["182"]: Part;
				["482"]: Part;
				["382"]: Part;
				["381"]: Part;
				["481"]: Part;
				["181"]: Part;
				["281"]: Part;
				["192"]: Part;
				["292"]: Part;
				["392"]: Part;
				["492"]: Part;
				["173"]: Part;
				["473"]: Part;
				["373"]: Part;
				["273"]: Part;
				["491"]: Part;
				["391"]: Part;
				["291"]: Part;
				["191"]: Part;
				["162"]: Part;
				["462"]: Part;
				["362"]: Part;
				["262"]: Part;
				["183"]: Part;
				["283"]: Part;
				["383"]: Part;
				["483"]: Part;
				["534"]: Part;
				["480"]: Part;
				["380"]: Part;
				["280"]: Part;
				["180"]: Part;
				["456"]: Part;
				["172"]: Part;
				["256"]: Part;
				["156"]: Part;
				["472"]: Part;
				["272"]: Part;
				["372"]: Part;
				["357"]: Part;
				["457"]: Part;
				["157"]: Part;
				["257"]: Part;
				["353"]: Part;
				["253"]: Part;
				["553"]: Part;
				["453"]: Part;
				["366"]: Part;
				["466"]: Part;
				["142"]: Part;
				["266"]: Part;
				["342"]: Part;
				["242"]: Part;
				["542"]: Part;
				["442"]: Part;
				["467"]: Part;
				["367"]: Part;
				["267"]: Part;
				["167"]: Part;
				["463"]: Part;
				["263"]: Part;
				["363"]: Part;
				["254"]: Part;
				["154"]: Part;
				["454"]: Part;
				["354"]: Part;
				["555"]: Part;
				["155"]: Part;
				["255"]: Part;
				["355"]: Part;
				["455"]: Part;
				["164"]: Part;
				["264"]: Part;
				["364"]: Part;
				["464"]: Part;
				["265"]: Part;
				["165"]: Part;
				["465"]: Part;
				["365"]: Part;
				["544"]: Part;
				["118"]: Part;
				["218"]: Part;
				["234"]: Part;
				["134"]: Part;
				["535"]: Part;
				["335"]: Part;
				["435"]: Part;
				["135"]: Part;
				["235"]: Part;
				["554"]: Part;
				["344"]: Part;
				["444"]: Part;
				["144"]: Part;
				["244"]: Part;
				["509"]: Part;
				["545"]: Part;
				["445"]: Part;
				["209"]: Part;
				["309"]: Part;
				["145"]: Part;
				["508"]: Part;
				["194"]: Part;
				["394"]: Part;
				["294"]: Part;
				["494"]: Part;
				["219"]: Part;
				["119"]: Part;
				["419"]: Part;
				["195"]: Part;
				["295"]: Part;
				["395"]: Part;
				["495"]: Part;
				["518"]: Part;
				["208"]: Part;
				["108"]: Part;
				["408"]: Part;
				["308"]: Part;
				["174"]: Part;
				["474"]: Part;
				["374"]: Part;
				["274"]: Part;
				["175"]: Part;
				["475"]: Part;
				["275"]: Part;
				["375"]: Part;
				["184"]: Part;
				["484"]: Part;
				["284"]: Part;
				["384"]: Part;
				["185"]: Part;
				["485"]: Part;
				["385"]: Part;
				["285"]: Part;
				["53"]: Part;
				["43"]: Part;
				["73"]: Part;
				["63"]: Part;
				["93"]: Part;
				["83"]: Part;
				["159"]: Part;
				["359"]: Part;
				["259"]: Part;
				["459"]: Part;
				["238"]: Part;
				["338"]: Part;
				["138"]: Part;
				["13"]: Part;
				["438"]: Part;
				["538"]: Part;
				["42"]: Part;
				["52"]: Part;
				["62"]: Part;
				["72"]: Part;
				["82"]: Part;
				["92"]: Part;
				["229"]: Part;
				["329"]: Part;
				["129"]: Part;
				["429"]: Part;
				["529"]: Part;
				["148"]: Part;
				["348"]: Part;
				["248"]: Part;
				["548"]: Part;
				["448"]: Part;
				["22"]: Part;
				["32"]: Part;
				["339"]: Part;
				["239"]: Part;
				["139"]: Part;
				["539"]: Part;
				["439"]: Part;
				["398"]: Part;
				["498"]: Part;
				["198"]: Part;
				["298"]: Part;
				["389"]: Part;
				["489"]: Part;
				["189"]: Part;
				["289"]: Part;
				["328"]: Part;
				["228"]: Part;
				["128"]: Part;
				["528"]: Part;
				["428"]: Part;
				["87"]: Part;
				["77"]: Part;
				["97"]: Part;
				["47"]: Part;
				["37"]: Part;
				["67"]: Part;
				["57"]: Part;
				["499"]: Part;
				["115"]: Part;
				["215"]: Part;
				["315"]: Part;
				["415"]: Part;
				["515"]: Part;
				["299"]: Part;
				["199"]: Part;
				["114"]: Part;
				["27"]: Part;
				["17"]: Part;
				["178"]: Part;
				["278"]: Part;
				["76"]: Part;
				["86"]: Part;
				["96"]: Part;
				["207"]: Part;
				["36"]: Part;
				["46"]: Part;
				["56"]: Part;
				["66"]: Part;
				["106"]: Part;
				["206"]: Part;
				["306"]: Part;
				["406"]: Part;
				["506"]: Part;
				["125"]: Part;
				["325"]: Part;
				["225"]: Part;
				["169"]: Part;
				["269"]: Part;
				["488"]: Part;
				["124"]: Part;
				["224"]: Part;
				["26"]: Part;
				["424"]: Part;
				["524"]: Part;
				["288"]: Part;
				["188"]: Part;
				["71"]: Part;
				["61"]: Part;
				["51"]: Part;
				["41"]: Part;
				["91"]: Part;
				["81"]: Part;
				["479"]: Part;
				["379"]: Part;
				["279"]: Part;
				["179"]: Part;
				["31"]: Part;
				["21"]: Part;
				["11"]: Part;
				["60"]: Part;
				["70"]: Part;
				["40"]: Part;
				["50"]: Part;
				["80"]: Part;
				["90"]: Part;
				["305"]: Part;
				["205"]: Part;
				["105"]: Part;
				["505"]: Part;
				["405"]: Part;
				["204"]: Part;
				["304"]: Part;
				["468"]: Part;
				["104"]: Part;
				["20"]: Part;
				["168"]: Part;
				["404"]: Part;
				["10"]: Part;
				["533"]: Part;
				["433"]: Part;
				["333"]: Part;
				["252"]: Part;
				["352"]: Part;
				["452"]: Part;
				["552"]: Part;
				["233"]: Part;
				["450"]: Part;
				["330"]: Part;
				["430"]: Part;
				["530"]: Part;
				["549"]: Part;
				["469"]: Part;
				["214"]: Part;
				["130"]: Part;
				["230"]: Part;
				["117"]: Part;
				["223"]: Part;
				["477"]: Part;
				["478"]: Part;
				["486"]: Part;
				["425"]: Part;
				["268"]: Part;
				["260"]: Part;
				["502"]: Part;
				["522"]: Part;
				["422"]: Part;
				["143"]: Part;
				["243"]: Part;
				["122"]: Part;
				["443"]: Part;
				["543"]: Part;
				["321"]: Part;
				["421"]: Part;
				["521"]: Part;
				["504"]: Part;
				["369"]: Part;
				["507"]: Part;
				["121"]: Part;
				["221"]: Part;
				["510"]: Part;
				["451"]: Part;
				["33"]: Part;
				["23"]: Part;
				["513"]: Part;
				["514"]: Part;
				["319"]: Part;
				["517"]: Part;
				["413"]: Part;
				["313"]: Part;
				["85"]: Part;
				["75"]: Part;
				["65"]: Part;
				["55"]: Part;
				["45"]: Part;
				["35"]: Part;
				["316"]: Part;
				["216"]: Part;
				["116"]: Part;
				["432"]: Part;
				["132"]: Part;
				["232"]: Part;
				["516"]: Part;
				["416"]: Part;
				["431"]: Part;
				["331"]: Part;
				["519"]: Part;
				["531"]: Part;
				["327"]: Part;
				["12"]: Part;
				["231"]: Part;
				["131"]: Part;
				["25"]: Part;
				["15"]: Part;
				["310"]: Part;
				["410"]: Part;
				["110"]: Part;
				["210"]: Part;
				["523"]: Part;
				["526"]: Part;
				["94"]: Part;
				["227"]: Part;
				["127"]: Part;
				["84"]: Part;
				["54"]: Part;
				["64"]: Part;
				["34"]: Part;
				["427"]: Part;
				["226"]: Part;
				["302"]: Part;
				["525"]: Part;
				["126"]: Part;
				["527"]: Part;
				["193"]: Part;
				["426"]: Part;
				["102"]: Part;
				["501"]: Part;
				["390"]: Part;
				["301"]: Part;
				["401"]: Part;
				["101"]: Part;
				["201"]: Part;
				["3"]: Part;
				["2"]: Part;
				["14"]: Part;
				["24"]: Part;
				["532"]: Part;
				["520"]: Part;
				["166"]: Part;
				["368"]: Part;
				["220"]: Part;
				["120"]: Part;
				["213"]: Part;
				["200"]: Part;
				["176"]: Part;
				["417"]: Part;
				["376"]: Part;
				["276"]: Part;
				["270"]: Part;
				["476"]: Part;
				["312"]: Part;
				["412"]: Part;
				["512"]: Part;
				["177"]: Part;
				["277"]: Part;
				["377"]: Part;
				["112"]: Part;
				["212"]: Part;
				["222"]: Part;
				["511"]: Part;
				["411"]: Part;
				["311"]: Part;
				["211"]: Part;
				["111"]: Part;
				["470"]: Part;
				["399"]: Part;
				["324"]: Part;
				["323"]: Part;
				["322"]: Part;
				["320"]: Part;
				["314"]: Part;
				["414"]: Part;
				["318"]: Part;
				["317"]: Part;
				["303"]: Part;
				["403"]: Part;
				["503"]: Part;
				["186"]: Part;
				["286"]: Part;
				["386"]: Part;
				["103"]: Part;
				["203"]: Part;
				["107"]: Part;
				["307"]: Part;
				["187"]: Part;
				["407"]: Part;
				["387"]: Part;
				["287"]: Part;
				["202"]: Part;
				["487"]: Part;
				["388"]: Part;
				["16"]: Part;
				["420"]: Part;
				["153"]: Part;
				["326"]: Part;
				["245"]: Part;
				["249"]: Part;
				["334"]: Part;
				["163"]: Part;
				["500"]: Part;
				["400"]: Part;
				["300"]: Part;
				["261"]: Part;
				["100"]: Part;
				["461"]: Part;
				["371"]: Part;
				["370"]: Part;
				["30"]: Part;
				["152"]: Part;
				["133"]: Part;
				["361"]: Part;
				["360"]: Part;
				["378"]: Part;
				["356"]: Part;
				["59"]: Part;
				["49"]: Part;
				["39"]: Part;
				["29"]: Part;
				["99"]: Part;
				["89"]: Part;
				["79"]: Part;
				["69"]: Part;
				["343"]: Part;
				["150"]: Part;
				["332"]: Part;
				["345"]: Part;
				["19"]: Part;
				["550"]: Part;
				["250"]: Part;
				["350"]: Part;
				["217"]: Part;
				["158"]: Part;
				["258"]: Part;
				["358"]: Part;
				["458"]: Part;
				["271"]: Part;
				["95"]: Part;
				["471"]: Part;
				["113"]: Part;
				["434"]: Part;
				["418"]: Part;
				["74"]: Part;
				["423"]: Part;
				["123"]: Part;
				["44"]: Part;
				["402"]: Part;
				["48"]: Part;
				["58"]: Part;
				["28"]: Part;
				["38"]: Part;
				["88"]: Part;
				["98"]: Part;
				["68"]: Part;
				["78"]: Part;
				["109"]: Part;
				["149"]: Part;
				["160"]: Part;
				["349"]: Part;
				["449"]: Part;
				["18"]: Part;
				["409"]: Part;
				["460"]: Part;
				["170"]: Part;
				["141"]: Part;
				["171"]: Part;
				["161"]: Part;
				["441"]: Part;
				["541"]: Part;
				["241"]: Part;
				["341"]: Part;
			};
			Parts: Model;
		};
		["Mint Dumpling"]: Folder & {
			FishBelt: Model & {
				["53"]: Part;
				["43"]: Part;
				["51"]: Part;
				["41"]: Part;
				["47"]: Part;
				["37"]: Part;
				["45"]: Part;
				["35"]: Part;
				["59"]: Part;
				["49"]: Part;
				["39"]: Part;
				["29"]: Part;
				["1"]: Part;
				["5"]: Part;
				["3"]: Part;
				["2"]: Part;
				["19"]: Part;
				["4"]: Part;
				["7"]: Part;
				["6"]: Part;
				["9"]: Part;
				["15"]: Part;
				["27"]: Part;
				["17"]: Part;
				["13"]: Part;
				["21"]: Part;
				["11"]: Part;
				["23"]: Part;
				["42"]: Part;
				["52"]: Part;
				["40"]: Part;
				["50"]: Part;
				["36"]: Part;
				["46"]: Part;
				["34"]: Part;
				["44"]: Part;
				["48"]: Part;
				["58"]: Part;
				["28"]: Part;
				["38"]: Part;
				["60"]: Part;
				["57"]: Part;
				["56"]: Part;
				["55"]: Part;
				["54"]: Part;
				["33"]: Part;
				["32"]: Part;
				["31"]: Part;
				["30"]: Part;
				["18"]: Part;
				["8"]: Part;
				["25"]: Part;
				["14"]: Part;
				["24"]: Part;
				["16"]: Part;
				["26"]: Part;
				["20"]: Part;
				["12"]: Part;
				["22"]: Part;
				["10"]: Part;
			};
			Buttons: Folder & {
				["Pineapple Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Dumpling Boat Upgrade"]: Model & {
					Head: MeshPart;
				};
				["Blue Octopus"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart & {
						Mesh: BlockMesh;
					};
				};
				["Cream Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Vegetable Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Dumpling Gold Standard"]: Model & {
					Head: MeshPart & {
						Mesh: BlockMesh;
					};
				};
				["Fishery Boat Upgrade"]: Model & {
					Head: MeshPart & {
						Mesh: BlockMesh;
					};
				};
				["Chocolate Spread Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Robux Upgrader"]: Model & {
					Head: MeshPart;
				};
				["Fishery Chemical Wash"]: Model & {
					Head: MeshPart & {
						Mesh: BlockMesh;
					};
				};
				Crab: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Salmon Rice Cake"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Velvet Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Sugar Vegetable Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Sugar Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Sugar Cream Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Fishery Pressure Wash"]: Model & {
					Head: MeshPart & {
						Mesh: BlockMesh;
					};
				};
				["Strawberry Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Dumpling Tube Cleaner"]: Model & {
					Head: MeshPart & {
						Mesh: BlockMesh;
					};
				};
				["Dumpling Tube Upgrade"]: Model & {
					Head: MeshPart & {
						Mesh: BlockMesh;
					};
				};
				["Seaweed Rice Cake"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Dumpling Packager"]: Model & {
					Head: MeshPart & {
						Mesh: BlockMesh;
					};
				};
				["Chocolate Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				Cabbage: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Cinnamon Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Plum Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Dumpling Scenter"]: Model & {
					Head: MeshPart;
				};
				["Dumpling Oven"]: Model & {
					Head: MeshPart & {
						Mesh: BlockMesh;
					};
				};
				["Crate Net Machine"]: Model & {
					Head: MeshPart & {
						Mesh: BlockMesh;
					};
				};
				Dumpling: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Filleted Salmon"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Color Creamed Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Pressure Washer"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart & {
						Mesh: BlockMesh;
					};
				};
				["Peppered Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Layered Velvet Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Robux Dropper"]: Model & {
					Head: MeshPart;
				};
				["Imperial Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Mint Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				Lobster: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Emperor Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["King Sugar Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Chili Pepper Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Blue Squid"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Jelly Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Rose Crested Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Cool Mint Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Spring Onion"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Rose Scent Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
			};
			["Double Yen"]: Model & {
				Sign: Model & {
					Configuration: Configuration & {
						Color: BrickColorValue;
						Text: StringValue;
					};
					Board: Part & {
						Face: BillboardGui & {
							Contents: TextLabel;
						};
					};
				};
				Open: Model & {
					Part: Part;
					TouchPart: Part;
				};
				["Day 14 - Radiant Treasure"]: Model & {
					Primary: Part;
					Prop: Folder & {
						Part: Part;
						Chest: Model & {
							KeyHole: Part;
							PivotPart: Part;
						};
					};
					Effect: Folder & {
						Area: Part & {
							Sparkles: ParticleEmitter;
						};
					};
				};
			};
			Objects: Folder & {
				["Pineapple Dumpling"]: Model & {
					Drop: Part;
				};
				["Dumpling Boat Upgrade"]: Model & {
					Parrot: Model & {
						Eyes: Model;
						RightArm: MeshPart;
						Beak: Model;
						LeftArm: MeshPart;
						LeftBoot: MeshPart;
						Torso: MeshPart & {
							Model: Model;
						};
						RightBoot: MeshPart;
						FakeHead: MeshPart;
					};
				};
				["Blue Octopus"]: Model & {
					Drop: Part;
				};
				["Cream Dumpling"]: Model & {
					Drop: Part;
				};
				["Vegetable Dumpling"]: Model & {
					Drop: Part;
				};
				["Dumpling Boat 1"]: Model;
				["Dumpling Gold Standard"]: Model & {
					Upgrader: Model & {
						Upgrader: Part & {
							Core: Part & {
								Attachment: Attachment & {
									Flare: ParticleEmitter;
									Wave: ParticleEmitter;
								};
							};
							Weld: Weld;
						};
						Core: Part & {
							Attachment: Attachment & {
								Bolts: ParticleEmitter;
								Bubble: ParticleEmitter;
							};
						};
					};
					TouchPart: Part & {
						Weld: Weld;
						Attachment2: Attachment & {
							Bubble: ParticleEmitter;
							Bolts: ParticleEmitter;
						};
						Sound: Sound;
						Attachment1: Attachment & {
							Flare: ParticleEmitter;
							Wave: ParticleEmitter;
						};
					};
				};
				["Fishery Boat Upgrade"]: Model & {
					Parrot: Model & {
						Eyes: Model;
						RightArm: MeshPart;
						Beak: Model;
						LeftArm: MeshPart;
						LeftBoot: MeshPart;
						Torso: MeshPart & {
							Model: Model;
						};
						RightBoot: MeshPart;
						FakeHead: MeshPart;
					};
				};
				["Chocolate Spread Dumpling"]: Model & {
					Drop: Part;
				};
				["Robux Upgrader"]: Model & {
					TouchPart: Part & {
						ParticleEmitter: ParticleEmitter;
					};
					Model: Model & {
						Part: Part;
						DropperBase: Model;
					};
				};
				["Fishery Chemical Wash"]: Model & {
					Button: Model;
					TouchPart: Part & {
						Sound: Sound;
					};
					["Water Tank"]: Model;
				};
				Crab: Model & {
					Drop: Part;
				};
				Lobster: Model & {
					Drop: Part;
				};
				["Color Creamed Dumpling"]: Model & {
					Drop: Part;
				};
				["Sugar Vegetable Dumpling"]: Model & {
					Drop: Part;
				};
				["Sugar Dumpling"]: Model & {
					Drop: Part;
				};
				["Sugar Cream Dumpling"]: Model & {
					Drop: Part;
				};
				["Strawberry Dumpling"]: Model & {
					Drop: Part;
				};
				["Fishery Pressure Wash"]: Model & {
					Button: Model;
					TouchPart: Part & {
						Sound: Sound;
					};
					["Water Tank"]: Model;
				};
				["Seaweed Rice Cake"]: Model & {
					Drop: Part;
				};
				["Dumpling Tube Cleaner"]: Part & {
					ParticleEmitter: ParticleEmitter;
				};
				["Salmon Rice Cake"]: Model & {
					Drop: Part;
				};
				["Dumpling Packager"]: Model & {
					TouchPart: Part & {
						Sound2: Sound;
						Sound1: Sound;
						CrateSpawn: Part;
					};
					Lever: Model & {
						Handle: Part;
						Base: UnionOperation & {
							Weld: Weld;
						};
						Shaft: Part;
					};
				};
				["Dumpling Tube Upgrade"]: Part & {
					ParticleEmitter: ParticleEmitter;
				};
				["Chocolate Dumpling"]: Model & {
					Drop: Part;
				};
				Cabbage: Model & {
					Drop: Part;
				};
				["Cinnamon Dumpling"]: Model & {
					Drop: Part;
				};
				["Plum Dumpling"]: Model & {
					Drop: Part;
				};
				["Dumpling Scenter"]: Model & {
					TouchPart: Part & {
						Sound: Sound;
					};
				};
				["Dumpling Oven"]: Model & {
					TouchPart: Part & {
						Sound: Sound;
					};
				};
				["Crate Net Machine"]: Model & {
					TouchPart: Part & {
						Sound: Sound;
					};
					Wedge: WedgePart;
				};
				["Blue Squid"]: Model & {
					Drop: Part;
				};
				["Filleted Salmon"]: Model & {
					Drop: Part;
				};
				["Robux Dropper"]: Model & {
					Drop: Part;
					Part: Part;
					DropperBase: Model;
				};
				["Pressure Washer"]: Model & {
					Button: Model;
					["Water Tank"]: Model;
					TouchPart: Part & {
						Sound: Sound;
					};
				};
				["Peppered Dumpling"]: Model & {
					Drop: Part;
				};
				["Layered Velvet Dumpling"]: Model & {
					Drop: Part;
				};
				["Velvet Dumpling"]: Model & {
					Drop: Part;
				};
				["Imperial Dumpling"]: Model & {
					Drop: Part;
				};
				["Mint Dumpling"]: Model & {
					Drop: Part;
				};
				["Fishery Boat 1"]: Model;
				["Emperor Dumpling"]: Model & {
					Drop: Part;
				};
				["King Sugar Dumpling"]: Model & {
					Drop: Part;
				};
				["Chili Pepper Dumpling"]: Model & {
					Drop: Part;
				};
				Dumpling: Model & {
					Drop: Part;
				};
				["Jelly Dumpling"]: Model & {
					Drop: Part;
				};
				["Rose Crested Dumpling"]: Model & {
					Drop: Part;
				};
				["Cool Mint Dumpling"]: Model & {
					Drop: Part;
				};
				["Spring Onion"]: Model & {
					Drop: Part;
				};
				["Rose Scent Dumpling"]: Model & {
					Drop: Part;
				};
			};
			Spawn: SpawnLocation & {
				Decal: Decal;
				Weld: Weld;
			};
			Model: Model;
			Essentials: Folder & {
				["5k Yen"]: Model & {
					TouchPart: Part & {
						Board: Part & {
							Face: BillboardGui & {
								Contents: TextLabel;
							};
						};
					};
					Mesh: Part & {
						Mesh: SpecialMesh;
						Decal: Decal;
					};
					LightningBolt: Part & {
						P2: ParticleEmitter;
					};
				};
				["Flying Cloud Prompt"]: Model & {
					Sign: Model & {
						Configuration: Configuration & {
							Color: BrickColorValue;
							Text: StringValue;
						};
						Board: Part & {
							["Board Terrain Joint"]: ManualWeld;
							Face: BillboardGui & {
								Contents: TextLabel;
							};
						};
					};
					["Elite Effect"]: Model & {
						Primary: Part;
						Effect: Folder & {
							Core: Part & {
								Attachment: Attachment;
							};
							Area: Part;
						};
					};
					Open: Model & {
						Part: Part & {
							Weld: Weld;
						};
						TouchPart: Part;
						Hologram: UnionOperation;
					};
					Mesh: Part & {
						Mesh: SpecialMesh;
						PointLight: PointLight;
					};
				};
				["Dumpling Store Prop"]: Model & {
					Board: Part & {
						Face: BillboardGui & {
							Contents: TextLabel;
						};
					};
				};
				["50k Yen"]: Model & {
					TouchPart: Part & {
						Board: Part & {
							Face: BillboardGui & {
								Contents: TextLabel;
							};
						};
					};
					Mesh: Part & {
						Mesh: SpecialMesh;
						Decal: Decal;
					};
					LightningBolt: Part & {
						P2: ParticleEmitter;
					};
				};
				["Dumpling Tower"]: Model;
				PathToIsland: Model & {
					Model: Model;
				};
				VIP: Model & {
					Sign: Model & {
						Configuration: Configuration & {
							Color: BrickColorValue;
							Text: StringValue;
						};
						Board: Part & {
							Face: BillboardGui & {
								Contents: TextLabel;
							};
						};
					};
					["Elite Effect"]: Model & {
						Primary: Part;
						Effect: Folder & {
							Core: Part & {
								Attachment: Attachment;
							};
							Area: Part;
						};
					};
					Open: Model & {
						TouchPart: Part;
					};
					Mesh: Part & {
						Mesh: SpecialMesh;
						PointLight: PointLight;
					};
				};
				Baseplate: Model & {
					Baseplate: MeshPart;
					MeshPart: MeshPart;
				};
				["Soup Path"]: Model & {
					Part: Part;
				};
				["Pink Octopus PlushyAccessory"]: Part & {
					OriginalSize: Vector3Value;
					HatAttachment: Attachment;
					SpecialMesh: SpecialMesh;
					AvatarPartScaleType: StringValue;
				};
				CollectorFish: Part;
				IslandDecoration: Model & {
					["Sushi Props"]: Model;
					Tree2: Model;
					["Sushi Prop"]: Model;
					["Stair Left"]: Model;
					["Turtle/sea turtle"]: Model & {
						["Turtle shell"]: Model;
						["Turtle base"]: Model & {
							["back flippers"]: MeshPart;
							Head: MeshPart;
							tail: MeshPart;
							["front flippers"]: MeshPart;
							body: MeshPart;
						};
						["Turtle spots"]: Model;
						["Turtle eyes"]: MeshPart;
					};
					["Dock Arch"]: Model;
					["Tycoon Paths"]: Model & {
						Path: Model;
					};
					["Tycoon Arch"]: Model;
					["Stair Right"]: Model;
					Tree1: Model;
				};
				["Speed Coil"]: Model & {
					Sign: Model & {
						Configuration: Configuration & {
							Color: BrickColorValue;
							Text: StringValue;
						};
						Board: Part & {
							["Board Terrain Joint"]: ManualWeld;
							Face: BillboardGui & {
								Contents: TextLabel;
							};
						};
					};
					["Elite Effect"]: Model & {
						Primary: Part;
						Effect: Folder & {
							Core: Part & {
								Attachment: Attachment;
							};
							Area: Part;
						};
					};
					Open: Model & {
						Part: Part & {
							Weld: Weld;
						};
						TouchPart: Part;
						Hologram: UnionOperation;
					};
					Mesh: Part & {
						Mesh: SpecialMesh;
						PointLight: PointLight;
					};
				};
				Path: Model & {
					Model: Model;
				};
				Wall: Model;
				["Sushi Prop market"]: Model & {
					Model: Model;
					Board: Part & {
						Face: BillboardGui & {
							Contents: TextLabel;
						};
					};
				};
				Conveyor: Model;
				Claim: Part & {
					Gui: BillboardGui & {
						PlayerName: TextBox;
						TycoonName: TextBox;
					};
				};
			};
			["Dumpling TOWER MODEL"]: Model;
			ConveyorBelt: Model & {
				["236"]: Part;
				["136"]: Part;
				["436"]: Part;
				["336"]: Part;
				["537"]: Part;
				["137"]: Part;
				["237"]: Part;
				["337"]: Part;
				["437"]: Part;
				["151"]: Part;
				["551"]: Part;
				["536"]: Part;
				["351"]: Part;
				["251"]: Part;
				["146"]: Part;
				["246"]: Part;
				["346"]: Part;
				["446"]: Part;
				["547"]: Part;
				["247"]: Part;
				["147"]: Part;
				["447"]: Part;
				["347"]: Part;
				["140"]: Part;
				["540"]: Part;
				["440"]: Part;
				["340"]: Part;
				["240"]: Part;
				["546"]: Part;
				["196"]: Part;
				["496"]: Part;
				["396"]: Part;
				["296"]: Part;
				["293"]: Part;
				["197"]: Part;
				["493"]: Part;
				["393"]: Part;
				["497"]: Part;
				["297"]: Part;
				["397"]: Part;
				["1"]: Part;
				["490"]: Part;
				["190"]: Part;
				["290"]: Part;
				["5"]: Part;
				["4"]: Part;
				["7"]: Part;
				["6"]: Part;
				["9"]: Part;
				["8"]: Part;
				["282"]: Part;
				["182"]: Part;
				["482"]: Part;
				["382"]: Part;
				["381"]: Part;
				["481"]: Part;
				["181"]: Part;
				["281"]: Part;
				["192"]: Part;
				["292"]: Part;
				["392"]: Part;
				["492"]: Part;
				["173"]: Part;
				["473"]: Part;
				["373"]: Part;
				["273"]: Part;
				["491"]: Part;
				["391"]: Part;
				["291"]: Part;
				["191"]: Part;
				["162"]: Part;
				["462"]: Part;
				["362"]: Part;
				["262"]: Part;
				["183"]: Part;
				["283"]: Part;
				["383"]: Part;
				["483"]: Part;
				["534"]: Part;
				["480"]: Part;
				["380"]: Part;
				["280"]: Part;
				["180"]: Part;
				["456"]: Part;
				["172"]: Part;
				["256"]: Part;
				["156"]: Part;
				["472"]: Part;
				["272"]: Part;
				["372"]: Part;
				["357"]: Part;
				["457"]: Part;
				["157"]: Part;
				["257"]: Part;
				["353"]: Part;
				["253"]: Part;
				["553"]: Part;
				["453"]: Part;
				["366"]: Part;
				["466"]: Part;
				["142"]: Part;
				["266"]: Part;
				["342"]: Part;
				["242"]: Part;
				["542"]: Part;
				["442"]: Part;
				["467"]: Part;
				["367"]: Part;
				["267"]: Part;
				["167"]: Part;
				["463"]: Part;
				["263"]: Part;
				["363"]: Part;
				["254"]: Part;
				["154"]: Part;
				["454"]: Part;
				["354"]: Part;
				["555"]: Part;
				["155"]: Part;
				["255"]: Part;
				["355"]: Part;
				["455"]: Part;
				["164"]: Part;
				["264"]: Part;
				["364"]: Part;
				["464"]: Part;
				["265"]: Part;
				["165"]: Part;
				["465"]: Part;
				["365"]: Part;
				["544"]: Part;
				["118"]: Part;
				["218"]: Part;
				["234"]: Part;
				["134"]: Part;
				["535"]: Part;
				["335"]: Part;
				["435"]: Part;
				["135"]: Part;
				["235"]: Part;
				["554"]: Part;
				["344"]: Part;
				["444"]: Part;
				["144"]: Part;
				["244"]: Part;
				["509"]: Part;
				["545"]: Part;
				["445"]: Part;
				["209"]: Part;
				["309"]: Part;
				["145"]: Part;
				["508"]: Part;
				["194"]: Part;
				["394"]: Part;
				["294"]: Part;
				["494"]: Part;
				["219"]: Part;
				["119"]: Part;
				["419"]: Part;
				["195"]: Part;
				["295"]: Part;
				["395"]: Part;
				["495"]: Part;
				["518"]: Part;
				["208"]: Part;
				["108"]: Part;
				["408"]: Part;
				["308"]: Part;
				["174"]: Part;
				["474"]: Part;
				["374"]: Part;
				["274"]: Part;
				["175"]: Part;
				["475"]: Part;
				["275"]: Part;
				["375"]: Part;
				["184"]: Part;
				["484"]: Part;
				["284"]: Part;
				["384"]: Part;
				["185"]: Part;
				["485"]: Part;
				["385"]: Part;
				["285"]: Part;
				["53"]: Part;
				["43"]: Part;
				["73"]: Part;
				["63"]: Part;
				["93"]: Part;
				["83"]: Part;
				["159"]: Part;
				["359"]: Part;
				["259"]: Part;
				["459"]: Part;
				["238"]: Part;
				["338"]: Part;
				["138"]: Part;
				["13"]: Part;
				["438"]: Part;
				["538"]: Part;
				["42"]: Part;
				["52"]: Part;
				["62"]: Part;
				["72"]: Part;
				["82"]: Part;
				["92"]: Part;
				["229"]: Part;
				["329"]: Part;
				["129"]: Part;
				["429"]: Part;
				["529"]: Part;
				["148"]: Part;
				["348"]: Part;
				["248"]: Part;
				["548"]: Part;
				["448"]: Part;
				["22"]: Part;
				["32"]: Part;
				["339"]: Part;
				["239"]: Part;
				["139"]: Part;
				["539"]: Part;
				["439"]: Part;
				["398"]: Part;
				["498"]: Part;
				["198"]: Part;
				["298"]: Part;
				["389"]: Part;
				["489"]: Part;
				["189"]: Part;
				["289"]: Part;
				["328"]: Part;
				["228"]: Part;
				["128"]: Part;
				["528"]: Part;
				["428"]: Part;
				["87"]: Part;
				["77"]: Part;
				["97"]: Part;
				["47"]: Part;
				["37"]: Part;
				["67"]: Part;
				["57"]: Part;
				["499"]: Part;
				["115"]: Part;
				["215"]: Part;
				["315"]: Part;
				["415"]: Part;
				["515"]: Part;
				["299"]: Part;
				["199"]: Part;
				["114"]: Part;
				["27"]: Part;
				["17"]: Part;
				["178"]: Part;
				["278"]: Part;
				["76"]: Part;
				["86"]: Part;
				["96"]: Part;
				["207"]: Part;
				["36"]: Part;
				["46"]: Part;
				["56"]: Part;
				["66"]: Part;
				["106"]: Part;
				["206"]: Part;
				["306"]: Part;
				["406"]: Part;
				["506"]: Part;
				["125"]: Part;
				["325"]: Part;
				["225"]: Part;
				["169"]: Part;
				["269"]: Part;
				["488"]: Part;
				["124"]: Part;
				["224"]: Part;
				["26"]: Part;
				["424"]: Part;
				["524"]: Part;
				["288"]: Part;
				["188"]: Part;
				["71"]: Part;
				["61"]: Part;
				["51"]: Part;
				["41"]: Part;
				["91"]: Part;
				["81"]: Part;
				["479"]: Part;
				["379"]: Part;
				["279"]: Part;
				["179"]: Part;
				["31"]: Part;
				["21"]: Part;
				["11"]: Part;
				["60"]: Part;
				["70"]: Part;
				["40"]: Part;
				["50"]: Part;
				["80"]: Part;
				["90"]: Part;
				["305"]: Part;
				["205"]: Part;
				["105"]: Part;
				["505"]: Part;
				["405"]: Part;
				["204"]: Part;
				["304"]: Part;
				["468"]: Part;
				["104"]: Part;
				["20"]: Part;
				["168"]: Part;
				["404"]: Part;
				["10"]: Part;
				["533"]: Part;
				["433"]: Part;
				["333"]: Part;
				["252"]: Part;
				["352"]: Part;
				["452"]: Part;
				["552"]: Part;
				["233"]: Part;
				["450"]: Part;
				["330"]: Part;
				["430"]: Part;
				["530"]: Part;
				["549"]: Part;
				["469"]: Part;
				["214"]: Part;
				["130"]: Part;
				["230"]: Part;
				["117"]: Part;
				["223"]: Part;
				["477"]: Part;
				["478"]: Part;
				["486"]: Part;
				["425"]: Part;
				["268"]: Part;
				["260"]: Part;
				["502"]: Part;
				["522"]: Part;
				["422"]: Part;
				["143"]: Part;
				["243"]: Part;
				["122"]: Part;
				["443"]: Part;
				["543"]: Part;
				["321"]: Part;
				["421"]: Part;
				["521"]: Part;
				["504"]: Part;
				["369"]: Part;
				["507"]: Part;
				["121"]: Part;
				["221"]: Part;
				["510"]: Part;
				["451"]: Part;
				["33"]: Part;
				["23"]: Part;
				["513"]: Part;
				["514"]: Part;
				["319"]: Part;
				["517"]: Part;
				["413"]: Part;
				["313"]: Part;
				["85"]: Part;
				["75"]: Part;
				["65"]: Part;
				["55"]: Part;
				["45"]: Part;
				["35"]: Part;
				["316"]: Part;
				["216"]: Part;
				["116"]: Part;
				["432"]: Part;
				["132"]: Part;
				["232"]: Part;
				["516"]: Part;
				["416"]: Part;
				["431"]: Part;
				["331"]: Part;
				["519"]: Part;
				["531"]: Part;
				["327"]: Part;
				["12"]: Part;
				["231"]: Part;
				["131"]: Part;
				["25"]: Part;
				["15"]: Part;
				["310"]: Part;
				["410"]: Part;
				["110"]: Part;
				["210"]: Part;
				["523"]: Part;
				["526"]: Part;
				["94"]: Part;
				["227"]: Part;
				["127"]: Part;
				["84"]: Part;
				["54"]: Part;
				["64"]: Part;
				["34"]: Part;
				["427"]: Part;
				["226"]: Part;
				["302"]: Part;
				["525"]: Part;
				["126"]: Part;
				["527"]: Part;
				["193"]: Part;
				["426"]: Part;
				["102"]: Part;
				["501"]: Part;
				["390"]: Part;
				["301"]: Part;
				["401"]: Part;
				["101"]: Part;
				["201"]: Part;
				["3"]: Part;
				["2"]: Part;
				["14"]: Part;
				["24"]: Part;
				["532"]: Part;
				["520"]: Part;
				["166"]: Part;
				["368"]: Part;
				["220"]: Part;
				["120"]: Part;
				["213"]: Part;
				["200"]: Part;
				["176"]: Part;
				["417"]: Part;
				["376"]: Part;
				["276"]: Part;
				["270"]: Part;
				["476"]: Part;
				["312"]: Part;
				["412"]: Part;
				["512"]: Part;
				["177"]: Part;
				["277"]: Part;
				["377"]: Part;
				["112"]: Part;
				["212"]: Part;
				["222"]: Part;
				["511"]: Part;
				["411"]: Part;
				["311"]: Part;
				["211"]: Part;
				["111"]: Part;
				["470"]: Part;
				["399"]: Part;
				["324"]: Part;
				["323"]: Part;
				["322"]: Part;
				["320"]: Part;
				["314"]: Part;
				["414"]: Part;
				["318"]: Part;
				["317"]: Part;
				["303"]: Part;
				["403"]: Part;
				["503"]: Part;
				["186"]: Part;
				["286"]: Part;
				["386"]: Part;
				["103"]: Part;
				["203"]: Part;
				["107"]: Part;
				["307"]: Part;
				["187"]: Part;
				["407"]: Part;
				["387"]: Part;
				["287"]: Part;
				["202"]: Part;
				["487"]: Part;
				["388"]: Part;
				["16"]: Part;
				["420"]: Part;
				["153"]: Part;
				["326"]: Part;
				["245"]: Part;
				["249"]: Part;
				["334"]: Part;
				["163"]: Part;
				["500"]: Part;
				["400"]: Part;
				["300"]: Part;
				["261"]: Part;
				["100"]: Part;
				["461"]: Part;
				["371"]: Part;
				["370"]: Part;
				["30"]: Part;
				["152"]: Part;
				["133"]: Part;
				["361"]: Part;
				["360"]: Part;
				["378"]: Part;
				["356"]: Part;
				["59"]: Part;
				["49"]: Part;
				["39"]: Part;
				["29"]: Part;
				["99"]: Part;
				["89"]: Part;
				["79"]: Part;
				["69"]: Part;
				["343"]: Part;
				["150"]: Part;
				["332"]: Part;
				["345"]: Part;
				["19"]: Part;
				["550"]: Part;
				["250"]: Part;
				["350"]: Part;
				["217"]: Part;
				["158"]: Part;
				["258"]: Part;
				["358"]: Part;
				["458"]: Part;
				["271"]: Part;
				["95"]: Part;
				["471"]: Part;
				["113"]: Part;
				["434"]: Part;
				["418"]: Part;
				["74"]: Part;
				["423"]: Part;
				["123"]: Part;
				["44"]: Part;
				["402"]: Part;
				["48"]: Part;
				["58"]: Part;
				["28"]: Part;
				["38"]: Part;
				["88"]: Part;
				["98"]: Part;
				["68"]: Part;
				["78"]: Part;
				["109"]: Part;
				["149"]: Part;
				["160"]: Part;
				["349"]: Part;
				["449"]: Part;
				["18"]: Part;
				["409"]: Part;
				["460"]: Part;
				["170"]: Part;
				["141"]: Part;
				["171"]: Part;
				["161"]: Part;
				["441"]: Part;
				["541"]: Part;
				["241"]: Part;
				["341"]: Part;
			};
			Parts: Model;
		};
		["Cream Dumpling"]: Folder & {
			FishBelt: Model & {
				["53"]: Part;
				["43"]: Part;
				["51"]: Part;
				["41"]: Part;
				["47"]: Part;
				["37"]: Part;
				["45"]: Part;
				["35"]: Part;
				["59"]: Part;
				["49"]: Part;
				["39"]: Part;
				["29"]: Part;
				["1"]: Part;
				["5"]: Part;
				["3"]: Part;
				["2"]: Part;
				["19"]: Part;
				["4"]: Part;
				["7"]: Part;
				["6"]: Part;
				["9"]: Part;
				["15"]: Part;
				["27"]: Part;
				["17"]: Part;
				["13"]: Part;
				["21"]: Part;
				["11"]: Part;
				["23"]: Part;
				["42"]: Part;
				["52"]: Part;
				["40"]: Part;
				["50"]: Part;
				["36"]: Part;
				["46"]: Part;
				["34"]: Part;
				["44"]: Part;
				["48"]: Part;
				["58"]: Part;
				["28"]: Part;
				["38"]: Part;
				["60"]: Part;
				["57"]: Part;
				["56"]: Part;
				["55"]: Part;
				["54"]: Part;
				["33"]: Part;
				["32"]: Part;
				["31"]: Part;
				["30"]: Part;
				["18"]: Part;
				["8"]: Part;
				["25"]: Part;
				["14"]: Part;
				["24"]: Part;
				["16"]: Part;
				["26"]: Part;
				["20"]: Part;
				["12"]: Part;
				["22"]: Part;
				["10"]: Part;
			};
			Buttons: Folder & {
				["Pineapple Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Dumpling Boat Upgrade"]: Model & {
					Head: MeshPart;
				};
				["Blue Octopus"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart & {
						Mesh: BlockMesh;
					};
				};
				["Cream Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Vegetable Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Dumpling Gold Standard"]: Model & {
					Head: MeshPart & {
						Mesh: BlockMesh;
					};
				};
				["Fishery Boat Upgrade"]: Model & {
					Head: MeshPart & {
						Mesh: BlockMesh;
					};
				};
				["Chocolate Spread Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Robux Upgrader"]: Model & {
					Head: MeshPart;
				};
				["Fishery Chemical Wash"]: Model & {
					Head: MeshPart & {
						Mesh: BlockMesh;
					};
				};
				Crab: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Salmon Rice Cake"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Velvet Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Sugar Vegetable Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Sugar Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Sugar Cream Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Fishery Pressure Wash"]: Model & {
					Head: MeshPart & {
						Mesh: BlockMesh;
					};
				};
				["Strawberry Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Dumpling Tube Cleaner"]: Model & {
					Head: MeshPart & {
						Mesh: BlockMesh;
					};
				};
				["Dumpling Tube Upgrade"]: Model & {
					Head: MeshPart & {
						Mesh: BlockMesh;
					};
				};
				["Seaweed Rice Cake"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Dumpling Packager"]: Model & {
					Head: MeshPart & {
						Mesh: BlockMesh;
					};
				};
				["Chocolate Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				Cabbage: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Cinnamon Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Plum Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Dumpling Scenter"]: Model & {
					Head: MeshPart;
				};
				["Dumpling Oven"]: Model & {
					Head: MeshPart & {
						Mesh: BlockMesh;
					};
				};
				["Crate Net Machine"]: Model & {
					Head: MeshPart & {
						Mesh: BlockMesh;
					};
				};
				Dumpling: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Filleted Salmon"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Color Creamed Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Pressure Washer"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart & {
						Mesh: BlockMesh;
					};
				};
				["Peppered Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Layered Velvet Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Robux Dropper"]: Model & {
					Head: MeshPart;
				};
				["Imperial Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Mint Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				Lobster: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Emperor Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["King Sugar Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Chili Pepper Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Blue Squid"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Jelly Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Rose Crested Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Cool Mint Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Spring Onion"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Rose Scent Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
			};
			["Double Yen"]: Model & {
				Sign: Model & {
					Configuration: Configuration & {
						Color: BrickColorValue;
						Text: StringValue;
					};
					Board: Part & {
						Face: BillboardGui & {
							Contents: TextLabel;
						};
					};
				};
				Open: Model & {
					Part: Part;
					TouchPart: Part;
				};
				["Day 14 - Radiant Treasure"]: Model & {
					Primary: Part;
					Prop: Folder & {
						Part: Part;
						Chest: Model & {
							KeyHole: Part;
							PivotPart: Part;
						};
					};
					Effect: Folder & {
						Area: Part & {
							Sparkles: ParticleEmitter;
						};
					};
				};
			};
			Objects: Folder & {
				["Pineapple Dumpling"]: Model & {
					Drop: Part;
				};
				["Dumpling Boat Upgrade"]: Model & {
					Parrot: Model & {
						Eyes: Model;
						RightArm: MeshPart;
						Beak: Model;
						LeftArm: MeshPart;
						LeftBoot: MeshPart;
						Torso: MeshPart & {
							Model: Model;
						};
						RightBoot: MeshPart;
						FakeHead: MeshPart;
					};
				};
				["Blue Octopus"]: Model & {
					Drop: Part;
				};
				["Cream Dumpling"]: Model & {
					Drop: Part;
				};
				["Vegetable Dumpling"]: Model & {
					Drop: Part;
				};
				["Dumpling Boat 1"]: Model;
				["Dumpling Gold Standard"]: Model & {
					Upgrader: Model & {
						Upgrader: Part & {
							Core: Part & {
								Attachment: Attachment & {
									Flare: ParticleEmitter;
									Wave: ParticleEmitter;
								};
							};
							Weld: Weld;
						};
						Core: Part & {
							Attachment: Attachment & {
								Bolts: ParticleEmitter;
								Bubble: ParticleEmitter;
							};
						};
					};
					TouchPart: Part & {
						Weld: Weld;
						Attachment2: Attachment & {
							Bubble: ParticleEmitter;
							Bolts: ParticleEmitter;
						};
						Sound: Sound;
						Attachment1: Attachment & {
							Flare: ParticleEmitter;
							Wave: ParticleEmitter;
						};
					};
				};
				["Fishery Boat Upgrade"]: Model & {
					Parrot: Model & {
						Eyes: Model;
						RightArm: MeshPart;
						Beak: Model;
						LeftArm: MeshPart;
						LeftBoot: MeshPart;
						Torso: MeshPart & {
							Model: Model;
						};
						RightBoot: MeshPart;
						FakeHead: MeshPart;
					};
				};
				["Chocolate Spread Dumpling"]: Model & {
					Drop: Part;
				};
				["Robux Upgrader"]: Model & {
					TouchPart: Part & {
						ParticleEmitter: ParticleEmitter;
					};
					Model: Model & {
						Part: Part;
						DropperBase: Model;
					};
				};
				["Fishery Chemical Wash"]: Model & {
					Button: Model;
					TouchPart: Part & {
						Sound: Sound;
					};
					["Water Tank"]: Model;
				};
				Crab: Model & {
					Drop: Part;
				};
				Lobster: Model & {
					Drop: Part;
				};
				["Color Creamed Dumpling"]: Model & {
					Drop: Part;
				};
				["Sugar Vegetable Dumpling"]: Model & {
					Drop: Part;
				};
				["Sugar Dumpling"]: Model & {
					Drop: Part;
				};
				["Sugar Cream Dumpling"]: Model & {
					Drop: Part;
				};
				["Strawberry Dumpling"]: Model & {
					Drop: Part;
				};
				["Fishery Pressure Wash"]: Model & {
					Button: Model;
					TouchPart: Part & {
						Sound: Sound;
					};
					["Water Tank"]: Model;
				};
				["Seaweed Rice Cake"]: Model & {
					Drop: Part;
				};
				["Dumpling Tube Cleaner"]: Part & {
					ParticleEmitter: ParticleEmitter;
				};
				["Salmon Rice Cake"]: Model & {
					Drop: Part;
				};
				["Dumpling Packager"]: Model & {
					TouchPart: Part & {
						Sound2: Sound;
						Sound1: Sound;
						CrateSpawn: Part;
					};
					Lever: Model & {
						Handle: Part;
						Base: UnionOperation & {
							Weld: Weld;
						};
						Shaft: Part;
					};
				};
				["Dumpling Tube Upgrade"]: Part & {
					ParticleEmitter: ParticleEmitter;
				};
				["Chocolate Dumpling"]: Model & {
					Drop: Part;
				};
				Cabbage: Model & {
					Drop: Part;
				};
				["Cinnamon Dumpling"]: Model & {
					Drop: Part;
				};
				["Plum Dumpling"]: Model & {
					Drop: Part;
				};
				["Dumpling Scenter"]: Model & {
					TouchPart: Part & {
						Sound: Sound;
					};
				};
				["Dumpling Oven"]: Model & {
					TouchPart: Part & {
						Sound: Sound;
					};
				};
				["Crate Net Machine"]: Model & {
					TouchPart: Part & {
						Sound: Sound;
					};
					Wedge: WedgePart;
				};
				["Blue Squid"]: Model & {
					Drop: Part;
				};
				["Filleted Salmon"]: Model & {
					Drop: Part;
				};
				["Robux Dropper"]: Model & {
					Drop: Part;
					Part: Part;
					DropperBase: Model;
				};
				["Pressure Washer"]: Model & {
					Button: Model;
					["Water Tank"]: Model;
					TouchPart: Part & {
						Sound: Sound;
					};
				};
				["Peppered Dumpling"]: Model & {
					Drop: Part;
				};
				["Layered Velvet Dumpling"]: Model & {
					Drop: Part;
				};
				["Velvet Dumpling"]: Model & {
					Drop: Part;
				};
				["Imperial Dumpling"]: Model & {
					Drop: Part;
				};
				["Mint Dumpling"]: Model & {
					Drop: Part;
				};
				["Fishery Boat 1"]: Model;
				["Emperor Dumpling"]: Model & {
					Drop: Part;
				};
				["King Sugar Dumpling"]: Model & {
					Drop: Part;
				};
				["Chili Pepper Dumpling"]: Model & {
					Drop: Part;
				};
				Dumpling: Model & {
					Drop: Part;
				};
				["Jelly Dumpling"]: Model & {
					Drop: Part;
				};
				["Rose Crested Dumpling"]: Model & {
					Drop: Part;
				};
				["Cool Mint Dumpling"]: Model & {
					Drop: Part;
				};
				["Spring Onion"]: Model & {
					Drop: Part;
				};
				["Rose Scent Dumpling"]: Model & {
					Drop: Part;
				};
			};
			Spawn: SpawnLocation & {
				Decal: Decal;
				Weld: Weld;
			};
			Model: Model;
			Essentials: Folder & {
				["5k Yen"]: Model & {
					TouchPart: Part & {
						Board: Part & {
							Face: BillboardGui & {
								Contents: TextLabel;
							};
						};
					};
					Mesh: Part & {
						Mesh: SpecialMesh;
						Decal: Decal;
					};
					LightningBolt: Part & {
						P2: ParticleEmitter;
					};
				};
				["Flying Cloud Prompt"]: Model & {
					Sign: Model & {
						Configuration: Configuration & {
							Color: BrickColorValue;
							Text: StringValue;
						};
						Board: Part & {
							Face: BillboardGui & {
								Contents: TextLabel;
							};
						};
					};
					["Elite Effect"]: Model & {
						Primary: Part;
						Effect: Folder & {
							Core: Part & {
								Attachment: Attachment;
							};
							Area: Part;
						};
					};
					Open: Model & {
						Part: Part & {
							Weld: Weld;
						};
						TouchPart: Part;
						Hologram: UnionOperation;
					};
					Mesh: Part & {
						Mesh: SpecialMesh;
						PointLight: PointLight;
					};
				};
				["Dumpling Store Prop"]: Model & {
					Board: Part & {
						Face: BillboardGui & {
							Contents: TextLabel;
						};
					};
				};
				["50k Yen"]: Model & {
					TouchPart: Part & {
						Board: Part & {
							["Board Terrain Joint"]: ManualWeld;
							Face: BillboardGui & {
								Contents: TextLabel;
							};
						};
					};
					Mesh: Part & {
						Mesh: SpecialMesh;
						Decal: Decal;
					};
					LightningBolt: Part & {
						P2: ParticleEmitter;
					};
				};
				["Dumpling Tower"]: Model;
				PathToIsland: Model & {
					Model: Model;
				};
				VIP: Model & {
					Sign: Model & {
						Configuration: Configuration & {
							Color: BrickColorValue;
							Text: StringValue;
						};
						Board: Part & {
							Face: BillboardGui & {
								Contents: TextLabel;
							};
						};
					};
					["Elite Effect"]: Model & {
						Primary: Part;
						Effect: Folder & {
							Core: Part & {
								Attachment: Attachment;
							};
							Area: Part;
						};
					};
					Open: Model & {
						TouchPart: Part;
					};
					Mesh: Part & {
						Mesh: SpecialMesh;
						PointLight: PointLight;
					};
				};
				Baseplate: Model & {
					Baseplate: MeshPart;
					MeshPart: MeshPart;
				};
				["Soup Path"]: Model & {
					Part: Part;
				};
				["Pink Octopus PlushyAccessory"]: Part & {
					OriginalSize: Vector3Value;
					HatAttachment: Attachment;
					SpecialMesh: SpecialMesh;
					AvatarPartScaleType: StringValue;
				};
				CollectorFish: Part;
				IslandDecoration: Model & {
					["Sushi Props"]: Model;
					Tree2: Model;
					["Sushi Prop"]: Model;
					["Stair Left"]: Model;
					["Turtle/sea turtle"]: Model & {
						["Turtle shell"]: Model;
						["Turtle base"]: Model & {
							["back flippers"]: MeshPart;
							Head: MeshPart;
							tail: MeshPart;
							["front flippers"]: MeshPart;
							body: MeshPart;
						};
						["Turtle spots"]: Model;
						["Turtle eyes"]: MeshPart;
					};
					["Dock Arch"]: Model;
					["Tycoon Paths"]: Model & {
						Path: Model;
					};
					["Tycoon Arch"]: Model;
					["Stair Right"]: Model;
					Tree1: Model;
				};
				["Speed Coil"]: Model & {
					Sign: Model & {
						Configuration: Configuration & {
							Color: BrickColorValue;
							Text: StringValue;
						};
						Board: Part & {
							["Board Terrain Joint"]: ManualWeld;
							Face: BillboardGui & {
								Contents: TextLabel;
							};
						};
					};
					["Elite Effect"]: Model & {
						Primary: Part;
						Effect: Folder & {
							Core: Part & {
								Attachment: Attachment;
							};
							Area: Part;
						};
					};
					Open: Model & {
						Part: Part & {
							Weld: Weld;
						};
						TouchPart: Part;
						Hologram: UnionOperation;
					};
					Mesh: Part & {
						Mesh: SpecialMesh;
						PointLight: PointLight;
					};
				};
				Path: Model & {
					Model: Model;
				};
				Wall: Model;
				["Sushi Prop market"]: Model & {
					Model: Model;
					Board: Part & {
						Face: BillboardGui & {
							Contents: TextLabel;
						};
					};
				};
				Conveyor: Model;
				Claim: Part & {
					Gui: BillboardGui & {
						PlayerName: TextBox;
						TycoonName: TextBox;
					};
				};
			};
			["Dumpling TOWER MODEL"]: Model;
			ConveyorBelt: Model & {
				["236"]: Part;
				["136"]: Part;
				["436"]: Part;
				["336"]: Part;
				["537"]: Part;
				["137"]: Part;
				["237"]: Part;
				["337"]: Part;
				["437"]: Part;
				["151"]: Part;
				["551"]: Part;
				["536"]: Part;
				["351"]: Part;
				["251"]: Part;
				["146"]: Part;
				["246"]: Part;
				["346"]: Part;
				["446"]: Part;
				["547"]: Part;
				["247"]: Part;
				["147"]: Part;
				["447"]: Part;
				["347"]: Part;
				["140"]: Part;
				["540"]: Part;
				["440"]: Part;
				["340"]: Part;
				["240"]: Part;
				["546"]: Part;
				["196"]: Part;
				["496"]: Part;
				["396"]: Part;
				["296"]: Part;
				["293"]: Part;
				["197"]: Part;
				["493"]: Part;
				["393"]: Part;
				["497"]: Part;
				["297"]: Part;
				["397"]: Part;
				["1"]: Part;
				["490"]: Part;
				["190"]: Part;
				["290"]: Part;
				["5"]: Part;
				["4"]: Part;
				["7"]: Part;
				["6"]: Part;
				["9"]: Part;
				["8"]: Part;
				["282"]: Part;
				["182"]: Part;
				["482"]: Part;
				["382"]: Part;
				["381"]: Part;
				["481"]: Part;
				["181"]: Part;
				["281"]: Part;
				["192"]: Part;
				["292"]: Part;
				["392"]: Part;
				["492"]: Part;
				["173"]: Part;
				["473"]: Part;
				["373"]: Part;
				["273"]: Part;
				["491"]: Part;
				["391"]: Part;
				["291"]: Part;
				["191"]: Part;
				["162"]: Part;
				["462"]: Part;
				["362"]: Part;
				["262"]: Part;
				["183"]: Part;
				["283"]: Part;
				["383"]: Part;
				["483"]: Part;
				["534"]: Part;
				["480"]: Part;
				["380"]: Part;
				["280"]: Part;
				["180"]: Part;
				["456"]: Part;
				["172"]: Part;
				["256"]: Part;
				["156"]: Part;
				["472"]: Part;
				["272"]: Part;
				["372"]: Part;
				["357"]: Part;
				["457"]: Part;
				["157"]: Part;
				["257"]: Part;
				["353"]: Part;
				["253"]: Part;
				["553"]: Part;
				["453"]: Part;
				["366"]: Part;
				["466"]: Part;
				["142"]: Part;
				["266"]: Part;
				["342"]: Part;
				["242"]: Part;
				["542"]: Part;
				["442"]: Part;
				["467"]: Part;
				["367"]: Part;
				["267"]: Part;
				["167"]: Part;
				["463"]: Part;
				["263"]: Part;
				["363"]: Part;
				["254"]: Part;
				["154"]: Part;
				["454"]: Part;
				["354"]: Part;
				["555"]: Part;
				["155"]: Part;
				["255"]: Part;
				["355"]: Part;
				["455"]: Part;
				["164"]: Part;
				["264"]: Part;
				["364"]: Part;
				["464"]: Part;
				["265"]: Part;
				["165"]: Part;
				["465"]: Part;
				["365"]: Part;
				["544"]: Part;
				["118"]: Part;
				["218"]: Part;
				["234"]: Part;
				["134"]: Part;
				["535"]: Part;
				["335"]: Part;
				["435"]: Part;
				["135"]: Part;
				["235"]: Part;
				["554"]: Part;
				["344"]: Part;
				["444"]: Part;
				["144"]: Part;
				["244"]: Part;
				["509"]: Part;
				["545"]: Part;
				["445"]: Part;
				["209"]: Part;
				["309"]: Part;
				["145"]: Part;
				["508"]: Part;
				["194"]: Part;
				["394"]: Part;
				["294"]: Part;
				["494"]: Part;
				["219"]: Part;
				["119"]: Part;
				["419"]: Part;
				["195"]: Part;
				["295"]: Part;
				["395"]: Part;
				["495"]: Part;
				["518"]: Part;
				["208"]: Part;
				["108"]: Part;
				["408"]: Part;
				["308"]: Part;
				["174"]: Part;
				["474"]: Part;
				["374"]: Part;
				["274"]: Part;
				["175"]: Part;
				["475"]: Part;
				["275"]: Part;
				["375"]: Part;
				["184"]: Part;
				["484"]: Part;
				["284"]: Part;
				["384"]: Part;
				["185"]: Part;
				["485"]: Part;
				["385"]: Part;
				["285"]: Part;
				["53"]: Part;
				["43"]: Part;
				["73"]: Part;
				["63"]: Part;
				["93"]: Part;
				["83"]: Part;
				["159"]: Part;
				["359"]: Part;
				["259"]: Part;
				["459"]: Part;
				["238"]: Part;
				["338"]: Part;
				["138"]: Part;
				["13"]: Part;
				["438"]: Part;
				["538"]: Part;
				["42"]: Part;
				["52"]: Part;
				["62"]: Part;
				["72"]: Part;
				["82"]: Part;
				["92"]: Part;
				["229"]: Part;
				["329"]: Part;
				["129"]: Part;
				["429"]: Part;
				["529"]: Part;
				["148"]: Part;
				["348"]: Part;
				["248"]: Part;
				["548"]: Part;
				["448"]: Part;
				["22"]: Part;
				["32"]: Part;
				["339"]: Part;
				["239"]: Part;
				["139"]: Part;
				["539"]: Part;
				["439"]: Part;
				["398"]: Part;
				["498"]: Part;
				["198"]: Part;
				["298"]: Part;
				["389"]: Part;
				["489"]: Part;
				["189"]: Part;
				["289"]: Part;
				["328"]: Part;
				["228"]: Part;
				["128"]: Part;
				["528"]: Part;
				["428"]: Part;
				["87"]: Part;
				["77"]: Part;
				["97"]: Part;
				["47"]: Part;
				["37"]: Part;
				["67"]: Part;
				["57"]: Part;
				["499"]: Part;
				["115"]: Part;
				["215"]: Part;
				["315"]: Part;
				["415"]: Part;
				["515"]: Part;
				["299"]: Part;
				["199"]: Part;
				["114"]: Part;
				["27"]: Part;
				["17"]: Part;
				["178"]: Part;
				["278"]: Part;
				["76"]: Part;
				["86"]: Part;
				["96"]: Part;
				["207"]: Part;
				["36"]: Part;
				["46"]: Part;
				["56"]: Part;
				["66"]: Part;
				["106"]: Part;
				["206"]: Part;
				["306"]: Part;
				["406"]: Part;
				["506"]: Part;
				["125"]: Part;
				["325"]: Part;
				["225"]: Part;
				["169"]: Part;
				["269"]: Part;
				["488"]: Part;
				["124"]: Part;
				["224"]: Part;
				["26"]: Part;
				["424"]: Part;
				["524"]: Part;
				["288"]: Part;
				["188"]: Part;
				["71"]: Part;
				["61"]: Part;
				["51"]: Part;
				["41"]: Part;
				["91"]: Part;
				["81"]: Part;
				["479"]: Part;
				["379"]: Part;
				["279"]: Part;
				["179"]: Part;
				["31"]: Part;
				["21"]: Part;
				["11"]: Part;
				["60"]: Part;
				["70"]: Part;
				["40"]: Part;
				["50"]: Part;
				["80"]: Part;
				["90"]: Part;
				["305"]: Part;
				["205"]: Part;
				["105"]: Part;
				["505"]: Part;
				["405"]: Part;
				["204"]: Part;
				["304"]: Part;
				["468"]: Part;
				["104"]: Part;
				["20"]: Part;
				["168"]: Part;
				["404"]: Part;
				["10"]: Part;
				["533"]: Part;
				["433"]: Part;
				["333"]: Part;
				["252"]: Part;
				["352"]: Part;
				["452"]: Part;
				["552"]: Part;
				["233"]: Part;
				["450"]: Part;
				["330"]: Part;
				["430"]: Part;
				["530"]: Part;
				["549"]: Part;
				["469"]: Part;
				["214"]: Part;
				["130"]: Part;
				["230"]: Part;
				["117"]: Part;
				["223"]: Part;
				["477"]: Part;
				["478"]: Part;
				["486"]: Part;
				["425"]: Part;
				["268"]: Part;
				["260"]: Part;
				["502"]: Part;
				["522"]: Part;
				["422"]: Part;
				["143"]: Part;
				["243"]: Part;
				["122"]: Part;
				["443"]: Part;
				["543"]: Part;
				["321"]: Part;
				["421"]: Part;
				["521"]: Part;
				["504"]: Part;
				["369"]: Part;
				["507"]: Part;
				["121"]: Part;
				["221"]: Part;
				["510"]: Part;
				["451"]: Part;
				["33"]: Part;
				["23"]: Part;
				["513"]: Part;
				["514"]: Part;
				["319"]: Part;
				["517"]: Part;
				["413"]: Part;
				["313"]: Part;
				["85"]: Part;
				["75"]: Part;
				["65"]: Part;
				["55"]: Part;
				["45"]: Part;
				["35"]: Part;
				["316"]: Part;
				["216"]: Part;
				["116"]: Part;
				["432"]: Part;
				["132"]: Part;
				["232"]: Part;
				["516"]: Part;
				["416"]: Part;
				["431"]: Part;
				["331"]: Part;
				["519"]: Part;
				["531"]: Part;
				["327"]: Part;
				["12"]: Part;
				["231"]: Part;
				["131"]: Part;
				["25"]: Part;
				["15"]: Part;
				["310"]: Part;
				["410"]: Part;
				["110"]: Part;
				["210"]: Part;
				["523"]: Part;
				["526"]: Part;
				["94"]: Part;
				["227"]: Part;
				["127"]: Part;
				["84"]: Part;
				["54"]: Part;
				["64"]: Part;
				["34"]: Part;
				["427"]: Part;
				["226"]: Part;
				["302"]: Part;
				["525"]: Part;
				["126"]: Part;
				["527"]: Part;
				["193"]: Part;
				["426"]: Part;
				["102"]: Part;
				["501"]: Part;
				["390"]: Part;
				["301"]: Part;
				["401"]: Part;
				["101"]: Part;
				["201"]: Part;
				["3"]: Part;
				["2"]: Part;
				["14"]: Part;
				["24"]: Part;
				["532"]: Part;
				["520"]: Part;
				["166"]: Part;
				["368"]: Part;
				["220"]: Part;
				["120"]: Part;
				["213"]: Part;
				["200"]: Part;
				["176"]: Part;
				["417"]: Part;
				["376"]: Part;
				["276"]: Part;
				["270"]: Part;
				["476"]: Part;
				["312"]: Part;
				["412"]: Part;
				["512"]: Part;
				["177"]: Part;
				["277"]: Part;
				["377"]: Part;
				["112"]: Part;
				["212"]: Part;
				["222"]: Part;
				["511"]: Part;
				["411"]: Part;
				["311"]: Part;
				["211"]: Part;
				["111"]: Part;
				["470"]: Part;
				["399"]: Part;
				["324"]: Part;
				["323"]: Part;
				["322"]: Part;
				["320"]: Part;
				["314"]: Part;
				["414"]: Part;
				["318"]: Part;
				["317"]: Part;
				["303"]: Part;
				["403"]: Part;
				["503"]: Part;
				["186"]: Part;
				["286"]: Part;
				["386"]: Part;
				["103"]: Part;
				["203"]: Part;
				["107"]: Part;
				["307"]: Part;
				["187"]: Part;
				["407"]: Part;
				["387"]: Part;
				["287"]: Part;
				["202"]: Part;
				["487"]: Part;
				["388"]: Part;
				["16"]: Part;
				["420"]: Part;
				["153"]: Part;
				["326"]: Part;
				["245"]: Part;
				["249"]: Part;
				["334"]: Part;
				["163"]: Part;
				["500"]: Part;
				["400"]: Part;
				["300"]: Part;
				["261"]: Part;
				["100"]: Part;
				["461"]: Part;
				["371"]: Part;
				["370"]: Part;
				["30"]: Part;
				["152"]: Part;
				["133"]: Part;
				["361"]: Part;
				["360"]: Part;
				["378"]: Part;
				["356"]: Part;
				["59"]: Part;
				["49"]: Part;
				["39"]: Part;
				["29"]: Part;
				["99"]: Part;
				["89"]: Part;
				["79"]: Part;
				["69"]: Part;
				["343"]: Part;
				["150"]: Part;
				["332"]: Part;
				["345"]: Part;
				["19"]: Part;
				["550"]: Part;
				["250"]: Part;
				["350"]: Part;
				["217"]: Part;
				["158"]: Part;
				["258"]: Part;
				["358"]: Part;
				["458"]: Part;
				["271"]: Part;
				["95"]: Part;
				["471"]: Part;
				["113"]: Part;
				["434"]: Part;
				["418"]: Part;
				["74"]: Part;
				["423"]: Part;
				["123"]: Part;
				["44"]: Part;
				["402"]: Part;
				["48"]: Part;
				["58"]: Part;
				["28"]: Part;
				["38"]: Part;
				["88"]: Part;
				["98"]: Part;
				["68"]: Part;
				["78"]: Part;
				["109"]: Part;
				["149"]: Part;
				["160"]: Part;
				["349"]: Part;
				["449"]: Part;
				["18"]: Part;
				["409"]: Part;
				["460"]: Part;
				["170"]: Part;
				["141"]: Part;
				["171"]: Part;
				["161"]: Part;
				["441"]: Part;
				["541"]: Part;
				["241"]: Part;
				["341"]: Part;
			};
			Parts: Model;
		};
		["Emperor Dumpling"]: Folder & {
			FishBelt: Model & {
				["53"]: Part;
				["43"]: Part;
				["51"]: Part;
				["41"]: Part;
				["47"]: Part;
				["37"]: Part;
				["45"]: Part;
				["35"]: Part;
				["59"]: Part;
				["49"]: Part;
				["39"]: Part;
				["29"]: Part;
				["1"]: Part;
				["5"]: Part;
				["3"]: Part;
				["2"]: Part;
				["19"]: Part;
				["4"]: Part;
				["7"]: Part;
				["6"]: Part;
				["9"]: Part;
				["15"]: Part;
				["27"]: Part;
				["17"]: Part;
				["13"]: Part;
				["21"]: Part;
				["11"]: Part;
				["23"]: Part;
				["42"]: Part;
				["52"]: Part;
				["40"]: Part;
				["50"]: Part;
				["36"]: Part;
				["46"]: Part;
				["34"]: Part;
				["44"]: Part;
				["48"]: Part;
				["58"]: Part;
				["28"]: Part;
				["38"]: Part;
				["60"]: Part;
				["57"]: Part;
				["56"]: Part;
				["55"]: Part;
				["54"]: Part;
				["33"]: Part;
				["32"]: Part;
				["31"]: Part;
				["30"]: Part;
				["18"]: Part;
				["8"]: Part;
				["25"]: Part;
				["14"]: Part;
				["24"]: Part;
				["16"]: Part;
				["26"]: Part;
				["20"]: Part;
				["12"]: Part;
				["22"]: Part;
				["10"]: Part;
			};
			Buttons: Folder & {
				["Pineapple Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Dumpling Boat Upgrade"]: Model & {
					Head: MeshPart;
				};
				["Blue Octopus"]: Model & {
					Head: MeshPart & {
						Mesh: BlockMesh;
					};
					Dependency: ObjectValue;
				};
				["Cream Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Vegetable Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Dumpling Gold Standard"]: Model & {
					Head: MeshPart & {
						Mesh: BlockMesh;
					};
				};
				["Fishery Boat Upgrade"]: Model & {
					Head: MeshPart & {
						Mesh: BlockMesh;
					};
				};
				["Chocolate Spread Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Robux Upgrader"]: Model & {
					Head: MeshPart;
				};
				["Fishery Chemical Wash"]: Model & {
					Head: MeshPart & {
						Mesh: BlockMesh;
					};
				};
				Crab: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Salmon Rice Cake"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Velvet Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Sugar Vegetable Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Sugar Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Sugar Cream Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Fishery Pressure Wash"]: Model & {
					Head: MeshPart & {
						Mesh: BlockMesh;
					};
				};
				["Strawberry Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Dumpling Tube Cleaner"]: Model & {
					Head: MeshPart & {
						Mesh: BlockMesh;
					};
				};
				["Dumpling Tube Upgrade"]: Model & {
					Head: MeshPart & {
						Mesh: BlockMesh;
					};
				};
				["Seaweed Rice Cake"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Dumpling Packager"]: Model & {
					Head: MeshPart & {
						Mesh: BlockMesh;
					};
				};
				["Chocolate Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				Cabbage: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Cinnamon Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Plum Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Dumpling Scenter"]: Model & {
					Head: MeshPart;
				};
				["Dumpling Oven"]: Model & {
					Head: MeshPart & {
						Mesh: BlockMesh;
					};
				};
				["Crate Net Machine"]: Model & {
					Head: MeshPart & {
						Mesh: BlockMesh;
					};
				};
				Dumpling: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Filleted Salmon"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Color Creamed Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Pressure Washer"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart & {
						Mesh: BlockMesh;
					};
				};
				["Peppered Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Layered Velvet Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Robux Dropper"]: Model & {
					Head: MeshPart;
				};
				["Imperial Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Mint Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				Lobster: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Emperor Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["King Sugar Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Chili Pepper Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Blue Squid"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Jelly Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Rose Crested Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Cool Mint Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Spring Onion"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
				["Rose Scent Dumpling"]: Model & {
					Dependency: ObjectValue;
					Head: MeshPart;
				};
			};
			["Double Yen"]: Model & {
				Sign: Model & {
					Configuration: Configuration & {
						Color: BrickColorValue;
						Text: StringValue;
					};
					Board: Part & {
						Face: BillboardGui & {
							Contents: TextLabel;
						};
					};
				};
				Open: Model & {
					Part: Part;
					TouchPart: Part;
				};
				["Day 14 - Radiant Treasure"]: Model & {
					Primary: Part;
					Prop: Folder & {
						Part: Part;
						Chest: Model & {
							KeyHole: Part;
							PivotPart: Part;
						};
					};
					Effect: Folder & {
						Area: Part & {
							Sparkles: ParticleEmitter;
						};
					};
				};
			};
			Objects: Folder & {
				["Pineapple Dumpling"]: Model & {
					Drop: Part;
				};
				["Dumpling Boat Upgrade"]: Model & {
					Parrot: Model & {
						Eyes: Model;
						RightArm: MeshPart;
						Beak: Model;
						LeftArm: MeshPart;
						LeftBoot: MeshPart;
						Torso: MeshPart & {
							Model: Model;
						};
						RightBoot: MeshPart;
						FakeHead: MeshPart;
					};
				};
				["Blue Octopus"]: Model & {
					Drop: Part;
				};
				["Cream Dumpling"]: Model & {
					Drop: Part;
				};
				["Vegetable Dumpling"]: Model & {
					Drop: Part;
				};
				["Dumpling Boat 1"]: Model;
				["Dumpling Gold Standard"]: Model & {
					Upgrader: Model & {
						Upgrader: Part & {
							Core: Part & {
								Attachment: Attachment & {
									Flare: ParticleEmitter;
									Wave: ParticleEmitter;
								};
							};
							Weld: Weld;
						};
						Core: Part & {
							Attachment: Attachment & {
								Bolts: ParticleEmitter;
								Bubble: ParticleEmitter;
							};
						};
					};
					TouchPart: Part & {
						Weld: Weld;
						Attachment2: Attachment & {
							Bubble: ParticleEmitter;
							Bolts: ParticleEmitter;
						};
						Sound: Sound;
						Attachment1: Attachment & {
							Flare: ParticleEmitter;
							Wave: ParticleEmitter;
						};
					};
				};
				["Fishery Boat Upgrade"]: Model & {
					Parrot: Model & {
						Eyes: Model;
						RightArm: MeshPart;
						Beak: Model;
						LeftArm: MeshPart;
						LeftBoot: MeshPart;
						Torso: MeshPart & {
							Model: Model;
						};
						RightBoot: MeshPart;
						FakeHead: MeshPart;
					};
				};
				["Chocolate Spread Dumpling"]: Model & {
					Drop: Part;
				};
				["Robux Upgrader"]: Model & {
					TouchPart: Part & {
						ParticleEmitter: ParticleEmitter;
					};
					Model: Model & {
						Part: Part;
						DropperBase: Model;
					};
				};
				["Fishery Chemical Wash"]: Model & {
					Button: Model;
					TouchPart: Part & {
						Sound: Sound;
					};
					["Water Tank"]: Model;
				};
				Crab: Model & {
					Drop: Part;
				};
				Lobster: Model & {
					Drop: Part;
				};
				["Color Creamed Dumpling"]: Model & {
					Drop: Part;
				};
				["Sugar Vegetable Dumpling"]: Model & {
					Drop: Part;
				};
				["Sugar Dumpling"]: Model & {
					Drop: Part;
				};
				["Sugar Cream Dumpling"]: Model & {
					Drop: Part;
				};
				["Strawberry Dumpling"]: Model & {
					Drop: Part;
				};
				["Fishery Pressure Wash"]: Model & {
					Button: Model;
					TouchPart: Part & {
						Sound: Sound;
					};
					["Water Tank"]: Model;
				};
				["Seaweed Rice Cake"]: Model & {
					Drop: Part;
				};
				["Dumpling Tube Cleaner"]: Part & {
					ParticleEmitter: ParticleEmitter;
				};
				["Salmon Rice Cake"]: Model & {
					Drop: Part;
				};
				["Dumpling Packager"]: Model & {
					TouchPart: Part & {
						Sound2: Sound;
						Sound1: Sound;
						CrateSpawn: Part;
					};
					Lever: Model & {
						Handle: Part;
						Base: UnionOperation & {
							Weld: Weld;
						};
						Shaft: Part;
					};
				};
				["Dumpling Tube Upgrade"]: Part & {
					ParticleEmitter: ParticleEmitter;
				};
				["Chocolate Dumpling"]: Model & {
					Drop: Part;
				};
				Cabbage: Model & {
					Drop: Part;
				};
				["Cinnamon Dumpling"]: Model & {
					Drop: Part;
				};
				["Plum Dumpling"]: Model & {
					Drop: Part;
				};
				["Dumpling Scenter"]: Model & {
					TouchPart: Part & {
						Sound: Sound;
					};
				};
				["Dumpling Oven"]: Model & {
					TouchPart: Part & {
						Sound: Sound;
					};
				};
				["Crate Net Machine"]: Model & {
					TouchPart: Part & {
						Sound: Sound;
					};
					Wedge: WedgePart;
				};
				Dumpling: Model & {
					Drop: Part;
				};
				["Filleted Salmon"]: Model & {
					Drop: Part;
				};
				["Robux Dropper"]: Model & {
					Drop: Part;
					Part: Part;
					DropperBase: Model;
				};
				["Pressure Washer"]: Model & {
					Button: Model;
					["Water Tank"]: Model;
					TouchPart: Part & {
						Sound: Sound;
					};
				};
				["Peppered Dumpling"]: Model & {
					Drop: Part;
				};
				["Layered Velvet Dumpling"]: Model & {
					Drop: Part;
				};
				["Velvet Dumpling"]: Model & {
					Drop: Part;
				};
				["Imperial Dumpling"]: Model & {
					Drop: Part;
				};
				["Mint Dumpling"]: Model & {
					Drop: Part;
				};
				["Fishery Boat 1"]: Model;
				["Emperor Dumpling"]: Model & {
					Drop: Part;
				};
				["King Sugar Dumpling"]: Model & {
					Drop: Part;
				};
				["Chili Pepper Dumpling"]: Model & {
					Drop: Part;
				};
				["Blue Squid"]: Model & {
					Drop: Part;
				};
				["Jelly Dumpling"]: Model & {
					Drop: Part;
				};
				["Rose Crested Dumpling"]: Model & {
					Drop: Part;
				};
				["Cool Mint Dumpling"]: Model & {
					Drop: Part;
				};
				["Spring Onion"]: Model & {
					Drop: Part;
				};
				["Rose Scent Dumpling"]: Model & {
					Drop: Part;
				};
			};
			Spawn: SpawnLocation & {
				Decal: Decal;
				Weld: Weld;
			};
			Model: Model;
			Essentials: Folder & {
				["5k Yen"]: Model & {
					TouchPart: Part & {
						Board: Part & {
							Face: BillboardGui & {
								Contents: TextLabel;
							};
						};
					};
					Mesh: Part & {
						Mesh: SpecialMesh;
						Decal: Decal;
					};
					LightningBolt: Part & {
						P2: ParticleEmitter;
					};
				};
				["Flying Cloud Prompt"]: Model & {
					Sign: Model & {
						Configuration: Configuration & {
							Color: BrickColorValue;
							Text: StringValue;
						};
						Board: Part & {
							["Board Terrain Joint"]: ManualWeld;
							Face: BillboardGui & {
								Contents: TextLabel;
							};
						};
					};
					["Elite Effect"]: Model & {
						Primary: Part;
						Effect: Folder & {
							Core: Part & {
								Attachment: Attachment;
							};
							Area: Part;
						};
					};
					Open: Model & {
						Part: Part & {
							Weld: Weld;
						};
						TouchPart: Part;
						Hologram: UnionOperation;
					};
					Mesh: Part & {
						Mesh: SpecialMesh;
						PointLight: PointLight;
					};
				};
				["Dumpling Store Prop"]: Model & {
					Board: Part & {
						Face: BillboardGui & {
							Contents: TextLabel;
						};
					};
				};
				["50k Yen"]: Model & {
					TouchPart: Part & {
						Board: Part & {
							Face: BillboardGui & {
								Contents: TextLabel;
							};
						};
					};
					LightningBolt: Part & {
						P2: ParticleEmitter;
					};
					Mesh: Part & {
						Mesh: SpecialMesh;
						Decal: Decal;
					};
				};
				["Dumpling Tower"]: Model;
				PathToIsland: Model & {
					Model: Model;
				};
				VIP: Model & {
					Sign: Model & {
						Configuration: Configuration & {
							Color: BrickColorValue;
							Text: StringValue;
						};
						Board: Part & {
							Face: BillboardGui & {
								Contents: TextLabel;
							};
						};
					};
					["Elite Effect"]: Model & {
						Primary: Part;
						Effect: Folder & {
							Core: Part & {
								Attachment: Attachment;
							};
							Area: Part;
						};
					};
					Open: Model & {
						TouchPart: Part;
					};
					Mesh: Part & {
						Mesh: SpecialMesh;
						PointLight: PointLight;
					};
				};
				Baseplate: Model & {
					Baseplate: MeshPart;
					MeshPart: MeshPart;
				};
				["Soup Path"]: Model & {
					Part: Part;
				};
				["Pink Octopus PlushyAccessory"]: Part & {
					OriginalSize: Vector3Value;
					HatAttachment: Attachment;
					SpecialMesh: SpecialMesh;
					AvatarPartScaleType: StringValue;
				};
				Conveyor: Model;
				IslandDecoration: Model & {
					["Sushi Props"]: Model;
					Tree2: Model;
					["Sushi Prop"]: Model;
					["Stair Left"]: Model;
					["Turtle/sea turtle"]: Model & {
						["Turtle shell"]: Model;
						["Turtle base"]: Model & {
							["back flippers"]: MeshPart;
							Head: MeshPart;
							tail: MeshPart;
							["front flippers"]: MeshPart;
							body: MeshPart;
						};
						["Turtle spots"]: Model;
						["Turtle eyes"]: MeshPart;
					};
					["Dock Arch"]: Model;
					["Tycoon Paths"]: Model & {
						Path: Model;
					};
					["Tycoon Arch"]: Model;
					["Stair Right"]: Model;
					Tree1: Model;
				};
				["Speed Coil"]: Model & {
					Sign: Model & {
						Configuration: Configuration & {
							Color: BrickColorValue;
							Text: StringValue;
						};
						Board: Part & {
							["Board Terrain Joint"]: ManualWeld;
							Face: BillboardGui & {
								Contents: TextLabel;
							};
						};
					};
					["Elite Effect"]: Model & {
						Primary: Part;
						Effect: Folder & {
							Core: Part & {
								Attachment: Attachment;
							};
							Area: Part;
						};
					};
					Open: Model & {
						Part: Part & {
							Weld: Weld;
						};
						TouchPart: Part;
						Hologram: UnionOperation;
					};
					Mesh: Part & {
						Mesh: SpecialMesh;
						PointLight: PointLight;
					};
				};
				["Sushi Prop market"]: Model & {
					Model: Model;
					Board: Part & {
						Face: BillboardGui & {
							Contents: TextLabel;
						};
					};
				};
				Path: Model & {
					Model: Model;
				};
				Claim: Part & {
					Gui: BillboardGui & {
						PlayerName: TextBox;
						TycoonName: TextBox;
					};
				};
				Wall: Model;
			};
			["Dumpling TOWER MODEL"]: Model;
			ConveyorBelt: Model & {
				["236"]: Part;
				["136"]: Part;
				["436"]: Part;
				["336"]: Part;
				["537"]: Part;
				["137"]: Part;
				["237"]: Part;
				["337"]: Part;
				["437"]: Part;
				["151"]: Part;
				["551"]: Part;
				["536"]: Part;
				["351"]: Part;
				["251"]: Part;
				["146"]: Part;
				["246"]: Part;
				["346"]: Part;
				["446"]: Part;
				["547"]: Part;
				["247"]: Part;
				["147"]: Part;
				["447"]: Part;
				["347"]: Part;
				["140"]: Part;
				["540"]: Part;
				["440"]: Part;
				["340"]: Part;
				["240"]: Part;
				["546"]: Part;
				["196"]: Part;
				["496"]: Part;
				["396"]: Part;
				["296"]: Part;
				["293"]: Part;
				["197"]: Part;
				["493"]: Part;
				["393"]: Part;
				["497"]: Part;
				["297"]: Part;
				["397"]: Part;
				["1"]: Part;
				["490"]: Part;
				["190"]: Part;
				["290"]: Part;
				["5"]: Part;
				["4"]: Part;
				["7"]: Part;
				["6"]: Part;
				["9"]: Part;
				["8"]: Part;
				["282"]: Part;
				["182"]: Part;
				["482"]: Part;
				["382"]: Part;
				["381"]: Part;
				["481"]: Part;
				["181"]: Part;
				["281"]: Part;
				["192"]: Part;
				["292"]: Part;
				["392"]: Part;
				["492"]: Part;
				["173"]: Part;
				["473"]: Part;
				["373"]: Part;
				["273"]: Part;
				["491"]: Part;
				["391"]: Part;
				["291"]: Part;
				["191"]: Part;
				["162"]: Part;
				["462"]: Part;
				["362"]: Part;
				["262"]: Part;
				["183"]: Part;
				["283"]: Part;
				["383"]: Part;
				["483"]: Part;
				["534"]: Part;
				["480"]: Part;
				["380"]: Part;
				["280"]: Part;
				["180"]: Part;
				["456"]: Part;
				["172"]: Part;
				["256"]: Part;
				["156"]: Part;
				["472"]: Part;
				["272"]: Part;
				["372"]: Part;
				["357"]: Part;
				["457"]: Part;
				["157"]: Part;
				["257"]: Part;
				["353"]: Part;
				["253"]: Part;
				["553"]: Part;
				["453"]: Part;
				["366"]: Part;
				["466"]: Part;
				["142"]: Part;
				["266"]: Part;
				["342"]: Part;
				["242"]: Part;
				["542"]: Part;
				["442"]: Part;
				["467"]: Part;
				["367"]: Part;
				["267"]: Part;
				["167"]: Part;
				["463"]: Part;
				["263"]: Part;
				["363"]: Part;
				["254"]: Part;
				["154"]: Part;
				["454"]: Part;
				["354"]: Part;
				["555"]: Part;
				["155"]: Part;
				["255"]: Part;
				["355"]: Part;
				["455"]: Part;
				["164"]: Part;
				["264"]: Part;
				["364"]: Part;
				["464"]: Part;
				["265"]: Part;
				["165"]: Part;
				["465"]: Part;
				["365"]: Part;
				["544"]: Part;
				["118"]: Part;
				["218"]: Part;
				["234"]: Part;
				["134"]: Part;
				["535"]: Part;
				["335"]: Part;
				["435"]: Part;
				["135"]: Part;
				["235"]: Part;
				["554"]: Part;
				["344"]: Part;
				["444"]: Part;
				["144"]: Part;
				["244"]: Part;
				["509"]: Part;
				["545"]: Part;
				["445"]: Part;
				["209"]: Part;
				["309"]: Part;
				["145"]: Part;
				["508"]: Part;
				["194"]: Part;
				["394"]: Part;
				["294"]: Part;
				["494"]: Part;
				["219"]: Part;
				["119"]: Part;
				["419"]: Part;
				["195"]: Part;
				["295"]: Part;
				["395"]: Part;
				["495"]: Part;
				["518"]: Part;
				["208"]: Part;
				["108"]: Part;
				["408"]: Part;
				["308"]: Part;
				["174"]: Part;
				["474"]: Part;
				["374"]: Part;
				["274"]: Part;
				["175"]: Part;
				["475"]: Part;
				["275"]: Part;
				["375"]: Part;
				["184"]: Part;
				["484"]: Part;
				["284"]: Part;
				["384"]: Part;
				["185"]: Part;
				["485"]: Part;
				["385"]: Part;
				["285"]: Part;
				["53"]: Part;
				["43"]: Part;
				["73"]: Part;
				["63"]: Part;
				["93"]: Part;
				["83"]: Part;
				["159"]: Part;
				["359"]: Part;
				["259"]: Part;
				["459"]: Part;
				["238"]: Part;
				["338"]: Part;
				["138"]: Part;
				["13"]: Part;
				["438"]: Part;
				["538"]: Part;
				["42"]: Part;
				["52"]: Part;
				["62"]: Part;
				["72"]: Part;
				["82"]: Part;
				["92"]: Part;
				["229"]: Part;
				["329"]: Part;
				["129"]: Part;
				["429"]: Part;
				["529"]: Part;
				["148"]: Part;
				["348"]: Part;
				["248"]: Part;
				["548"]: Part;
				["448"]: Part;
				["22"]: Part;
				["32"]: Part;
				["339"]: Part;
				["239"]: Part;
				["139"]: Part;
				["539"]: Part;
				["439"]: Part;
				["398"]: Part;
				["498"]: Part;
				["198"]: Part;
				["298"]: Part;
				["389"]: Part;
				["489"]: Part;
				["189"]: Part;
				["289"]: Part;
				["328"]: Part;
				["228"]: Part;
				["128"]: Part;
				["528"]: Part;
				["428"]: Part;
				["87"]: Part;
				["77"]: Part;
				["97"]: Part;
				["47"]: Part;
				["37"]: Part;
				["67"]: Part;
				["57"]: Part;
				["499"]: Part;
				["115"]: Part;
				["215"]: Part;
				["315"]: Part;
				["415"]: Part;
				["515"]: Part;
				["299"]: Part;
				["199"]: Part;
				["114"]: Part;
				["27"]: Part;
				["17"]: Part;
				["178"]: Part;
				["278"]: Part;
				["76"]: Part;
				["86"]: Part;
				["96"]: Part;
				["207"]: Part;
				["36"]: Part;
				["46"]: Part;
				["56"]: Part;
				["66"]: Part;
				["106"]: Part;
				["206"]: Part;
				["306"]: Part;
				["406"]: Part;
				["506"]: Part;
				["125"]: Part;
				["325"]: Part;
				["225"]: Part;
				["169"]: Part;
				["269"]: Part;
				["488"]: Part;
				["124"]: Part;
				["224"]: Part;
				["26"]: Part;
				["424"]: Part;
				["524"]: Part;
				["288"]: Part;
				["188"]: Part;
				["71"]: Part;
				["61"]: Part;
				["51"]: Part;
				["41"]: Part;
				["91"]: Part;
				["81"]: Part;
				["479"]: Part;
				["379"]: Part;
				["279"]: Part;
				["179"]: Part;
				["31"]: Part;
				["21"]: Part;
				["11"]: Part;
				["60"]: Part;
				["70"]: Part;
				["40"]: Part;
				["50"]: Part;
				["80"]: Part;
				["90"]: Part;
				["305"]: Part;
				["205"]: Part;
				["105"]: Part;
				["505"]: Part;
				["405"]: Part;
				["204"]: Part;
				["304"]: Part;
				["468"]: Part;
				["104"]: Part;
				["20"]: Part;
				["168"]: Part;
				["404"]: Part;
				["10"]: Part;
				["533"]: Part;
				["433"]: Part;
				["333"]: Part;
				["252"]: Part;
				["352"]: Part;
				["452"]: Part;
				["552"]: Part;
				["233"]: Part;
				["450"]: Part;
				["330"]: Part;
				["430"]: Part;
				["530"]: Part;
				["549"]: Part;
				["469"]: Part;
				["214"]: Part;
				["130"]: Part;
				["230"]: Part;
				["117"]: Part;
				["223"]: Part;
				["477"]: Part;
				["478"]: Part;
				["486"]: Part;
				["425"]: Part;
				["268"]: Part;
				["260"]: Part;
				["502"]: Part;
				["522"]: Part;
				["422"]: Part;
				["143"]: Part;
				["243"]: Part;
				["122"]: Part;
				["443"]: Part;
				["543"]: Part;
				["321"]: Part;
				["421"]: Part;
				["521"]: Part;
				["504"]: Part;
				["369"]: Part;
				["507"]: Part;
				["121"]: Part;
				["221"]: Part;
				["510"]: Part;
				["451"]: Part;
				["33"]: Part;
				["23"]: Part;
				["513"]: Part;
				["514"]: Part;
				["319"]: Part;
				["517"]: Part;
				["413"]: Part;
				["313"]: Part;
				["85"]: Part;
				["75"]: Part;
				["65"]: Part;
				["55"]: Part;
				["45"]: Part;
				["35"]: Part;
				["316"]: Part;
				["216"]: Part;
				["116"]: Part;
				["432"]: Part;
				["132"]: Part;
				["232"]: Part;
				["516"]: Part;
				["416"]: Part;
				["431"]: Part;
				["331"]: Part;
				["519"]: Part;
				["531"]: Part;
				["327"]: Part;
				["12"]: Part;
				["231"]: Part;
				["131"]: Part;
				["25"]: Part;
				["15"]: Part;
				["310"]: Part;
				["410"]: Part;
				["110"]: Part;
				["210"]: Part;
				["523"]: Part;
				["526"]: Part;
				["94"]: Part;
				["227"]: Part;
				["127"]: Part;
				["84"]: Part;
				["54"]: Part;
				["64"]: Part;
				["34"]: Part;
				["427"]: Part;
				["226"]: Part;
				["302"]: Part;
				["525"]: Part;
				["126"]: Part;
				["527"]: Part;
				["193"]: Part;
				["426"]: Part;
				["102"]: Part;
				["501"]: Part;
				["390"]: Part;
				["301"]: Part;
				["401"]: Part;
				["101"]: Part;
				["201"]: Part;
				["3"]: Part;
				["2"]: Part;
				["14"]: Part;
				["24"]: Part;
				["532"]: Part;
				["520"]: Part;
				["166"]: Part;
				["368"]: Part;
				["220"]: Part;
				["120"]: Part;
				["213"]: Part;
				["200"]: Part;
				["176"]: Part;
				["417"]: Part;
				["376"]: Part;
				["276"]: Part;
				["270"]: Part;
				["476"]: Part;
				["312"]: Part;
				["412"]: Part;
				["512"]: Part;
				["177"]: Part;
				["277"]: Part;
				["377"]: Part;
				["112"]: Part;
				["212"]: Part;
				["222"]: Part;
				["511"]: Part;
				["411"]: Part;
				["311"]: Part;
				["211"]: Part;
				["111"]: Part;
				["470"]: Part;
				["399"]: Part;
				["324"]: Part;
				["323"]: Part;
				["322"]: Part;
				["320"]: Part;
				["314"]: Part;
				["414"]: Part;
				["318"]: Part;
				["317"]: Part;
				["303"]: Part;
				["403"]: Part;
				["503"]: Part;
				["186"]: Part;
				["286"]: Part;
				["386"]: Part;
				["103"]: Part;
				["203"]: Part;
				["107"]: Part;
				["307"]: Part;
				["187"]: Part;
				["407"]: Part;
				["387"]: Part;
				["287"]: Part;
				["202"]: Part;
				["487"]: Part;
				["388"]: Part;
				["16"]: Part;
				["420"]: Part;
				["153"]: Part;
				["326"]: Part;
				["245"]: Part;
				["249"]: Part;
				["334"]: Part;
				["163"]: Part;
				["500"]: Part;
				["400"]: Part;
				["300"]: Part;
				["261"]: Part;
				["100"]: Part;
				["461"]: Part;
				["371"]: Part;
				["370"]: Part;
				["30"]: Part;
				["152"]: Part;
				["133"]: Part;
				["361"]: Part;
				["360"]: Part;
				["378"]: Part;
				["356"]: Part;
				["59"]: Part;
				["49"]: Part;
				["39"]: Part;
				["29"]: Part;
				["99"]: Part;
				["89"]: Part;
				["79"]: Part;
				["69"]: Part;
				["343"]: Part;
				["150"]: Part;
				["332"]: Part;
				["345"]: Part;
				["19"]: Part;
				["550"]: Part;
				["250"]: Part;
				["350"]: Part;
				["217"]: Part;
				["158"]: Part;
				["258"]: Part;
				["358"]: Part;
				["458"]: Part;
				["271"]: Part;
				["95"]: Part;
				["471"]: Part;
				["113"]: Part;
				["434"]: Part;
				["418"]: Part;
				["74"]: Part;
				["423"]: Part;
				["123"]: Part;
				["44"]: Part;
				["402"]: Part;
				["48"]: Part;
				["58"]: Part;
				["28"]: Part;
				["38"]: Part;
				["88"]: Part;
				["98"]: Part;
				["68"]: Part;
				["78"]: Part;
				["109"]: Part;
				["149"]: Part;
				["160"]: Part;
				["349"]: Part;
				["449"]: Part;
				["18"]: Part;
				["409"]: Part;
				["460"]: Part;
				["170"]: Part;
				["141"]: Part;
				["171"]: Part;
				["161"]: Part;
				["441"]: Part;
				["541"]: Part;
				["241"]: Part;
				["341"]: Part;
			};
			Parts: Model;
		};
	};
	["Rainbow Super Carpet"]: Part & {
		Part: Part & {
			BillboardGui: BillboardGui & {
				ImageLabel: ImageLabel & {
					Script: Script;
				};
			};
		};
		RainbowMagicCarpetSonic: Model & {
			Mesh: Part & {
				Mesh: SpecialMesh;
				PointLight: PointLight;
			};
		};
		ProximityPrompt: ProximityPrompt;
	};
	Accessory: Accessory & {
		Model: Model & {
			["Meshes/Bones_SM_Env_Bone_Skull_01"]: MeshPart & {
				PointLight: PointLight;
			};
			["Meshes/Bones_SM_Env_Bone_Skull_Jaw_01"]: MeshPart;
		};
	};
	["Temple Scene"]: Model;
	PartStorage: Folder & {
		["Jelly Dumpling"]: Folder;
		["Imperial Dumpling"]: Folder;
		["Mint Dumpling"]: Folder;
		["Cream Dumpling"]: Folder;
		["Emperor Dumpling"]: Folder;
	};
	["Super Glider"]: Part & {
		Part: Part & {
			BillboardGui: BillboardGui & {
				ImageLabel: ImageLabel & {
					Script: Script;
				};
			};
		};
		ProximityPrompt: ProximityPrompt;
		SuperGlider: Model & {
			Mesh: Part & {
				Mesh: SpecialMesh;
				PointLight: PointLight;
			};
		};
	};
	["Forbidden Dragon"]: Part & {
		Part: Part & {
			BillboardGui: BillboardGui & {
				ImageLabel: ImageLabel & {
					Script: Script;
				};
			};
		};
		ProximityPrompt: ProximityPrompt;
	};
	Leaderboard: Model & {
		Leaderboard: Model & {
			Interface: Part & {
				SurfaceGui: SurfaceGui & {
					TopBar: Frame & {
						UICorner: UICorner;
						Values: Frame & {
							Title: TextLabel & {
								Title: TextLabel;
							};
							Line: Frame & {
								Line: Frame;
							};
						};
						DropShadow: ImageLabel;
					};
					Sample: ImageLabel & {
						Frame: Frame & {
							UICorner: UICorner;
							UIStroke: UIStroke;
							Values: Frame & {
								Value: TextLabel;
								Number: TextLabel;
								Username: TextLabel;
							};
							PlayerImage: ImageLabel;
						};
					};
					List: Frame & {
						Titles: Frame & {
							Username: TextLabel;
							Value: TextLabel;
						};
						Items: ScrollingFrame & {
							UIListLayout: UIListLayout;
							UIPadding: UIPadding;
						};
						UICorner: UICorner;
					};
				};
			};
			Frame: Model & {
				Part: Part;
			};
		};
		Model: Model;
	};
	["Imperial Wings"]: Part & {
		Part: Part & {
			Weld: Weld;
			BillboardGui: BillboardGui & {
				ImageLabel: ImageLabel & {
					Script: Script;
				};
			};
		};
		ProximityPrompt: ProximityPrompt;
		Weld: Weld;
		ImperialWings: Model & {
			Mesh: Part & {
				Mesh: SpecialMesh;
				PointLight: PointLight;
			};
		};
	};
	Crate1: Model & {
		Middle: Part;
		Union: UnionOperation;
	};
	Camera: Camera;
	["Ungrouped Parts"]: Folder & {
		["Environment (some functional stuff might be in here idk)"]: Folder & {
			["Temple Island"]: Model;
			Crate3: Model;
			Crate2: Model;
			["Temple Path"]: Model;
			Crate1: Model;
			["Interior Temple Paths"]: Model;
			Crate4: Model & {
				MeshPart: MeshPart;
			};
			Temple: Model & {
				["Shrine Light"]: Model & {
					Wedge: WedgePart & {
						Mesh: CylinderMesh;
						SpotLight: SpotLight;
					};
					Union: UnionOperation;
				};
			};
		};
	};
	["Fire Trail"]: Model & {
		Sign: Model & {
			Configuration: Configuration & {
				Color: BrickColorValue;
				Text: StringValue;
			};
			Board: Part & {
				Face: BillboardGui & {
					Contents: TextLabel;
				};
			};
		};
		["Elite Effect"]: Model & {
			Primary: Part;
		};
		Open: Model & {
			Part: Part;
			TouchPart: Part & {
				Weld: Weld;
			};
			Hologram: UnionOperation;
		};
		Mesh: Part & {
			Embers: ParticleEmitter;
			FireCore: ParticleEmitter;
			Fire: ParticleEmitter;
			PointLight: PointLight;
			Glow: ParticleEmitter;
		};
	};
	Palette: Folder & {
		Handle: Part & {
			Mesh: SpecialMesh;
		};
		dumplings: Folder & {
			Vegetable: MeshPart;
			Jelly: MeshPart;
			Chocolate: MeshPart;
			Cinnamon: MeshPart;
			Mint: MeshPart;
			Dumpling: MeshPart;
			["Cool Mint"]: MeshPart;
			["Rose Crested"]: MeshPart;
			Plum: MeshPart;
			Velvet: MeshPart;
			["Chocolate Spread"]: MeshPart;
			Peppered: MeshPart;
			Imperial: MeshPart;
			["Color Creamed"]: MeshPart;
			["Chili Pepper"]: MeshPart;
			["Layered Velvet"]: MeshPart;
			["Emperor Sugar"]: MeshPart;
			["Rose Scent"]: MeshPart;
			["King Sugar"]: MeshPart;
			Sugar: MeshPart;
			Strawberry: MeshPart;
			["Sugar Vegetable"]: MeshPart;
			Cream: MeshPart;
			["Sugar Cream"]: MeshPart;
			Pineapple: MeshPart;
		};
	};
	respawnBrick: Model;
	Baseplate: Part & {
		Texture: Texture;
	};
}
