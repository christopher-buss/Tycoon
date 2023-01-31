interface Workspace extends Model {
	["Instant Rebirth"]: Model & {
		Root: MeshPart & {
			ParticleEmitter: ParticleEmitter;
		};
	};
	Lots: Folder & {
		Lot1: Folder & {
			Objects: Folder & {
				["Pet Food"]: Model & {
					["Pet Food"]: Model & {
						Part: Part;
						Union: UnionOperation;
					};
				};
				["Conveyor Belt2"]: Model;
				Brush: Model;
				Lizard: Model & {
					[""]: Model & {
						Humanoid: Humanoid;
						Leg4: MeshPart & {
							Joint: Motor6D;
						};
						Head: MeshPart & {
							Hearts: ParticleEmitter;
							Joint: Motor6D;
						};
						Leg1: MeshPart & {
							Joint: Motor6D;
						};
						Face: Part & {
							FaceDecal: Decal;
							Joint: Motor6D;
						};
						HumanoidRootPart: Part;
						Leg3: MeshPart & {
							Joint: Motor6D;
						};
						UpperWing: MeshPart & {
							Joint: Motor6D;
						};
						Leg2: MeshPart & {
							Joint: Motor6D;
						};
					};
				};
				["Pet Treats"]: Model & {
					["Pet Treats"]: Model;
				};
				["Pet Bath2"]: Model & {
					Bubbles: Part & {
						Bubbles: ParticleEmitter;
					};
					Model: Model;
				};
				["Beauty Desk1"]: Model;
				["Magic Unicorn"]: Model & {
					[""]: Model & {
						LeftWing: MeshPart & {
							Joint: Motor6D;
						};
						Leg4: MeshPart & {
							Joint: Motor6D;
						};
						Head: MeshPart & {
							Hearts: ParticleEmitter;
							Joint: Motor6D;
						};
						Leg1: MeshPart & {
							Joint: Motor6D;
						};
						Face: Part & {
							FaceDecal: Decal;
							Joint: Motor6D;
						};
						HumanoidRootPart: Part;
						Leg3: MeshPart & {
							Joint: Motor6D;
						};
						Humanoid: Humanoid;
						Horn: MeshPart & {
							Joint: Motor6D;
						};
						RightWing: MeshPart & {
							Joint: Motor6D;
						};
						UpperWing: MeshPart & {
							Joint: Motor6D;
						};
						Leg2: MeshPart & {
							Joint: Motor6D;
						};
					};
					Model: Model;
				};
				Lipstick: Model;
				["Cleansing Sink1"]: Model & {
					MeshPart: MeshPart;
				};
				["Basic Upgrader2"]: Model & {
					MeshPart: MeshPart;
					Model: Model;
				};
				Shampoo: Model;
				Comb: Model & {
					MeshPart: MeshPart;
				};
				["Pet Salon"]: Model & {
					Claim: Part & {
						Claimed: SurfaceGui & {
							IconBox: Frame & {
								PlayerIcon: ImageLabel;
							};
							TextBox: Frame & {
								Username: TextLabel;
								TextLabel: TextLabel;
							};
						};
						Unclaimed: SurfaceGui & {
							Label1: TextLabel;
							Label2: TextLabel;
						};
					};
					Teleporter: Model & {
						Portal1: Part;
						Portal2: Part;
					};
				};
				["Cleansing Sink4"]: Model & {
					MeshPart: MeshPart;
				};
				Water: Model & {
					Water: Model & {
						Part: Part;
						Union: UnionOperation;
					};
				};
				["Pet Bath4"]: Model & {
					Bubbles: Part & {
						Bubbles: ParticleEmitter;
					};
					Model: Model;
				};
				Seating1: Model;
				Customer2: Model & {
					Humanoid: Humanoid;
					LeftFoot: MeshPart & {
						LeftAnkleRigAttachment: Attachment;
						OriginalSize: Vector3Value;
						LeftAnkle: Motor6D;
					};
					RightHand: MeshPart & {
						RightWristRigAttachment: Attachment;
						RightWrist: Motor6D;
						RightGripAttachment: Attachment;
					};
					HumanoidRootPart: Part & {
						RootRigAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
					};
					RightLowerLeg: MeshPart & {
						RightKneeRigAttachment: Attachment;
						RightAnkleRigAttachment: Attachment;
						RightKnee: Motor6D;
					};
					RightFoot: MeshPart & {
						RightAnkle: Motor6D;
						RightAnkleRigAttachment: Attachment;
					};
					LeftLowerLeg: MeshPart & {
						OriginalSize: Vector3Value;
						LeftKnee: Motor6D;
						LeftAnkleRigAttachment: Attachment;
						LeftKneeRigAttachment: Attachment;
					};
					RightUpperArm: MeshPart & {
						RightShoulder: Motor6D;
						RightShoulderRigAttachment: Attachment;
						RightShoulderAttachment: Attachment;
						RightElbowRigAttachment: Attachment;
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
						face: Decal;
						HairAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
						Neck: Motor6D;
						Mesh: SpecialMesh & {
							OriginalSize: Vector3Value;
						};
						FaceCenterAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
					};
					UpperTorso: MeshPart & {
						LeftShoulderRigAttachment: Attachment;
						BodyBackAttachment: Attachment;
						NeckRigAttachment: Attachment;
						RightShoulderRigAttachment: Attachment;
						Waist: Motor6D;
						RightCollarAttachment: Attachment;
						BodyFrontAttachment: Attachment;
						WaistRigAttachment: Attachment;
						LeftCollarAttachment: Attachment;
						NeckAttachment: Attachment;
					};
					LeftUpperArm: MeshPart & {
						LeftElbowRigAttachment: Attachment;
						LeftShoulderRigAttachment: Attachment;
						LeftShoulder: Motor6D;
						LeftShoulderAttachment: Attachment;
					};
					RightLowerArm: MeshPart & {
						RightWristRigAttachment: Attachment;
						RightElbow: Motor6D;
						RightElbowRigAttachment: Attachment;
					};
					LeftHand: MeshPart & {
						LeftWrist: Motor6D;
						LeftGripAttachment: Attachment;
						LeftWristRigAttachment: Attachment;
					};
					LeftUpperLeg: MeshPart & {
						LeftHip: Motor6D;
						OriginalSize: Vector3Value;
						LeftHipRigAttachment: Attachment;
						LeftKneeRigAttachment: Attachment;
					};
					LeftLowerArm: MeshPart & {
						LeftElbowRigAttachment: Attachment;
						LeftElbow: Motor6D;
						LeftWristRigAttachment: Attachment;
					};
					RightUpperLeg: MeshPart & {
						RightKneeRigAttachment: Attachment;
						RightHip: Motor6D;
						RightHipRigAttachment: Attachment;
					};
					LowerTorso: MeshPart & {
						WaistRigAttachment: Attachment;
						WaistCenterAttachment: Attachment;
						LeftHipRigAttachment: Attachment;
						RightHipRigAttachment: Attachment;
						Root: Motor6D;
						WaistBackAttachment: Attachment;
						RootRigAttachment: Attachment;
						WaistFrontAttachment: Attachment;
					};
				};
				["Basic Upgrader1"]: Model & {
					MeshPart: MeshPart;
					Model: Model;
				};
				Perfume: Model;
				["Deluxe Upgrader3"]: Model & {
					MeshPart: MeshPart;
					Model: Model;
				};
				Roof: Model;
				["Deluxe Upgrader1"]: Model & {
					MeshPart: MeshPart;
					Model: Model;
				};
				["Basic Upgrader3"]: Model & {
					MeshPart: MeshPart;
					Model: Model;
				};
				Mirror: Model & {
					Part: Part;
				};
				["Beauty Desk3"]: Model;
				Frog: Model & {
					[""]: Model & {
						RightEye1: MeshPart & {
							Joint: Motor6D;
						};
						Humanoid: Humanoid;
						RightEye3: MeshPart & {
							Joint: Motor6D;
						};
						Head: MeshPart & {
							Joint: Motor6D;
							Hearts: ParticleEmitter;
						};
						Leg1: MeshPart & {
							Joint: Motor6D;
						};
						Face: Part & {
							Joint: Motor6D;
							FaceDecal: Decal;
						};
						HumanoidRootPart: Part;
						LeftEye3: MeshPart & {
							Joint: Motor6D;
						};
						Leg3: MeshPart & {
							Joint: Motor6D;
						};
						LeftEye2: MeshPart & {
							Joint: Motor6D;
						};
						LeftEye1: MeshPart & {
							Joint: Motor6D;
						};
						Leg4: MeshPart & {
							Joint: Motor6D;
						};
						RightEye2: MeshPart & {
							Joint: Motor6D;
						};
						Leg2: MeshPart & {
							Joint: Motor6D;
						};
					};
				};
				["Rainbow Upgrader1"]: Model & {
					MeshPart: MeshPart;
					Model: Model;
				};
				["Pet Bath3"]: Model & {
					Bubbles: Part & {
						Bubbles: ParticleEmitter;
					};
					Model: Model;
				};
				["Pet House"]: Model;
				Eyeliner: Model;
				Seating5: Model;
				Customer3: Model & {
					Humanoid: Humanoid;
					LeftFoot: MeshPart & {
						LeftAnkleRigAttachment: Attachment;
						OriginalSize: Vector3Value;
						LeftAnkle: Motor6D;
					};
					RightHand: MeshPart & {
						RightWristRigAttachment: Attachment;
						RightWrist: Motor6D;
						RightGripAttachment: Attachment;
					};
					HumanoidRootPart: Part & {
						RootRigAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
					};
					RightLowerLeg: MeshPart & {
						RightKneeRigAttachment: Attachment;
						RightAnkleRigAttachment: Attachment;
						RightKnee: Motor6D;
					};
					RightFoot: MeshPart & {
						RightAnkle: Motor6D;
						RightAnkleRigAttachment: Attachment;
					};
					LeftLowerLeg: MeshPart & {
						OriginalSize: Vector3Value;
						LeftKnee: Motor6D;
						LeftAnkleRigAttachment: Attachment;
						LeftKneeRigAttachment: Attachment;
					};
					RightUpperArm: MeshPart & {
						RightShoulder: Motor6D;
						RightShoulderRigAttachment: Attachment;
						RightShoulderAttachment: Attachment;
						RightElbowRigAttachment: Attachment;
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
						face: Decal;
						HairAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
						Neck: Motor6D;
						Mesh: SpecialMesh & {
							OriginalSize: Vector3Value;
						};
						FaceCenterAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
					};
					UpperTorso: MeshPart & {
						LeftShoulderRigAttachment: Attachment;
						BodyBackAttachment: Attachment;
						NeckRigAttachment: Attachment;
						RightShoulderRigAttachment: Attachment;
						Waist: Motor6D;
						RightCollarAttachment: Attachment;
						BodyFrontAttachment: Attachment;
						WaistRigAttachment: Attachment;
						LeftCollarAttachment: Attachment;
						NeckAttachment: Attachment;
					};
					LeftUpperArm: MeshPart & {
						LeftElbowRigAttachment: Attachment;
						LeftShoulderRigAttachment: Attachment;
						LeftShoulder: Motor6D;
						LeftShoulderAttachment: Attachment;
					};
					RightLowerArm: MeshPart & {
						RightWristRigAttachment: Attachment;
						RightElbow: Motor6D;
						RightElbowRigAttachment: Attachment;
					};
					LeftHand: MeshPart & {
						LeftWrist: Motor6D;
						LeftGripAttachment: Attachment;
						LeftWristRigAttachment: Attachment;
					};
					LeftUpperLeg: MeshPart & {
						LeftHip: Motor6D;
						OriginalSize: Vector3Value;
						LeftHipRigAttachment: Attachment;
						LeftKneeRigAttachment: Attachment;
					};
					LeftLowerArm: MeshPart & {
						LeftElbowRigAttachment: Attachment;
						LeftElbow: Motor6D;
						LeftWristRigAttachment: Attachment;
					};
					RightUpperLeg: MeshPart & {
						RightKneeRigAttachment: Attachment;
						RightHip: Motor6D;
						RightHipRigAttachment: Attachment;
					};
					LowerTorso: MeshPart & {
						WaistRigAttachment: Attachment;
						WaistCenterAttachment: Attachment;
						LeftHipRigAttachment: Attachment;
						RightHipRigAttachment: Attachment;
						Root: Motor6D;
						WaistBackAttachment: Attachment;
						RootRigAttachment: Attachment;
						WaistFrontAttachment: Attachment;
					};
				};
				["Beauty Desk2"]: Model;
				["Cleansing Sink3"]: Model & {
					MeshPart: MeshPart;
				};
				["Deluxe Upgrader2"]: Model & {
					MeshPart: MeshPart;
					Model: Model;
				};
				["Beauty Desk4"]: Model;
				["Pet Comb"]: Model;
				Dog: Model & {
					[""]: Model & {
						RightArm: MeshPart & {
							Joint: Motor6D;
						};
						Leg4: MeshPart & {
							Joint: Motor6D;
						};
						Head: MeshPart & {
							Hearts: ParticleEmitter;
							Joint: Motor6D;
						};
						Leg1: MeshPart & {
							Joint: Motor6D;
						};
						Face: Part & {
							FaceDecal: Decal;
							Joint: Motor6D;
						};
						HumanoidRootPart: Part;
						Leg3: MeshPart & {
							Joint: Motor6D;
						};
						LeftArm: MeshPart & {
							Joint: Motor6D;
						};
						Humanoid: Humanoid & {
							Animator: Animator;
						};
						Leg2: MeshPart & {
							Joint: Motor6D;
						};
					};
				};
				["Cleansing Sink2"]: Model & {
					MeshPart: MeshPart;
				};
				["Reception Desk"]: Model;
				Cat: Model & {
					[""]: Model & {
						Humanoid: Humanoid;
						Leg4: MeshPart & {
							Joint: Motor6D;
						};
						Head: MeshPart & {
							Hearts: ParticleEmitter;
							Joint: Motor6D;
						};
						Leg1: MeshPart & {
							Joint: Motor6D;
						};
						Face: Part & {
							FaceDecal: Decal;
							Joint: Motor6D;
						};
						HumanoidRootPart: Part;
						Ears: MeshPart & {
							Joint: Motor6D;
						};
						Leg3: MeshPart & {
							Joint: Motor6D;
						};
						Leg2: MeshPart & {
							Joint: Motor6D;
						};
					};
				};
				["Pet Soap"]: Model & {
					["Pet Soap"]: Model & {
						MeshPart: MeshPart;
					};
				};
				["Beauty Set"]: Model;
				Dragon: Model & {
					[""]: Model & {
						LeftWing: MeshPart & {
							Joint: Motor6D;
						};
						Leg4: MeshPart & {
							Joint: Motor6D;
						};
						Head: MeshPart & {
							ProximityPrompt: ProximityPrompt;
							Hearts: ParticleEmitter;
							Joint: Motor6D;
						};
						Leg1: MeshPart & {
							Joint: Motor6D;
						};
						Face: Part & {
							FaceDecal: Decal;
							Joint: Motor6D;
						};
						HumanoidRootPart: Part;
						Leg3: MeshPart & {
							Joint: Motor6D;
						};
						UpperWing: MeshPart & {
							Joint: Motor6D;
						};
						RightWing: MeshPart & {
							Joint: Motor6D;
						};
						Humanoid: Humanoid;
						Leg2: MeshPart & {
							Joint: Motor6D;
						};
					};
				};
				Bull: Model & {
					[""]: Model & {
						Humanoid: Humanoid;
						Leg4: MeshPart & {
							Joint: Motor6D;
						};
						Head: MeshPart & {
							Hearts: ParticleEmitter;
							Joint: Motor6D;
						};
						Leg1: MeshPart & {
							Joint: Motor6D;
						};
						Face: Part & {
							FaceDecal: Decal;
							Joint: Motor6D;
						};
						HumanoidRootPart: Part;
						Leg3: MeshPart & {
							Joint: Motor6D;
						};
						LeftHorn: MeshPart & {
							Joint: Motor6D;
						};
						RightHorn: MeshPart & {
							Joint: Motor6D;
						};
						Leg2: MeshPart & {
							Joint: Motor6D;
						};
					};
				};
				Customer7: Model & {
					Humanoid: Humanoid;
					LeftFoot: MeshPart & {
						LeftAnkleRigAttachment: Attachment;
						OriginalSize: Vector3Value;
						LeftAnkle: Motor6D;
					};
					RightHand: MeshPart & {
						RightWristRigAttachment: Attachment;
						RightWrist: Motor6D;
						RightGripAttachment: Attachment;
					};
					HumanoidRootPart: Part & {
						RootRigAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
					};
					RightLowerLeg: MeshPart & {
						RightKneeRigAttachment: Attachment;
						RightAnkleRigAttachment: Attachment;
						RightKnee: Motor6D;
					};
					RightFoot: MeshPart & {
						RightAnkle: Motor6D;
						RightAnkleRigAttachment: Attachment;
					};
					LeftLowerLeg: MeshPart & {
						OriginalSize: Vector3Value;
						LeftKnee: Motor6D;
						LeftAnkleRigAttachment: Attachment;
						LeftKneeRigAttachment: Attachment;
					};
					RightUpperArm: MeshPart & {
						RightShoulder: Motor6D;
						RightShoulderRigAttachment: Attachment;
						RightShoulderAttachment: Attachment;
						RightElbowRigAttachment: Attachment;
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
						face: Decal;
						HairAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
						Neck: Motor6D;
						Mesh: SpecialMesh & {
							OriginalSize: Vector3Value;
						};
						FaceCenterAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
					};
					UpperTorso: MeshPart & {
						LeftShoulderRigAttachment: Attachment;
						BodyBackAttachment: Attachment;
						NeckRigAttachment: Attachment;
						RightShoulderRigAttachment: Attachment;
						Waist: Motor6D;
						RightCollarAttachment: Attachment;
						BodyFrontAttachment: Attachment;
						WaistRigAttachment: Attachment;
						LeftCollarAttachment: Attachment;
						NeckAttachment: Attachment;
					};
					LeftUpperArm: MeshPart & {
						LeftElbowRigAttachment: Attachment;
						LeftShoulderRigAttachment: Attachment;
						LeftShoulder: Motor6D;
						LeftShoulderAttachment: Attachment;
					};
					RightLowerArm: MeshPart & {
						RightWristRigAttachment: Attachment;
						RightElbow: Motor6D;
						RightElbowRigAttachment: Attachment;
					};
					LeftHand: MeshPart & {
						LeftWrist: Motor6D;
						LeftGripAttachment: Attachment;
						LeftWristRigAttachment: Attachment;
					};
					LeftUpperLeg: MeshPart & {
						LeftHip: Motor6D;
						OriginalSize: Vector3Value;
						LeftHipRigAttachment: Attachment;
						LeftKneeRigAttachment: Attachment;
					};
					LeftLowerArm: MeshPart & {
						LeftElbowRigAttachment: Attachment;
						LeftElbow: Motor6D;
						LeftWristRigAttachment: Attachment;
					};
					RightUpperLeg: MeshPart & {
						RightKneeRigAttachment: Attachment;
						RightHip: Motor6D;
						RightHipRigAttachment: Attachment;
					};
					LowerTorso: MeshPart & {
						WaistRigAttachment: Attachment;
						WaistCenterAttachment: Attachment;
						LeftHipRigAttachment: Attachment;
						RightHipRigAttachment: Attachment;
						Root: Motor6D;
						WaistBackAttachment: Attachment;
						RootRigAttachment: Attachment;
						WaistFrontAttachment: Attachment;
					};
				};
				["Pet Bath1"]: Model & {
					Bubbles: Part & {
						Bubbles: ParticleEmitter;
					};
					Model: Model;
				};
				["Conveyor Belt3"]: Model;
				["Deluxe Hairspray"]: Model;
				["Pet Toy"]: Model;
				Customer5: Model & {
					Humanoid: Humanoid & {
						Animator: Animator;
					};
					LeftFoot: MeshPart & {
						LeftAnkleRigAttachment: Attachment;
						OriginalSize: Vector3Value;
						LeftAnkle: Motor6D;
					};
					RightHand: MeshPart & {
						RightWristRigAttachment: Attachment;
						RightWrist: Motor6D;
						RightGripAttachment: Attachment;
					};
					HumanoidRootPart: Part & {
						RootRigAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
					};
					RightLowerLeg: MeshPart & {
						RightKneeRigAttachment: Attachment;
						RightAnkleRigAttachment: Attachment;
						RightKnee: Motor6D;
					};
					RightFoot: MeshPart & {
						RightAnkle: Motor6D;
						RightAnkleRigAttachment: Attachment;
					};
					LeftLowerLeg: MeshPart & {
						OriginalSize: Vector3Value;
						LeftKnee: Motor6D;
						LeftAnkleRigAttachment: Attachment;
						LeftKneeRigAttachment: Attachment;
					};
					RightUpperArm: MeshPart & {
						RightShoulder: Motor6D;
						RightShoulderRigAttachment: Attachment;
						RightShoulderAttachment: Attachment;
						RightElbowRigAttachment: Attachment;
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
						face: Decal;
						HairAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
						Neck: Motor6D;
						Mesh: SpecialMesh & {
							OriginalSize: Vector3Value;
						};
						FaceCenterAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
					};
					UpperTorso: MeshPart & {
						LeftShoulderRigAttachment: Attachment;
						BodyBackAttachment: Attachment;
						NeckRigAttachment: Attachment;
						RightShoulderRigAttachment: Attachment;
						Waist: Motor6D;
						RightCollarAttachment: Attachment;
						BodyFrontAttachment: Attachment;
						WaistRigAttachment: Attachment;
						LeftCollarAttachment: Attachment;
						NeckAttachment: Attachment;
					};
					LeftUpperArm: MeshPart & {
						LeftElbowRigAttachment: Attachment;
						LeftShoulderRigAttachment: Attachment;
						LeftShoulder: Motor6D;
						LeftShoulderAttachment: Attachment;
					};
					RightLowerArm: MeshPart & {
						RightWristRigAttachment: Attachment;
						RightElbow: Motor6D;
						RightElbowRigAttachment: Attachment;
					};
					LeftHand: MeshPart & {
						LeftWrist: Motor6D;
						LeftGripAttachment: Attachment;
						LeftWristRigAttachment: Attachment;
					};
					LeftUpperLeg: MeshPart & {
						LeftHip: Motor6D;
						OriginalSize: Vector3Value;
						LeftHipRigAttachment: Attachment;
						LeftKneeRigAttachment: Attachment;
					};
					LeftLowerArm: MeshPart & {
						LeftElbowRigAttachment: Attachment;
						LeftElbow: Motor6D;
						LeftWristRigAttachment: Attachment;
					};
					RightUpperLeg: MeshPart & {
						RightKneeRigAttachment: Attachment;
						RightHip: Motor6D;
						RightHipRigAttachment: Attachment;
					};
					LowerTorso: MeshPart & {
						WaistRigAttachment: Attachment;
						WaistCenterAttachment: Attachment;
						LeftHipRigAttachment: Attachment;
						RightHipRigAttachment: Attachment;
						Root: Motor6D;
						WaistBackAttachment: Attachment;
						RootRigAttachment: Attachment;
						WaistFrontAttachment: Attachment;
					};
				};
				Receptionist: Model & {
					Humanoid: Humanoid & {
						Animator: Animator;
					};
					LeftFoot: MeshPart & {
						LeftAnkleRigAttachment: Attachment;
						OriginalSize: Vector3Value;
						LeftAnkle: Motor6D;
					};
					RightHand: MeshPart & {
						RightWristRigAttachment: Attachment;
						RightWrist: Motor6D;
						RightGripAttachment: Attachment;
					};
					HumanoidRootPart: Part & {
						RootRigAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
					};
					RightLowerLeg: MeshPart & {
						RightKneeRigAttachment: Attachment;
						RightAnkleRigAttachment: Attachment;
						RightKnee: Motor6D;
					};
					RightFoot: MeshPart & {
						RightAnkle: Motor6D;
						RightAnkleRigAttachment: Attachment;
					};
					LeftLowerLeg: MeshPart & {
						OriginalSize: Vector3Value;
						LeftKnee: Motor6D;
						LeftAnkleRigAttachment: Attachment;
						LeftKneeRigAttachment: Attachment;
					};
					RightUpperArm: MeshPart & {
						RightShoulder: Motor6D;
						RightShoulderRigAttachment: Attachment;
						RightShoulderAttachment: Attachment;
						RightElbowRigAttachment: Attachment;
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
						face: Decal;
						HairAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
						Neck: Motor6D;
						Mesh: SpecialMesh & {
							OriginalSize: Vector3Value;
						};
						FaceCenterAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
					};
					UpperTorso: MeshPart & {
						LeftShoulderRigAttachment: Attachment;
						BodyBackAttachment: Attachment;
						NeckRigAttachment: Attachment;
						RightShoulderRigAttachment: Attachment;
						Waist: Motor6D;
						RightCollarAttachment: Attachment;
						BodyFrontAttachment: Attachment;
						WaistRigAttachment: Attachment;
						LeftCollarAttachment: Attachment;
						NeckAttachment: Attachment;
					};
					LeftUpperArm: MeshPart & {
						LeftElbowRigAttachment: Attachment;
						LeftShoulderRigAttachment: Attachment;
						LeftShoulder: Motor6D;
						LeftShoulderAttachment: Attachment;
					};
					RightLowerArm: MeshPart & {
						RightWristRigAttachment: Attachment;
						RightElbow: Motor6D;
						RightElbowRigAttachment: Attachment;
					};
					LeftHand: MeshPart & {
						LeftWrist: Motor6D;
						LeftGripAttachment: Attachment;
						LeftWristRigAttachment: Attachment;
					};
					LeftUpperLeg: MeshPart & {
						LeftHip: Motor6D;
						OriginalSize: Vector3Value;
						LeftHipRigAttachment: Attachment;
						LeftKneeRigAttachment: Attachment;
					};
					LeftLowerArm: MeshPart & {
						LeftElbowRigAttachment: Attachment;
						LeftElbow: Motor6D;
						LeftWristRigAttachment: Attachment;
					};
					RightUpperLeg: MeshPart & {
						RightKneeRigAttachment: Attachment;
						RightHip: Motor6D;
						RightHipRigAttachment: Attachment;
					};
					LowerTorso: MeshPart & {
						WaistRigAttachment: Attachment;
						WaistCenterAttachment: Attachment;
						LeftHipRigAttachment: Attachment;
						RightHipRigAttachment: Attachment;
						Root: Motor6D;
						WaistBackAttachment: Attachment;
						RootRigAttachment: Attachment;
						WaistFrontAttachment: Attachment;
					};
				};
				Customer4: Model & {
					Humanoid: Humanoid;
					LeftFoot: MeshPart & {
						LeftAnkleRigAttachment: Attachment;
						OriginalSize: Vector3Value;
						LeftAnkle: Motor6D;
					};
					RightHand: MeshPart & {
						RightWristRigAttachment: Attachment;
						RightWrist: Motor6D;
						RightGripAttachment: Attachment;
					};
					HumanoidRootPart: Part & {
						RootRigAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
					};
					RightLowerLeg: MeshPart & {
						RightKneeRigAttachment: Attachment;
						RightAnkleRigAttachment: Attachment;
						RightKnee: Motor6D;
					};
					RightFoot: MeshPart & {
						RightAnkle: Motor6D;
						RightAnkleRigAttachment: Attachment;
					};
					LeftLowerLeg: MeshPart & {
						OriginalSize: Vector3Value;
						LeftKnee: Motor6D;
						LeftAnkleRigAttachment: Attachment;
						LeftKneeRigAttachment: Attachment;
					};
					RightUpperArm: MeshPart & {
						RightShoulder: Motor6D;
						RightShoulderRigAttachment: Attachment;
						RightShoulderAttachment: Attachment;
						RightElbowRigAttachment: Attachment;
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
						face: Decal;
						HairAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
						Neck: Motor6D;
						Mesh: SpecialMesh & {
							OriginalSize: Vector3Value;
						};
						FaceCenterAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
					};
					UpperTorso: MeshPart & {
						LeftShoulderRigAttachment: Attachment;
						BodyBackAttachment: Attachment;
						NeckRigAttachment: Attachment;
						RightShoulderRigAttachment: Attachment;
						Waist: Motor6D;
						RightCollarAttachment: Attachment;
						BodyFrontAttachment: Attachment;
						WaistRigAttachment: Attachment;
						LeftCollarAttachment: Attachment;
						NeckAttachment: Attachment;
					};
					LeftUpperArm: MeshPart & {
						LeftElbowRigAttachment: Attachment;
						LeftShoulderRigAttachment: Attachment;
						LeftShoulder: Motor6D;
						LeftShoulderAttachment: Attachment;
					};
					RightLowerArm: MeshPart & {
						RightWristRigAttachment: Attachment;
						RightElbow: Motor6D;
						RightElbowRigAttachment: Attachment;
					};
					LeftHand: MeshPart & {
						LeftWrist: Motor6D;
						LeftGripAttachment: Attachment;
						LeftWristRigAttachment: Attachment;
					};
					LeftUpperLeg: MeshPart & {
						LeftHip: Motor6D;
						OriginalSize: Vector3Value;
						LeftHipRigAttachment: Attachment;
						LeftKneeRigAttachment: Attachment;
					};
					LeftLowerArm: MeshPart & {
						LeftElbowRigAttachment: Attachment;
						LeftElbow: Motor6D;
						LeftWristRigAttachment: Attachment;
					};
					RightUpperLeg: MeshPart & {
						RightKneeRigAttachment: Attachment;
						RightHip: Motor6D;
						RightHipRigAttachment: Attachment;
					};
					LowerTorso: MeshPart & {
						WaistRigAttachment: Attachment;
						WaistCenterAttachment: Attachment;
						LeftHipRigAttachment: Attachment;
						RightHipRigAttachment: Attachment;
						Root: Motor6D;
						WaistBackAttachment: Attachment;
						RootRigAttachment: Attachment;
						WaistFrontAttachment: Attachment;
					};
				};
				Seating2: Model;
				["Rainbow Upgrader2"]: Model & {
					MeshPart: MeshPart;
					Model: Model;
				};
				Customer8: Model & {
					Humanoid: Humanoid;
					LeftFoot: MeshPart & {
						LeftAnkleRigAttachment: Attachment;
						OriginalSize: Vector3Value;
						LeftAnkle: Motor6D;
					};
					RightHand: MeshPart & {
						RightWristRigAttachment: Attachment;
						RightWrist: Motor6D;
						RightGripAttachment: Attachment;
					};
					HumanoidRootPart: Part & {
						RootRigAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
					};
					RightLowerLeg: MeshPart & {
						RightKneeRigAttachment: Attachment;
						RightAnkleRigAttachment: Attachment;
						RightKnee: Motor6D;
					};
					RightFoot: MeshPart & {
						RightAnkle: Motor6D;
						RightAnkleRigAttachment: Attachment;
					};
					LeftLowerLeg: MeshPart & {
						OriginalSize: Vector3Value;
						LeftKnee: Motor6D;
						LeftAnkleRigAttachment: Attachment;
						LeftKneeRigAttachment: Attachment;
					};
					RightUpperArm: MeshPart & {
						RightShoulder: Motor6D;
						RightShoulderRigAttachment: Attachment;
						RightShoulderAttachment: Attachment;
						RightElbowRigAttachment: Attachment;
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
						face: Decal;
						HairAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
						Neck: Motor6D;
						Mesh: SpecialMesh & {
							OriginalSize: Vector3Value;
						};
						FaceCenterAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
					};
					UpperTorso: MeshPart & {
						LeftShoulderRigAttachment: Attachment;
						BodyBackAttachment: Attachment;
						NeckRigAttachment: Attachment;
						RightShoulderRigAttachment: Attachment;
						Waist: Motor6D;
						RightCollarAttachment: Attachment;
						BodyFrontAttachment: Attachment;
						WaistRigAttachment: Attachment;
						LeftCollarAttachment: Attachment;
						NeckAttachment: Attachment;
					};
					LeftUpperArm: MeshPart & {
						LeftElbowRigAttachment: Attachment;
						LeftShoulderRigAttachment: Attachment;
						LeftShoulder: Motor6D;
						LeftShoulderAttachment: Attachment;
					};
					RightLowerArm: MeshPart & {
						RightWristRigAttachment: Attachment;
						RightElbow: Motor6D;
						RightElbowRigAttachment: Attachment;
					};
					LeftHand: MeshPart & {
						LeftWrist: Motor6D;
						LeftGripAttachment: Attachment;
						LeftWristRigAttachment: Attachment;
					};
					LeftUpperLeg: MeshPart & {
						LeftHip: Motor6D;
						OriginalSize: Vector3Value;
						LeftHipRigAttachment: Attachment;
						LeftKneeRigAttachment: Attachment;
					};
					LeftLowerArm: MeshPart & {
						LeftElbowRigAttachment: Attachment;
						LeftElbow: Motor6D;
						LeftWristRigAttachment: Attachment;
					};
					RightUpperLeg: MeshPart & {
						RightKneeRigAttachment: Attachment;
						RightHip: Motor6D;
						RightHipRigAttachment: Attachment;
					};
					LowerTorso: MeshPart & {
						WaistRigAttachment: Attachment;
						WaistCenterAttachment: Attachment;
						LeftHipRigAttachment: Attachment;
						RightHipRigAttachment: Attachment;
						Root: Motor6D;
						WaistBackAttachment: Attachment;
						RootRigAttachment: Attachment;
						WaistFrontAttachment: Attachment;
					};
				};
				Seating6: Model;
				Salon: Model & {
					["Instant Rebirth"]: Model & {
						Root: MeshPart & {
							ParticleEmitter: ParticleEmitter;
						};
					};
				};
				Customer6: Model & {
					Humanoid: Humanoid;
					LeftFoot: MeshPart & {
						LeftAnkleRigAttachment: Attachment;
						OriginalSize: Vector3Value;
						LeftAnkle: Motor6D;
					};
					RightHand: MeshPart & {
						RightWristRigAttachment: Attachment;
						RightWrist: Motor6D;
						RightGripAttachment: Attachment;
					};
					HumanoidRootPart: Part & {
						RootRigAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
					};
					RightLowerLeg: MeshPart & {
						RightKneeRigAttachment: Attachment;
						RightAnkleRigAttachment: Attachment;
						RightKnee: Motor6D;
					};
					RightFoot: MeshPart & {
						RightAnkle: Motor6D;
						RightAnkleRigAttachment: Attachment;
					};
					LeftLowerLeg: MeshPart & {
						OriginalSize: Vector3Value;
						LeftKnee: Motor6D;
						LeftAnkleRigAttachment: Attachment;
						LeftKneeRigAttachment: Attachment;
					};
					RightUpperArm: MeshPart & {
						RightShoulder: Motor6D;
						RightShoulderRigAttachment: Attachment;
						RightShoulderAttachment: Attachment;
						RightElbowRigAttachment: Attachment;
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
						face: Decal;
						HairAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
						Neck: Motor6D;
						Mesh: SpecialMesh & {
							OriginalSize: Vector3Value;
						};
						FaceCenterAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
					};
					UpperTorso: MeshPart & {
						LeftShoulderRigAttachment: Attachment;
						BodyBackAttachment: Attachment;
						NeckRigAttachment: Attachment;
						RightShoulderRigAttachment: Attachment;
						Waist: Motor6D;
						RightCollarAttachment: Attachment;
						BodyFrontAttachment: Attachment;
						WaistRigAttachment: Attachment;
						LeftCollarAttachment: Attachment;
						NeckAttachment: Attachment;
					};
					LeftUpperArm: MeshPart & {
						LeftElbowRigAttachment: Attachment;
						LeftShoulderRigAttachment: Attachment;
						LeftShoulder: Motor6D;
						LeftShoulderAttachment: Attachment;
					};
					RightLowerArm: MeshPart & {
						RightWristRigAttachment: Attachment;
						RightElbow: Motor6D;
						RightElbowRigAttachment: Attachment;
					};
					LeftHand: MeshPart & {
						LeftWrist: Motor6D;
						LeftGripAttachment: Attachment;
						LeftWristRigAttachment: Attachment;
					};
					LeftUpperLeg: MeshPart & {
						LeftHip: Motor6D;
						OriginalSize: Vector3Value;
						LeftHipRigAttachment: Attachment;
						LeftKneeRigAttachment: Attachment;
					};
					LeftLowerArm: MeshPart & {
						LeftElbowRigAttachment: Attachment;
						LeftElbow: Motor6D;
						LeftWristRigAttachment: Attachment;
					};
					RightUpperLeg: MeshPart & {
						RightKneeRigAttachment: Attachment;
						RightHip: Motor6D;
						RightHipRigAttachment: Attachment;
					};
					LowerTorso: MeshPart & {
						WaistRigAttachment: Attachment;
						WaistCenterAttachment: Attachment;
						LeftHipRigAttachment: Attachment;
						RightHipRigAttachment: Attachment;
						Root: Motor6D;
						WaistBackAttachment: Attachment;
						RootRigAttachment: Attachment;
						WaistFrontAttachment: Attachment;
					};
				};
				["Rainbow Upgrader3"]: Model & {
					MeshPart: MeshPart;
					Model: Model;
				};
				Customer1: Model & {
					Humanoid: Humanoid;
					LeftFoot: MeshPart & {
						LeftAnkleRigAttachment: Attachment;
						OriginalSize: Vector3Value;
						LeftAnkle: Motor6D;
					};
					RightHand: MeshPart & {
						RightWristRigAttachment: Attachment;
						RightWrist: Motor6D;
						RightGripAttachment: Attachment;
					};
					HumanoidRootPart: Part & {
						RootRigAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
					};
					RightLowerLeg: MeshPart & {
						RightKneeRigAttachment: Attachment;
						RightAnkleRigAttachment: Attachment;
						RightKnee: Motor6D;
					};
					RightFoot: MeshPart & {
						RightAnkle: Motor6D;
						RightAnkleRigAttachment: Attachment;
					};
					LeftLowerLeg: MeshPart & {
						OriginalSize: Vector3Value;
						LeftKnee: Motor6D;
						LeftAnkleRigAttachment: Attachment;
						LeftKneeRigAttachment: Attachment;
					};
					RightUpperArm: MeshPart & {
						RightShoulder: Motor6D;
						RightShoulderRigAttachment: Attachment;
						RightShoulderAttachment: Attachment;
						RightElbowRigAttachment: Attachment;
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
						face: Decal;
						HairAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
						Neck: Motor6D;
						Mesh: SpecialMesh & {
							OriginalSize: Vector3Value;
						};
						FaceCenterAttachment: Attachment & {
							OriginalPosition: Vector3Value;
						};
					};
					UpperTorso: MeshPart & {
						LeftShoulderRigAttachment: Attachment;
						BodyBackAttachment: Attachment;
						NeckRigAttachment: Attachment;
						RightShoulderRigAttachment: Attachment;
						Waist: Motor6D;
						RightCollarAttachment: Attachment;
						BodyFrontAttachment: Attachment;
						WaistRigAttachment: Attachment;
						LeftCollarAttachment: Attachment;
						NeckAttachment: Attachment;
					};
					LeftUpperArm: MeshPart & {
						LeftElbowRigAttachment: Attachment;
						LeftShoulderRigAttachment: Attachment;
						LeftShoulder: Motor6D;
						LeftShoulderAttachment: Attachment;
					};
					RightLowerArm: MeshPart & {
						RightWristRigAttachment: Attachment;
						RightElbow: Motor6D;
						RightElbowRigAttachment: Attachment;
					};
					LeftHand: MeshPart & {
						LeftWrist: Motor6D;
						LeftGripAttachment: Attachment;
						LeftWristRigAttachment: Attachment;
					};
					LeftUpperLeg: MeshPart & {
						LeftHip: Motor6D;
						OriginalSize: Vector3Value;
						LeftHipRigAttachment: Attachment;
						LeftKneeRigAttachment: Attachment;
					};
					LeftLowerArm: MeshPart & {
						LeftElbowRigAttachment: Attachment;
						LeftElbow: Motor6D;
						LeftWristRigAttachment: Attachment;
					};
					RightUpperLeg: MeshPart & {
						RightKneeRigAttachment: Attachment;
						RightHip: Motor6D;
						RightHipRigAttachment: Attachment;
					};
					LowerTorso: MeshPart & {
						WaistRigAttachment: Attachment;
						WaistCenterAttachment: Attachment;
						LeftHipRigAttachment: Attachment;
						RightHipRigAttachment: Attachment;
						Root: Motor6D;
						WaistBackAttachment: Attachment;
						RootRigAttachment: Attachment;
						WaistFrontAttachment: Attachment;
					};
				};
				Moisturizer: Model & {
					Part: Part;
				};
				Conditioner: Model;
				Seating4: Model;
				Seating3: Model;
				["Conveyor Belt1"]: Model;
				["Premium Perfume"]: Model;
			};
			Conveyor2: Model & {
				["19"]: Part;
				["11"]: Part;
				["4"]: Part;
				["14"]: Part;
				["13"]: Part;
				["15"]: Part;
				["1"]: Part;
				["12"]: Part;
				["3"]: Part;
				["2"]: Part;
				["5"]: Part;
				["18"]: Part;
				["7"]: Part;
				["6"]: Part;
				["9"]: Part;
				["8"]: Part;
				["16"]: Part;
				["17"]: Part;
				["20"]: Part;
				["21"]: Part;
				["22"]: Part;
				["10"]: Part;
			};
			Buttons: Folder & {
				["Pet Bath1"]: Model & {
					TouchPart: MeshPart;
				};
				["Conveyor Belt2"]: Model & {
					TouchPart: MeshPart;
				};
				Brush: Model & {
					TouchPart: MeshPart;
				};
				Lizard: Model & {
					TouchPart: MeshPart;
				};
				["Pet Treats"]: Model & {
					TouchPart: MeshPart;
				};
				["Pet Comb"]: Model & {
					TouchPart: MeshPart;
				};
				["Beauty Desk1"]: Model & {
					TouchPart: MeshPart;
				};
				["Magic Unicorn"]: Model & {
					TouchPart: MeshPart;
				};
				Lipstick: Model & {
					TouchPart: MeshPart;
				};
				["Cleansing Sink1"]: Model & {
					TouchPart: MeshPart;
				};
				["Basic Upgrader2"]: Model & {
					TouchPart: MeshPart;
				};
				Shampoo: Model & {
					TouchPart: MeshPart;
				};
				Comb: Model & {
					TouchPart: MeshPart;
				};
				["Pet Salon"]: Model & {
					TouchPart: MeshPart;
				};
				["Cleansing Sink4"]: Model & {
					TouchPart: MeshPart;
				};
				Water: Model & {
					TouchPart: MeshPart;
				};
				["Pet Bath4"]: Model & {
					TouchPart: MeshPart;
				};
				Salon: Model & {
					TouchPart: MeshPart;
				};
				Customer2: Model & {
					TouchPart: MeshPart;
				};
				["Basic Upgrader1"]: Model & {
					TouchPart: MeshPart;
				};
				Perfume: Model & {
					TouchPart: MeshPart;
				};
				["Deluxe Upgrader3"]: Model & {
					TouchPart: MeshPart;
				};
				Roof: Model & {
					TouchPart: MeshPart;
				};
				["Deluxe Upgrader1"]: Model & {
					TouchPart: MeshPart;
				};
				["Basic Upgrader3"]: Model & {
					TouchPart: MeshPart;
				};
				Mirror: Model & {
					TouchPart: MeshPart;
				};
				["Beauty Desk3"]: Model & {
					TouchPart: MeshPart;
				};
				Frog: Model & {
					TouchPart: MeshPart;
				};
				Customer4: Model & {
					TouchPart: MeshPart;
				};
				["Pet Bath3"]: Model & {
					TouchPart: MeshPart;
				};
				["Pet House"]: Model & {
					TouchPart: MeshPart;
				};
				Eyeliner: Model & {
					TouchPart: MeshPart;
				};
				Seating5: Model & {
					TouchPart: MeshPart;
				};
				Customer3: Model & {
					TouchPart: MeshPart;
				};
				["Beauty Desk2"]: Model & {
					TouchPart: MeshPart;
				};
				["Cleansing Sink3"]: Model & {
					TouchPart: MeshPart;
				};
				["Deluxe Upgrader2"]: Model & {
					TouchPart: MeshPart;
				};
				["Beauty Desk4"]: Model & {
					TouchPart: MeshPart;
				};
				Dog: Model & {
					TouchPart: MeshPart;
				};
				Seating6: Model & {
					TouchPart: MeshPart;
				};
				["Cleansing Sink2"]: Model & {
					TouchPart: MeshPart;
				};
				["Reception Desk"]: Model & {
					TouchPart: MeshPart;
				};
				Cat: Model & {
					TouchPart: MeshPart;
				};
				["Pet Soap"]: Model & {
					TouchPart: MeshPart;
				};
				["Beauty Set"]: Model & {
					TouchPart: MeshPart;
				};
				Dragon: Model & {
					TouchPart: MeshPart;
				};
				Seating1: Model & {
					TouchPart: MeshPart;
				};
				Customer7: Model & {
					TouchPart: MeshPart;
				};
				Customer6: Model & {
					TouchPart: MeshPart;
				};
				["Pet Bath2"]: Model & {
					TouchPart: MeshPart;
				};
				Conditioner: Model & {
					TouchPart: MeshPart;
				};
				["Pet Toy"]: Model & {
					TouchPart: MeshPart;
				};
				Customer5: Model & {
					TouchPart: MeshPart;
				};
				Receptionist: Model & {
					TouchPart: MeshPart;
				};
				["Deluxe Hairspray"]: Model & {
					TouchPart: MeshPart;
				};
				Bull: Model & {
					TouchPart: MeshPart;
				};
				["Rainbow Upgrader2"]: Model & {
					TouchPart: MeshPart;
				};
				["Rainbow Upgrader1"]: Model & {
					TouchPart: MeshPart;
				};
				["Conveyor Belt3"]: Model & {
					TouchPart: MeshPart;
				};
				Seating2: Model & {
					TouchPart: MeshPart;
				};
				["Pet Food"]: Model & {
					TouchPart: MeshPart;
				};
				["Rainbow Upgrader3"]: Model & {
					TouchPart: MeshPart;
				};
				Customer1: Model & {
					TouchPart: MeshPart;
				};
				["Conveyor Belt1"]: Model & {
					TouchPart: MeshPart;
				};
				["Premium Perfume"]: Model & {
					TouchPart: MeshPart;
				};
				Seating4: Model & {
					TouchPart: MeshPart;
				};
				Seating3: Model & {
					TouchPart: MeshPart;
				};
				Moisturizer: Model & {
					TouchPart: MeshPart;
				};
				Customer8: Model & {
					TouchPart: MeshPart;
				};
			};
			Conveyor3: Model & {
				["41"]: Part;
				["37"]: Part;
				["35"]: Part;
				["39"]: Part;
				["29"]: Part;
				["1"]: Part;
				["3"]: Part;
				["2"]: Part;
				["19"]: Part;
				["4"]: Part;
				["7"]: Part;
				["6"]: Part;
				["25"]: Part;
				["15"]: Part;
				["27"]: Part;
				["17"]: Part;
				["31"]: Part;
				["21"]: Part;
				["33"]: Part;
				["23"]: Part;
				["40"]: Part;
				["36"]: Part;
				["34"]: Part;
				["28"]: Part;
				["38"]: Part;
				["5"]: Part;
				["8"]: Part;
				["9"]: Part;
				["10"]: Part;
				["11"]: Part;
				["18"]: Part;
				["12"]: Part;
				["13"]: Part;
				["14"]: Part;
				["24"]: Part;
				["16"]: Part;
				["26"]: Part;
				["20"]: Part;
				["30"]: Part;
				["22"]: Part;
				["32"]: Part;
			};
			Conveyor1: Model & {
				["12"]: Part;
				["15"]: Part;
				["13"]: Part;
				["4"]: Part;
				["14"]: Part;
				["1"]: Part;
				["19"]: Part;
				["3"]: Part;
				["2"]: Part;
				["5"]: Part;
				["18"]: Part;
				["7"]: Part;
				["6"]: Part;
				["9"]: Part;
				["8"]: Part;
				["16"]: Part;
				["17"]: Part;
				["20"]: Part;
				["21"]: Part;
				["11"]: Part;
				["10"]: Part;
			};
			Spawn: SpawnLocation & {
				Texture: Texture;
			};
			Essentials: Folder;
		};
	};
	Rebirth: Model & {
		TouchPart: Part;
	};
	SunRays: SunRaysEffect;
	DepthOfField: DepthOfFieldEffect;
	Baseplate: Part & {
		Texture: Texture;
	};
	["Double Cash"]: Model & {
		Root: MeshPart & {
			Sparkles: ParticleEmitter;
		};
	};
	PartStorage: Folder & {
		Lot1: Folder;
	};
	Camera: Camera;
	SpawnLocation: SpawnLocation & {
		Decal: Decal;
	};
	Bloom: BloomEffect;
}
