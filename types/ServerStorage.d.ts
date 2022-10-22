interface ServerStorage extends Instance {
	TagList: Folder & {
		Leaderboard: Configuration;
		Lot: Configuration;
		FishDropper: Configuration;
		RebirthButton: Configuration;
		Dropper: Configuration;
		GamepassPrompt: Configuration;
		RespawnPlayer: Configuration;
		ConveyorBelt: Configuration;
		PurchaseButton: Configuration;
	};
	Gamepasses: Folder & {
		SpeedCoil: Tool & {
			Handle: Part & {
				Attachment0: Attachment;
				BodyForce: BodyForce;
				Coil: SpringConstraint;
				CoilSound: Sound;
				Attachment1: Attachment;
			};
			ThumbnailPart: Part & {
				Decal: Decal;
			};
			CoilScript: Script;
		};
		Cloud: Tool & {
			LeftTurn: Animation;
			Script: Script;
			LocalScript: LocalScript;
			R15RightTurn: Animation;
			R15CoastingPose: Animation;
			Handle: Part & {
				Smoke: Smoke;
				Wind: Sound;
				RightGripAttachment: Attachment;
				Mesh: SpecialMesh;
			};
			CoastingPose: Animation;
			R15LeftTurn: Animation;
			RightTurn: Animation;
		};
	};
	RebirthItems: Folder & {
		Glider: Tool & {
			R15Fly: Animation;
			Hold: Animation;
			Script: Script;
			Handle: Part & {
				Decal: Decal;
				RightGripAttachment: Attachment;
				Mesh: SpecialMesh;
			};
			LocalScript: LocalScript;
			Fly: Animation;
			DisplayModel: Model;
		};
		ImperialWings: Tool & {
			Script: Script;
			LocalScript: LocalScript;
			Handle: Part & {
				Mesh: SpecialMesh;
				Wind: Sound;
			};
			Pose: Animation;
			DisplayModel: Model;
		};
		RainbowMagicCarpetSonic: Tool & {
			CarpetPart: Part & {
				Tassels: Folder & {
					BackRightSphere: SphereHandleAdornment & {
						WeldConstraint: WeldConstraint;
						RotationPart: Part & {
							Tassle: ConeHandleAdornment;
						};
					};
					BackLeftSphere: SphereHandleAdornment & {
						WeldConstraint: WeldConstraint;
						RotationPart: Part & {
							Tassle: ConeHandleAdornment;
						};
					};
					FrontRightSphere: SphereHandleAdornment & {
						WeldConstraint: WeldConstraint;
						RotationPart: Part & {
							Tassle: ConeHandleAdornment;
						};
					};
					FrontLeftSphere: SphereHandleAdornment & {
						WeldConstraint: WeldConstraint;
						RotationPart: Part & {
							Tassle: ConeHandleAdornment;
						};
					};
				};
				CarpetBack: Attachment;
				CarpetFront: Attachment;
				SonicBoomPart: Part & {
					SonicBoomEffect: CylinderHandleAdornment;
					WeldConstraint: WeldConstraint;
				};
				Trail: Trail;
				TrailLeft: Attachment;
				CarpetVisual: Beam & {
					FlappingAnimation: Script;
				};
				TrailRight: Attachment;
				Sparkles: ParticleEmitter;
				Burst: Fire;
				RootPartOffset: Attachment;
			};
			Ignore: Folder & {
				Mannequin: Model & {
					LeftLowerArm: MeshPart & {
						LeftElbowRigAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
						LeftElbow: Motor6D;
						OriginalSize: Vector3Value;
						LeftWristRigAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
					};
					LeftFoot: MeshPart & {
						OriginalSize: Vector3Value;
						LeftAnkleRigAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
						LeftAnkle: Motor6D;
					};
					RightHand: MeshPart & {
						RightWristRigAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
						RightWrist: Motor6D;
						RightGripAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
						OriginalSize: Vector3Value;
					};
					HumanoidRootPart: Part & {
						RootRigAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
						OriginalSize: Vector3Value;
					};
					RightLowerLeg: MeshPart & {
						RightKneeRigAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
						RightAnkleRigAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
						RightKnee: Motor6D;
						OriginalSize: Vector3Value;
					};
					LeftUpperLeg: MeshPart & {
						OriginalSize: Vector3Value;
						LeftHip: Motor6D;
						LeftHipRigAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
						LeftKneeRigAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
					};
					LeftLowerLeg: MeshPart & {
						OriginalSize: Vector3Value;
						LeftKnee: Motor6D;
						LeftAnkleRigAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
						LeftKneeRigAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
					};
					LowerTorso: MeshPart & {
						WaistCenterAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
						LeftHipRigAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
						Root: Motor6D;
						RootRigAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
						RightHipRigAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
						OriginalSize: Vector3Value;
						WaistRigAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
						WaistBackAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
						WaistFrontAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
					};
					Head: Part & {
						HatAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
						OriginalSize: Vector3Value;
						NeckRigAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
						FaceFrontAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
						HairAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
						Neck: Motor6D;
						Mesh: SpecialMesh;
						FaceCenterAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
					};
					UpperTorso: MeshPart & {
						RightCollarAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
						BodyBackAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
						NeckRigAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
						LeftCollarAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
						OriginalSize: Vector3Value;
						Waist: Motor6D;
						RightShoulderRigAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
						BodyFrontAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
						WaistRigAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
						LeftShoulderRigAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
						NeckAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
					};
					LeftUpperArm: MeshPart & {
						LeftShoulderRigAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
						LeftShoulder: Motor6D;
						LeftShoulderAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
						LeftElbowRigAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
						OriginalSize: Vector3Value;
					};
					RightLowerArm: MeshPart & {
						RightWristRigAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
						OriginalSize: Vector3Value;
						RightElbow: Motor6D;
						RightElbowRigAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
					};
					LeftHand: MeshPart & {
						LeftWrist: Motor6D;
						LeftGripAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
						OriginalSize: Vector3Value;
						LeftWristRigAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
					};
					Humanoid: Humanoid & {
						Animator: Animator;
					};
					RightUpperArm: MeshPart & {
						OriginalSize: Vector3Value;
						RightElbowRigAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
						RightShoulderRigAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
						RightShoulderAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
						RightShoulder: Motor6D;
					};
					RightUpperLeg: MeshPart & {
						RightKneeRigAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
						OriginalSize: Vector3Value;
						RightHip: Motor6D;
						RightHipRigAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
					};
					RightFoot: MeshPart & {
						RightAnkleRigAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
						RightAnkle: Motor6D;
						OriginalSize: Vector3Value;
					};
				};
				ThumbnailPart: Part & {
					Decal: Decal;
				};
			};
			Triggered: RemoteEvent;
			Client: LocalScript & {
				BodyVelocity: BodyVelocity;
				LockCharacterControls: ModuleScript;
				CameraShake: ModuleScript & {
					CameraShaker: ModuleScript & {
						CameraShakeInstance: ModuleScript;
						CameraShakePresets: ModuleScript;
					};
				};
				BodyPosition: BodyPosition;
				BodyGyro: BodyGyro;
			};
			CircularProgress: BillboardGui & {
				Progress: Frame & {
					Frame1: Frame & {
						ImageLabel: ImageLabel & {
							UIGradient: UIGradient;
						};
					};
					Frame2: Frame & {
						ImageLabel: ImageLabel & {
							UIGradient: UIGradient;
						};
					};
					Percentage: NumberValue & {
						ProgressScript: LocalScript & {
							StarterPoint: StringValue;
							Direction: StringValue;
							ColorOfPercentPart: Color3Value;
							ImageTrans: NumberValue;
							ImageId: StringValue;
							ColorOfMissingPart: Color3Value;
							ImageColor: Color3Value;
							TransOfPercentPart: NumberValue;
							TransOfMissingPart: NumberValue;
							MissingPartType: StringValue;
						};
					};
				};
			};
			Server: Script;
		};
		SuperGlider: Tool & {
			R15Fly: Animation;
			Hold: Animation;
			Script: Script;
			Handle: Part & {
				Decal: Decal;
				RightGripAttachment: Attachment;
				Mesh: SpecialMesh;
			};
			LocalScript: LocalScript;
			Fly: Animation;
			DisplayModel: Model;
		};
	};
	SaveInStudio: BoolValue;
	PartInfo: Folder & {
		["Pineapple Dumpling"]: MeshPart;
		Crate_ScentedGoldCaged: UnionOperation & {
			Blossom: ParticleEmitter;
			MeshPart: MeshPart;
		};
		["Cream Dumpling"]: MeshPart;
		Crate: Model & {
			Net: MeshPart & {
				Motor6D: Motor6D;
			};
			Union: UnionOperation & {
				Motor6D: Motor6D;
			};
			Crate: Part & {
				Bubble: ParticleEmitter;
				Bolts: ParticleEmitter;
				Blossom: ParticleEmitter;
			};
		};
		["Vegetable Dumpling"]: MeshPart;
		["Sugar Cream Dumpling"]: MeshPart;
		["Emperor Sugar Dumpling"]: MeshPart;
		["Color Creamed Dumpling"]: MeshPart;
		["Salmon Rice Cake"]: MeshPart;
		["Chocolate Spread Dumpling"]: MeshPart;
		["Seaweed Rice Cake"]: MeshPart;
		Dumpling: MeshPart;
		["Chili Pepper Dumpling"]: MeshPart;
		["Velvet Dumpling"]: MeshPart;
		["Chocolate Dumpling"]: MeshPart;
		Cabbage: MeshPart;
		["Cinnamon Dumpling"]: MeshPart;
		["Plum Dumpling"]: MeshPart;
		Crate_Scented: UnionOperation & {
			Blossom: ParticleEmitter;
		};
		["Peppered Dumpling"]: MeshPart;
		["Blue Squid"]: Part & {
			Mesh: SpecialMesh;
		};
		["Imperial Dumpling"]: MeshPart;
		["Sugar Dumpling"]: MeshPart;
		["Strawberry Dumpling"]: MeshPart;
		["Jelly Dumpling"]: MeshPart;
		["Blue Octopus"]: MeshPart & {
			HatAttachment: Attachment;
			OriginalSize: Vector3Value;
			AvatarPartScaleType: StringValue;
		};
		["Layered Velvet Dumpling"]: MeshPart;
		["Mint Dumpling"]: MeshPart;
		["Robux Drop"]: Part & {
			Mesh: SpecialMesh;
		};
		Crate_Gold: UnionOperation;
		["Filleted Salmon"]: UnionOperation;
		Crate_ScentedGold: UnionOperation & {
			Blossom: ParticleEmitter;
		};
		Crab: Part & {
			Mesh: SpecialMesh;
		};
		["King Sugar Dumpling"]: MeshPart;
		Lobster: Part & {
			Mesh: SpecialMesh;
		};
		["Sugar Vegetable Dumpling"]: MeshPart;
		["Rose Crested Dumpling"]: MeshPart;
		["Cool Mint Dumpling"]: MeshPart;
		["Spring Onion"]: UnionOperation;
		["Rose Scent Dumpling"]: MeshPart;
	};
}
