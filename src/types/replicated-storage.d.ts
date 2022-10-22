interface ReplicatedStorage extends Instance {
	Assets: Folder & {
		Fire: Fire;
		Sparkles: Sparkles;
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
	Ids: ModuleScript;
	Money: ModuleScript;
	Packages: Folder & {
		Promise: ModuleScript;
		Streamable: ModuleScript & {
			StreamableUtil: ModuleScript;
			Streamable: ModuleScript;
		};
		CatmullRomSpline: ModuleScript;
		Trove: ModuleScript;
		Icon: ModuleScript & {
			IconController: ModuleScript;
			TopbarPlusReference: ModuleScript;
			VERSION: ModuleScript;
			TopbarPlusGui: ModuleScript;
			Themes: ModuleScript & {
				BlueGradient: ModuleScript;
				Default: ModuleScript;
			};
			Maid: ModuleScript;
			Signal: ModuleScript;
		};
		Signal: ModuleScript;
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
	Sounds: Folder & {
		BackgroundMusic: Folder & {
			Song2: Sound;
			Song6: Sound;
			Song1: Sound;
			Song5: Sound;
			Song3: Sound;
			Song7: Sound;
			Song4: Sound;
		};
	};
	TS: Folder & {
		network: ModuleScript;
		util: Folder & {
			["flamework-utils"]: ModuleScript;
			["math-util"]: ModuleScript;
			["player-util"]: ModuleScript;
			roblox: ModuleScript;
			networking: ModuleScript;
		};
		meta: Folder & {
			["part-info"]: ModuleScript;
			["default-player-data"]: ModuleScript;
			["part-identifiers"]: ModuleScript;
			["path-types"]: ModuleScript;
		};
		ui: Folder & {
			world: Folder & {
				["purchase-button"]: ModuleScript;
			};
		};
		components: Folder;
		["shared-constants"]: ModuleScript;
	};
	Events: Folder & {
		CodeReached: BindableEvent;
		DropRateChanged: RemoteEvent;
		EarnRateChanged: RemoteEvent;
		BalancesChanged: RemoteEvent;
		CodeRedeemed: RemoteEvent;
		ParticlesEnable: RemoteEvent;
		UpgradePurchased: BindableEvent;
		ObjectPurchased: BindableEvent;
		PlayerRebirths: RemoteEvent;
		CashTag: RemoteEvent;
	};
	rbxts_include: Folder & {
		RuntimeLib: ModuleScript;
		Promise: ModuleScript;
		node_modules: Folder & {
			["@flamework"]: Folder & {
				core: Folder & {
					out: ModuleScript & {
						reflect: ModuleScript;
						modding: ModuleScript;
						flamework: ModuleScript;
					};
				};
				components: Folder & {
					out: ModuleScript;
				};
				networking: Folder & {
					out: ModuleScript & {
						events: Folder & {
							createClientHandler: ModuleScript;
							createServerHandler: ModuleScript;
							createNetworkingEvent: ModuleScript;
						};
						functions: Folder & {
							createClientHandler: ModuleScript;
							createNetworkingFunction: ModuleScript;
							createServerHandler: ModuleScript;
							errors: ModuleScript;
						};
						handlers: ModuleScript;
						middleware: Folder & {
							createMiddlewareProcessor: ModuleScript;
							skip: ModuleScript;
						};
						util: Folder & {
							populateInstanceMap: ModuleScript;
						};
					};
				};
			};
			["@rbxts"]: Folder & {
				roact: Folder & {
					src: ModuleScript & {
						createSpy: ModuleScript;
						createSignal: ModuleScript;
						oneChild: ModuleScript;
						Component: ModuleScript;
						createElement: ModuleScript;
						createReconciler: ModuleScript;
						GlobalConfig: ModuleScript;
						strict: ModuleScript;
						createRef: ModuleScript;
						Type: ModuleScript;
						Portal: ModuleScript;
						Symbol: ModuleScript;
						PropMarkers: Folder & {
							Ref: ModuleScript;
							Change: ModuleScript;
							Children: ModuleScript;
							Event: ModuleScript;
						};
						ComponentLifecyclePhase: ModuleScript;
						Config: ModuleScript;
						assign: ModuleScript;
						assertDeepEqual: ModuleScript;
						getDefaultInstanceProperty: ModuleScript;
						Binding: ModuleScript;
						NoopRenderer: ModuleScript;
						forwardRef: ModuleScript;
						internalAssert: ModuleScript;
						createReconcilerCompat: ModuleScript;
						createFragment: ModuleScript;
						RobloxRenderer: ModuleScript;
						PureComponent: ModuleScript;
						invalidSetStateMessages: ModuleScript;
						ElementKind: ModuleScript;
						createContext: ModuleScript;
						Logging: ModuleScript;
						ElementUtils: ModuleScript;
						SingleEventManager: ModuleScript;
						None: ModuleScript;
					};
				};
				spring: ModuleScript;
				profileservice: Folder & {
					src: ModuleScript;
				};
				["object-utils"]: ModuleScript;
				["better-binding"]: Folder & {
					node_modules: Folder & {
						["@rbxts"]: Folder & {
							roact: Folder & {
								src: ModuleScript & {
									createSpy: ModuleScript;
									createSignal: ModuleScript;
									oneChild: ModuleScript;
									Component: ModuleScript;
									createElement: ModuleScript;
									createReconciler: ModuleScript;
									GlobalConfig: ModuleScript;
									strict: ModuleScript;
									createRef: ModuleScript;
									Type: ModuleScript;
									Portal: ModuleScript;
									Symbol: ModuleScript;
									PropMarkers: Folder & {
										Ref: ModuleScript;
										Change: ModuleScript;
										Children: ModuleScript;
										Event: ModuleScript;
									};
									ComponentLifecyclePhase: ModuleScript;
									Config: ModuleScript;
									assign: ModuleScript;
									assertDeepEqual: ModuleScript;
									getDefaultInstanceProperty: ModuleScript;
									Binding: ModuleScript;
									NoopRenderer: ModuleScript;
									forwardRef: ModuleScript;
									internalAssert: ModuleScript;
									createReconcilerCompat: ModuleScript;
									createFragment: ModuleScript;
									RobloxRenderer: ModuleScript;
									PureComponent: ModuleScript;
									invalidSetStateMessages: ModuleScript;
									ElementKind: ModuleScript;
									createContext: ModuleScript;
									Logging: ModuleScript;
									ElementUtils: ModuleScript;
									SingleEventManager: ModuleScript;
									None: ModuleScript;
								};
							};
						};
					};
					out: ModuleScript;
				};
				types: Folder & {
					include: Folder & {
						generated: Folder;
					};
				};
				beacon: Folder & {
					out: ModuleScript;
				};
				["roact-rodux"]: Folder & {
					src: ModuleScript & {
						StoreContext: ModuleScript;
						StoreProvider: ModuleScript;
						Symbol: ModuleScript;
						shallowEqual: ModuleScript;
						join: ModuleScript;
						connect: ModuleScript;
					};
				};
				maid: Folder & {
					Maid: ModuleScript;
				};
				["promise-character"]: ModuleScript & {
					node_modules: Folder & {
						["@rbxts"]: Folder & {
							["compiler-types"]: Folder & {
								types: Folder;
							};
						};
					};
				};
				janitor: Folder & {
					src: ModuleScript & {
						GetPromiseLibrary: ModuleScript;
						RbxScriptConnection: ModuleScript;
						Symbol: ModuleScript;
					};
				};
				["stacks-and-queues"]: Folder & {
					out: ModuleScript & {
						classes: Folder & {
							Stack: ModuleScript;
							Queue: ModuleScript;
						};
						interfaces: Folder;
					};
				};
				["topbar-plus"]: Folder & {
					out: ModuleScript & {
						IconController: ModuleScript;
						TopbarPlusReference: ModuleScript;
						TopbarPlusGui: ModuleScript;
						Themes: ModuleScript & {
							BlueGradient: ModuleScript;
							Default: ModuleScript;
						};
						Maid: ModuleScript;
						Signal: ModuleScript;
					};
				};
				["roact-hooked"]: Folder & {
					src: ModuleScript & {
						hoc: ModuleScript;
						Roact: ModuleScript;
						hooks: ModuleScript;
					};
				};
				services: ModuleScript;
				["rust-classes"]: Folder & {
					out: ModuleScript & {
						classes: Folder & {
							Vec: ModuleScript;
							HashMap: ModuleScript;
							Option: ModuleScript;
							OptionMut: ModuleScript;
							Iterator: ModuleScript;
							Result: ModuleScript;
						};
						util: Folder & {
							lazyLoad: ModuleScript;
							sizeHint: ModuleScript;
							imports: ModuleScript;
							Range: ModuleScript;
							Unit: ModuleScript;
						};
					};
				};
				testez: Folder & {
					src: ModuleScript & {
						TestPlanner: ModuleScript;
						TestRunner: ModuleScript;
						TestBootstrap: ModuleScript;
						TestSession: ModuleScript;
						LifecycleHooks: ModuleScript;
						Reporters: Folder & {
							TextReporter: ModuleScript;
							TextReporterQuiet: ModuleScript;
							TeamCityReporter: ModuleScript;
						};
						TestPlan: ModuleScript;
						TestResults: ModuleScript;
						TestEnum: ModuleScript;
						Context: ModuleScript;
						Expectation: ModuleScript;
					};
				};
				["character-realism"]: Folder & {
					src: ModuleScript & {
						server: ModuleScript;
						client: ModuleScript & {
							FpsCamera: ModuleScript;
							Util: ModuleScript;
						};
					};
				};
				["promise-child"]: ModuleScript;
				["linked-lists"]: Folder & {
					out: ModuleScript & {
						classes: Folder & {
							lists: Folder & {
								SinglyLinkedList: ModuleScript;
								["reusable-tests"]: Folder & {
									CircularLinkedListTests: ModuleScript;
									SinglyLinkedListTests: ModuleScript;
									UniversalLinkedListTests: ModuleScript;
									DoublyLinkedListTests: ModuleScript;
									AcyclicLinkedListTests: ModuleScript;
								};
								CircularSinglyLinkedList: ModuleScript;
								CircularDoublyLinkedList: ModuleScript;
								DoublyLinkedList: ModuleScript;
							};
							nodes: Folder & {
								SinglyLinkedListNode: ModuleScript;
								DoublyLinkedListNode: ModuleScript;
							};
						};
						interfaces: Folder;
					};
				};
				["chat-service"]: Folder & {
					out: ModuleScript & {
						server: ModuleScript;
						client: ModuleScript;
					};
				};
				streamable: Folder & {
					out: ModuleScript;
				};
				["format-number"]: Folder & {
					src: ModuleScript & {
						DoubleConversion: Folder & {
							proxy: ModuleScript;
							diy_fp: ModuleScript;
							LICENSE: ModuleScript;
							uint64_t: ModuleScript;
							DoubleToStringConverter: ModuleScript;
							ieee: ModuleScript;
							strtod: ModuleScript;
							cached_power: ModuleScript;
							grisu3: ModuleScript;
							DoubleToDecimalConverter: ModuleScript;
							bignum_dtoa: ModuleScript;
							bignum: ModuleScript;
							DecimalToDoubleConverter: ModuleScript;
						};
						_aux: ModuleScript;
						config: ModuleScript;
					};
				};
				["validate-tree"]: ModuleScript;
				log: Folder & {
					out: ModuleScript & {
						Core: ModuleScript & {
							LogEventCallbackSink: ModuleScript;
							LogEventPropertyEnricher: ModuleScript;
							LogEventRobloxOutputSink: ModuleScript;
						};
						Configuration: ModuleScript;
						Logger: ModuleScript;
					};
				};
				abbreviate: Folder & {
					src: ModuleScript & {
						commify: ModuleScript;
						numberToString: ModuleScript;
						setSetting: ModuleScript;
						numbersToSortedString: ModuleScript;
						stringToNumber: ModuleScript;
					};
				};
				["lerp-functions"]: ModuleScript;
				rodux: Folder & {
					src: ModuleScript & {
						combineReducers: ModuleScript;
						NoYield: ModuleScript;
						createReducer: ModuleScript;
						loggerMiddleware: ModuleScript;
						makeActionCreator: ModuleScript;
						thunkMiddleware: ModuleScript;
						prettyPrint: ModuleScript;
						Store: ModuleScript;
						Signal: ModuleScript;
					};
				};
				t: Folder & {
					lib: Folder & {
						ts: ModuleScript;
					};
				};
				flamework: Folder & {
					out: ModuleScript & {
						networking: ModuleScript;
						components: ModuleScript;
						flamework: ModuleScript;
					};
				};
				["compiler-types"]: Folder & {
					types: Folder;
				};
				signal: ModuleScript;
				partcache: Folder & {
					out: ModuleScript & {
						Table: ModuleScript;
					};
				};
				["message-templates"]: Folder & {
					out: ModuleScript & {
						MessageTemplateRenderer: ModuleScript;
						PlainTextMessageTemplateRenderer: ModuleScript;
						RbxSerializer: ModuleScript;
						MessageTemplate: ModuleScript;
						MessageTemplateToken: ModuleScript;
						MessageTemplateParser: ModuleScript;
					};
				};
			};
		};
	};
	Gui: BillboardGui & {
		ItemPrice: TextBox;
		ItemName: TextBox;
	};
	PartInfo: Folder & {
		["Pineapple Dumpling"]: MeshPart;
		["Robux Dropper"]: Part & {
			Mesh: SpecialMesh;
		};
		["Seaweed Rice Cake"]: MeshPart;
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
		["Color Creamed Dumpling"]: MeshPart;
		Crab: Part & {
			Mesh: SpecialMesh;
		};
		["Velvet Dumpling"]: MeshPart;
		Lobster: Part & {
			Mesh: SpecialMesh;
		};
		["Chocolate Dumpling"]: MeshPart;
		Cabbage: MeshPart;
		["Cinnamon Dumpling"]: MeshPart;
		["Plum Dumpling"]: MeshPart;
		Dumpling: MeshPart;
		["Chocolate Spread Dumpling"]: MeshPart;
		["Chili Pepper Dumpling"]: MeshPart;
		["Sugar Dumpling"]: MeshPart;
		["Filleted Salmon"]: UnionOperation;
		["Peppered Dumpling"]: MeshPart;
		["Cream Dumpling"]: MeshPart;
		["Blue Octopus"]: MeshPart & {
			HatAttachment: Attachment;
			OriginalSize: Vector3Value;
			AvatarPartScaleType: StringValue;
		};
		["Layered Velvet Dumpling"]: MeshPart;
		["Strawberry Dumpling"]: MeshPart;
		["Imperial Dumpling"]: MeshPart;
		["Mint Dumpling"]: MeshPart;
		["Blue Squid"]: Part & {
			Mesh: SpecialMesh;
		};
		["Emperor Dumpling"]: MeshPart;
		["Sugar Vegetable Dumpling"]: MeshPart;
		["King Sugar Dumpling"]: MeshPart;
		["Salmon Rice Cake"]: MeshPart;
		["Jelly Dumpling"]: MeshPart;
		["Rose Crested Dumpling"]: MeshPart;
		["Cool Mint Dumpling"]: MeshPart;
		["Spring Onion"]: UnionOperation;
		["Rose Scent Dumpling"]: MeshPart;
	};
	Backups: Folder;
	Playing: Folder;
}
