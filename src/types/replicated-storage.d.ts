interface ReplicatedStorage extends Instance {
	TS: Folder & {
		network: ModuleScript;
		ui: Folder & {
			world: Folder & {
				["purchase-button"]: ModuleScript;
			};
		};
		meta: Folder & {
			["tycoon-purchase-data"]: ModuleScript;
			["default-player-data"]: ModuleScript;
		};
		util: Folder & {
			roblox: ModuleScript;
			networking: ModuleScript;
			["player-util"]: ModuleScript;
			["math-util"]: ModuleScript;
			["flamework-utils"]: ModuleScript;
		};
		components: Folder;
		["shared-constants"]: ModuleScript;
	};
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
	rbxts_include: Folder & {
		RuntimeLib: ModuleScript;
		Promise: ModuleScript;
		node_modules: Folder & {
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
			services: ModuleScript;
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
			["better-binding"]: Folder & {
				out: ModuleScript;
			};
			["lerp-functions"]: ModuleScript;
			["object-utils"]: ModuleScript;
			["roact-hooked"]: Folder & {
				src: ModuleScript & {
					hoc: ModuleScript;
					Roact: ModuleScript;
					hooks: ModuleScript;
				};
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
			signal: ModuleScript;
			types: Folder & {
				include: Folder & {
					generated: Folder;
				};
			};
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
			partcache: Folder & {
				out: ModuleScript & {
					Table: ModuleScript;
				};
			};
			spring: ModuleScript;
			streamable: Folder & {
				out: ModuleScript;
			};
			beacon: Folder & {
				out: ModuleScript;
			};
			t: Folder & {
				lib: Folder & {
					ts: ModuleScript;
				};
			};
			maid: Folder & {
				Maid: ModuleScript;
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
			profileservice: Folder & {
				src: ModuleScript;
			};
			["compiler-types"]: Folder & {
				types: Folder;
			};
			flamework: Folder & {
				out: ModuleScript & {
					networking: ModuleScript;
					components: ModuleScript;
					flamework: ModuleScript;
				};
			};
			janitor: Folder & {
				src: ModuleScript & {
					GetPromiseLibrary: ModuleScript;
					RbxScriptConnection: ModuleScript;
					Symbol: ModuleScript;
				};
			};
			fusion: Folder & {
				src: ModuleScript & {
					Animation: Folder & {
						Tween: ModuleScript;
						Spring: ModuleScript;
						lerpType: ModuleScript;
						SpringScheduler: ModuleScript;
						TweenScheduler: ModuleScript;
						getTweenRatio: ModuleScript;
						springCoefficients: ModuleScript;
						packType: ModuleScript;
						unpackType: ModuleScript;
					};
					Instances: Folder & {
						Cleanup: ModuleScript;
						defaultProps: ModuleScript;
						applyInstanceProps: ModuleScript;
						semiWeakRef: ModuleScript;
						OnEvent: ModuleScript;
						onDestroy: ModuleScript;
						OnChange: ModuleScript;
						Out: ModuleScript;
						Hydrate: ModuleScript;
						isAccessible: ModuleScript;
						Ref: ModuleScript;
						Children: ModuleScript;
						New: ModuleScript;
					};
					State: Folder & {
						Observer: ModuleScript;
						ForValues: ModuleScript;
						unwrap: ModuleScript;
						ForKeys: ModuleScript;
						Value: ModuleScript;
						Computed: ModuleScript;
						ForPairs: ModuleScript;
					};
					Utility: Folder & {
						cleanup: ModuleScript;
						isSimilar: ModuleScript;
						xtypeof: ModuleScript;
						restrictRead: ModuleScript;
						None: ModuleScript;
					};
					Types: ModuleScript;
					Logging: Folder & {
						messages: ModuleScript;
						logError: ModuleScript;
						parseError: ModuleScript;
						logErrorNonFatal: ModuleScript;
						logWarn: ModuleScript;
					};
					PubTypes: ModuleScript;
					Dependencies: Folder & {
						initDependency: ModuleScript;
						sharedState: ModuleScript;
						updateAll: ModuleScript;
						useDependency: ModuleScript;
						captureDependencies: ModuleScript;
					};
					Colour: Folder & {
						Oklab: ModuleScript;
					};
				};
			};
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
}
