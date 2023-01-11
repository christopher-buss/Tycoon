interface ReplicatedStorage extends Instance {
	Sounds: Folder & {
		BackgroundMusic: Folder;
	};
	TS: Folder & {
		flags: ModuleScript;
		["shared-constants"]: ModuleScript;
		network: ModuleScript;
		functions: Folder & {
			["setup-logger"]: ModuleScript;
		};
		meta: Folder & {
			gamepasses: ModuleScript;
			["default-player-data"]: ModuleScript;
			["part-identifiers"]: ModuleScript;
			["part-info"]: ModuleScript;
		};
		components: Folder;
		util: Folder & {
			["flamework-utils"]: ModuleScript;
			["tween-utils"]: ModuleScript;
			["math-util"]: ModuleScript;
			["instance-util"]: ModuleScript;
			roblox: ModuleScript;
			["player-util"]: ModuleScript;
			networking: ModuleScript;
		};
		ui: Folder & {
			world: Folder & {
				["purchase-button"]: ModuleScript;
				["timer-button"]: ModuleScript;
				["player-head"]: ModuleScript;
			};
		};
	};
	Accessories: Folder & {
		Crown: Accessory & {
			MeshPart: MeshPart & {
				HatAttachment: Attachment;
				OriginalSize: Vector3Value;
				AccessoryWeld: Weld;
			};
		};
	};
	BloxbizConfig: ModuleScript;
	PartInfo: Folder & {
		Shampoo: Model & {
			Price: BillboardGui & {
				PriceLabel: TextButton & {
					UITextSizeConstraint: UITextSizeConstraint;
				};
			};
		};
		Comb: Model & {
			Price: BillboardGui & {
				PriceLabel: TextButton & {
					UITextSizeConstraint: UITextSizeConstraint;
				};
			};
			MeshPart: MeshPart;
		};
		Moisturizer: Model & {
			Part: Part;
			Price: BillboardGui & {
				PriceLabel: TextButton & {
					UITextSizeConstraint: UITextSizeConstraint;
				};
			};
		};
		Mirror: Model & {
			Part: Part;
			Price: BillboardGui & {
				PriceLabel: TextButton & {
					UITextSizeConstraint: UITextSizeConstraint;
				};
			};
		};
		["Pet Food"]: Model & {
			Part: Part;
			MeshPart: MeshPart;
			Price: BillboardGui & {
				PriceLabel: TextButton & {
					UITextSizeConstraint: UITextSizeConstraint;
				};
			};
		};
		Water: Model & {
			Price: BillboardGui & {
				PriceLabel: TextButton & {
					UITextSizeConstraint: UITextSizeConstraint;
				};
			};
			MeshPart: MeshPart;
			Part: Part;
		};
		Brush: Model & {
			Part: Part;
			Price: BillboardGui & {
				PriceLabel: TextButton & {
					UITextSizeConstraint: UITextSizeConstraint;
				};
			};
		};
		["Pet Treats"]: Model & {
			Price: BillboardGui & {
				PriceLabel: TextButton & {
					UITextSizeConstraint: UITextSizeConstraint;
				};
			};
		};
		["Pet Comb"]: Model & {
			Price: BillboardGui & {
				PriceLabel: TextButton & {
					UITextSizeConstraint: UITextSizeConstraint;
				};
			};
			MeshPart: MeshPart;
		};
		Eyeliner: Model & {
			Price: BillboardGui & {
				PriceLabel: TextButton & {
					UITextSizeConstraint: UITextSizeConstraint;
				};
			};
		};
		Perfume: Model & {
			Price: BillboardGui & {
				PriceLabel: TextButton & {
					UITextSizeConstraint: UITextSizeConstraint;
				};
			};
		};
		Lipstick: Model & {
			Price: BillboardGui & {
				PriceLabel: TextButton & {
					UITextSizeConstraint: UITextSizeConstraint;
				};
			};
			Wedge: WedgePart;
		};
		["Pet Toy"]: Model & {
			Leg3: MeshPart;
			Price: BillboardGui & {
				PriceLabel: TextButton & {
					UITextSizeConstraint: UITextSizeConstraint;
				};
			};
			Head: MeshPart;
			Leg1: MeshPart;
			Face: Part & {
				FaceDecal: Decal;
			};
			LeftArm: MeshPart;
			RightArm: MeshPart;
		};
		["Beauty Set"]: Model & {
			Price: BillboardGui & {
				PriceLabel: TextButton & {
					UITextSizeConstraint: UITextSizeConstraint;
				};
			};
		};
		Conditioner: Model & {
			Price: BillboardGui & {
				PriceLabel: TextButton & {
					UITextSizeConstraint: UITextSizeConstraint;
				};
			};
		};
		["Premium Perfume"]: Model & {
			Price: BillboardGui & {
				PriceLabel: TextButton & {
					UITextSizeConstraint: UITextSizeConstraint;
				};
			};
		};
		["Pet Soap"]: Model & {
			Price: BillboardGui & {
				PriceLabel: TextButton & {
					UITextSizeConstraint: UITextSizeConstraint;
				};
			};
			MeshPart: MeshPart;
		};
		["Deluxe Hairspray"]: Model & {
			Price: BillboardGui & {
				PriceLabel: TextButton & {
					UITextSizeConstraint: UITextSizeConstraint;
				};
			};
		};
	};
	rbxts_include: Folder & {
		RuntimeLib: ModuleScript;
		Promise: ModuleScript;
		node_modules: Folder & {
			["string-utils"]: ModuleScript;
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
			profileservice: Folder & {
				src: ModuleScript;
			};
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
			["@rbxts"]: Folder & {
				["string-utils"]: ModuleScript;
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
				abbreviate: Folder & {
					src: ModuleScript & {
						commify: ModuleScript;
						numberToString: ModuleScript;
						setSetting: ModuleScript;
						numbersToSortedString: ModuleScript;
						stringToNumber: ModuleScript;
					};
				};
				profileservice: Folder & {
					src: ModuleScript;
				};
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
				gameanalytics: ModuleScript & {
					["gameanalytics-sdk"]: ModuleScript & {
						GameAnalyticsClient: ModuleScript;
						GameAnalytics: ModuleScript & {
							Logger: ModuleScript;
							Version: ModuleScript;
							HttpApi: ModuleScript & {
								HashLib: ModuleScript & {
									Base64: ModuleScript;
								};
							};
							GAErrorSeverity: ModuleScript;
							Utilities: ModuleScript;
							State: ModuleScript;
							Threading: ModuleScript;
							Events: ModuleScript;
							Postie: ModuleScript;
							Validation: ModuleScript;
							GAResourceFlowType: ModuleScript;
							Store: ModuleScript;
							GAProgressionStatus: ModuleScript;
						};
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
				flipper: Folder & {
					typings: Folder;
					src: ModuleScript & {
						isMotor: ModuleScript;
						Spring: ModuleScript;
						GroupMotor: ModuleScript;
						Signal: ModuleScript;
						SingleMotor: ModuleScript;
						Instant: ModuleScript;
						Linear: ModuleScript;
						BaseMotor: ModuleScript;
					};
				};
				datastore2: Folder & {
					src: ModuleScript & {
						IsPlayer: ModuleScript;
						Verifier: ModuleScript;
						DataStoreServiceRetriever: ModuleScript;
						SavingMethods: ModuleScript & {
							OrderedBackups: ModuleScript;
							Standard: ModuleScript;
						};
						Promise: ModuleScript;
						Settings: ModuleScript;
						TableUtil: ModuleScript;
						Constants: ModuleScript;
					};
				};
				services: ModuleScript;
				["roact-hooks"]: Folder & {
					src: ModuleScript & {
						createUseState: ModuleScript;
						createUseEffect: ModuleScript;
						createUseMemo: ModuleScript;
						dependenciesDifferent: ModuleScript;
						createUseValue: ModuleScript;
						createUseReducer: ModuleScript;
						createUseCallback: ModuleScript;
						createUseContext: ModuleScript;
						createUseBinding: ModuleScript;
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
				zirconium: Folder & {
					node_modules: Folder & {
						["@rbxts"]: Folder & {
							["rust-classes"]: Folder & {
								out: ModuleScript & {
									classes: Folder & {
										Vec: ModuleScript;
										Option: ModuleScript;
										OptionMut: ModuleScript;
										Result: ModuleScript;
										Iterator: ModuleScript;
									};
									util: Folder & {
										lazyLoad: ModuleScript;
										imports: ModuleScript;
										Range: ModuleScript;
										Unit: ModuleScript;
									};
								};
							};
						};
					};
					out: ModuleScript & {
						Runtime: Folder & {
							Runtime: ModuleScript;
							ScriptContext: ModuleScript;
							PlayerScriptContext: ModuleScript;
							Script: ModuleScript;
						};
						Functions: Folder & {
							BuiltInFunctions: ModuleScript;
						};
						Util: ModuleScript & {
							Symbol: ModuleScript;
						};
						Binder: ModuleScript;
						Data: Folder & {
							Userdata: ModuleScript;
							Range: ModuleScript;
							EnumItem: ModuleScript;
							Helpers: ModuleScript;
							Null: ModuleScript;
							UserFunction: ModuleScript;
							Stream: ModuleScript;
							Object: ModuleScript;
							LuauFunction: ModuleScript;
							Locals: ModuleScript;
							Enum: ModuleScript;
							Context: ModuleScript;
							Undefined: ModuleScript;
						};
						Ast: ModuleScript & {
							Syntax: Folder & {
								RichTextHighlighter: ModuleScript;
							};
							TextStream: ModuleScript;
							Lexer: ModuleScript;
							Parser: ModuleScript;
							Tokens: Folder & {
								Tokens: ModuleScript;
								Grammar: ModuleScript;
							};
							Validation: ModuleScript;
							Nodes: ModuleScript & {
								Guards: ModuleScript;
								Functions: ModuleScript;
								Enum: ModuleScript;
								Create: ModuleScript;
								NodeTypes: ModuleScript;
							};
							Definitions: Folder & {
								Definitions: ModuleScript;
							};
							ErrorStrings: ModuleScript;
							Utility: Folder & {
								PrettyPrintNodes: ModuleScript;
								NodeVisitor: ModuleScript;
							};
						};
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
				zircon: Folder & {
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
							t: Folder & {
								lib: Folder & {
									ts: ModuleScript;
								};
							};
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
							["roact-hooks"]: Folder & {
								src: ModuleScript & {
									createUseState: ModuleScript;
									createUseCallback: ModuleScript;
									createUseContext: ModuleScript;
									createUseValue: ModuleScript;
									createUseReducer: ModuleScript;
									createUseMemo: ModuleScript;
									createUseEffect: ModuleScript;
									createUseBinding: ModuleScript;
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
						};
					};
					out: ModuleScript & {
						Log: ModuleScript;
						Shared: Folder & {
							Lazy: ModuleScript;
							MapUtils: ModuleScript;
							typeId: ModuleScript;
							tsImportShim: ModuleScript;
							NetPermissionMiddleware: ModuleScript;
							Remotes: ModuleScript;
							Debugging: ModuleScript;
							Collections: ModuleScript;
						};
						BuiltIn: Folder & {
							EnumPrint: ModuleScript;
							Print: ModuleScript;
						};
						Services: ModuleScript & {
							ClientRegistryService: ModuleScript;
							LogService: ModuleScript;
							RegistryService: ModuleScript;
							DispatchService: ModuleScript;
							ClientDispatchService: ModuleScript;
						};
						Client: ModuleScript & {
							Components: Folder & {
								SyntaxTextBox: ModuleScript;
								Window: ModuleScript;
								Titlebar: ModuleScript;
								Output: ModuleScript;
								MultiSelectDropdown: ModuleScript;
								Dropdown: ModuleScript;
								StructuredLogMessage: ModuleScript;
								SearchTextBox: ModuleScript;
								Padding: ModuleScript;
								OutputMessage: ModuleScript;
								Icon: ModuleScript;
								ScrollView: ModuleScript;
							};
							UIKit: Folder & {
								ThemeContext: ModuleScript;
							};
							Format: ModuleScript & {
								ZirconStructuredMessageTemplate: ModuleScript;
							};
							BuiltInConsole: Folder & {
								UI: Folder & {
									DockedConsole: ModuleScript;
									TopbarMenu: ModuleScript;
								};
								Store: ModuleScript & {
									_reducers: Folder & {
										ConsoleReducer: ModuleScript;
									};
								};
								DelayAsync: ModuleScript;
							};
							Context: Folder & {
								ZirconContext: ModuleScript;
							};
							Types: ModuleScript;
						};
						Class: Folder & {
							Validators: Folder & {
								ZirconFuzzyPlayersValidator: ModuleScript;
								ZirconFuzzyPlayerValidator: ModuleScript;
								OptionalValidator: ModuleScript;
							};
							ZirconTypeValidator: ModuleScript;
							StatefulZirconValidator: ModuleScript;
							ZirconEnumBuilder: ModuleScript;
							ZirconNamespaceBuilder: ModuleScript;
							ZirconContext: ModuleScript;
							TypeUtilities: ModuleScript;
							ZirconNamespace: ModuleScript;
							ZirconFunctionBuilder: ModuleScript;
							ZirconGroupBuilder: ModuleScript;
							ZirconFunction: ModuleScript;
							ZirconClientConfigurationBuilder: ModuleScript;
							ZirconConfigurationBuilder: ModuleScript;
							ZirconEnumItem: ModuleScript;
							ZirconEnum: ModuleScript;
						};
						Server: ModuleScript & {
							Class: Folder & {
								ZirconGroup: ModuleScript;
								ZirconFunction: ModuleScript;
							};
						};
					};
				};
				["validate-tree"]: ModuleScript;
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
				t: Folder & {
					lib: Folder & {
						ts: ModuleScript;
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
				spring: ModuleScript;
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
				snapdragon: Folder & {
					src: ModuleScript & {
						objectAssign: ModuleScript;
						SnapdragonRef: ModuleScript;
						SnapdragonController: ModuleScript;
						Symbol: ModuleScript;
						t: ModuleScript;
						Maid: ModuleScript;
						Signal: ModuleScript;
					};
				};
				signal: ModuleScript;
				["lerp-functions"]: ModuleScript;
				["object-utils"]: ModuleScript;
				partcache: Folder & {
					out: ModuleScript & {
						Table: ModuleScript;
					};
				};
				["roact-hooked"]: Folder & {
					src: ModuleScript & {
						hoc: ModuleScript;
						Roact: ModuleScript;
						NoYield: ModuleScript;
						withHookDetection: ModuleScript;
						pureComponent: ModuleScript;
						hooks: ModuleScript;
					};
				};
				net: Folder & {
					out: ModuleScript & {
						definitions: ModuleScript & {
							ServerDefinitionBuilder: ModuleScript;
							NamespaceBuilder: ModuleScript;
							ClientDefinitionBuilder: ModuleScript;
							Types: ModuleScript;
						};
						messaging: Folder & {
							ExperienceBroadcastEvent: ModuleScript;
							MessagingService: ModuleScript;
						};
						client: ModuleScript & {
							ClientFunction: ModuleScript;
							ClientEvent: ModuleScript;
							ClientAsyncFunction: ModuleScript;
						};
						internal: ModuleScript & {
							validator: ModuleScript;
							tables: ModuleScript;
						};
						middleware: ModuleScript & {
							RateLimitMiddleware: ModuleScript & {
								throttle: ModuleScript;
							};
							LoggerMiddleware: ModuleScript;
							TypeCheckMiddleware: ModuleScript;
						};
						server: ModuleScript & {
							ServerEvent: ModuleScript;
							ServerAsyncFunction: ModuleScript;
							ServerFunction: ModuleScript;
							MiddlewareFunction: ModuleScript;
							NetServerScriptSignal: ModuleScript;
							CreateServerListener: ModuleScript;
							ServerMessagingEvent: ModuleScript;
							MiddlewareEvent: ModuleScript;
						};
					};
				};
				["compiler-types"]: Folder & {
					types: Folder;
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
			types: Folder & {
				include: Folder & {
					generated: Folder;
				};
			};
			gameanalytics: ModuleScript & {
				["gameanalytics-sdk"]: ModuleScript & {
					GameAnalyticsClient: ModuleScript;
					GameAnalytics: ModuleScript & {
						Logger: ModuleScript;
						Version: ModuleScript;
						HttpApi: ModuleScript & {
							HashLib: ModuleScript & {
								Base64: ModuleScript;
							};
						};
						GAErrorSeverity: ModuleScript;
						Utilities: ModuleScript;
						State: ModuleScript;
						Threading: ModuleScript;
						Events: ModuleScript;
						Postie: ModuleScript;
						Validation: ModuleScript;
						GAResourceFlowType: ModuleScript;
						Store: ModuleScript;
						GAProgressionStatus: ModuleScript;
					};
				};
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
					NoYield: ModuleScript;
					Roact: ModuleScript;
					hooks: ModuleScript;
					hoc: ModuleScript;
				};
			};
			services: ModuleScript;
			["roact-hooks"]: Folder & {
				src: ModuleScript & {
					createUseState: ModuleScript;
					createUseEffect: ModuleScript;
					createUseMemo: ModuleScript;
					dependenciesDifferent: ModuleScript;
					createUseValue: ModuleScript;
					createUseReducer: ModuleScript;
					createUseCallback: ModuleScript;
					createUseContext: ModuleScript;
					createUseBinding: ModuleScript;
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
			zirconium: Folder & {
				node_modules: Folder & {
					["@rbxts"]: Folder & {
						["rust-classes"]: Folder & {
							out: ModuleScript & {
								classes: Folder & {
									Vec: ModuleScript;
									Option: ModuleScript;
									OptionMut: ModuleScript;
									Result: ModuleScript;
									Iterator: ModuleScript;
								};
								util: Folder & {
									lazyLoad: ModuleScript;
									imports: ModuleScript;
									Range: ModuleScript;
									Unit: ModuleScript;
								};
							};
						};
					};
				};
				out: ModuleScript & {
					Runtime: Folder & {
						Runtime: ModuleScript;
						ScriptContext: ModuleScript;
						PlayerScriptContext: ModuleScript;
						Script: ModuleScript;
					};
					Functions: Folder & {
						BuiltInFunctions: ModuleScript;
					};
					Util: ModuleScript & {
						Symbol: ModuleScript;
					};
					Binder: ModuleScript;
					Data: Folder & {
						Userdata: ModuleScript;
						Range: ModuleScript;
						EnumItem: ModuleScript;
						Helpers: ModuleScript;
						Null: ModuleScript;
						UserFunction: ModuleScript;
						Stream: ModuleScript;
						Object: ModuleScript;
						LuauFunction: ModuleScript;
						Locals: ModuleScript;
						Enum: ModuleScript;
						Context: ModuleScript;
						Undefined: ModuleScript;
					};
					Ast: ModuleScript & {
						Syntax: Folder & {
							RichTextHighlighter: ModuleScript;
						};
						TextStream: ModuleScript;
						Lexer: ModuleScript;
						Parser: ModuleScript;
						Tokens: Folder & {
							Tokens: ModuleScript;
							Grammar: ModuleScript;
						};
						Validation: ModuleScript;
						Nodes: ModuleScript & {
							Guards: ModuleScript;
							Functions: ModuleScript;
							Enum: ModuleScript;
							Create: ModuleScript;
							NodeTypes: ModuleScript;
						};
						Definitions: Folder & {
							Definitions: ModuleScript;
						};
						ErrorStrings: ModuleScript;
						Utility: Folder & {
							PrettyPrintNodes: ModuleScript;
							NodeVisitor: ModuleScript;
						};
					};
				};
			};
			flipper: Folder & {
				typings: Folder;
				src: ModuleScript & {
					isMotor: ModuleScript;
					Spring: ModuleScript;
					GroupMotor: ModuleScript;
					Signal: ModuleScript;
					SingleMotor: ModuleScript;
					Instant: ModuleScript;
					Linear: ModuleScript;
					BaseMotor: ModuleScript;
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
			net: Folder & {
				out: ModuleScript & {
					definitions: ModuleScript & {
						ServerDefinitionBuilder: ModuleScript;
						NamespaceBuilder: ModuleScript;
						ClientDefinitionBuilder: ModuleScript;
						Types: ModuleScript;
					};
					messaging: Folder & {
						ExperienceBroadcastEvent: ModuleScript;
						MessagingService: ModuleScript;
					};
					client: ModuleScript & {
						ClientFunction: ModuleScript;
						ClientEvent: ModuleScript;
						ClientAsyncFunction: ModuleScript;
					};
					internal: ModuleScript & {
						validator: ModuleScript;
						tables: ModuleScript;
					};
					middleware: ModuleScript & {
						RateLimitMiddleware: ModuleScript & {
							throttle: ModuleScript;
						};
						LoggerMiddleware: ModuleScript;
						TypeCheckMiddleware: ModuleScript;
					};
					server: ModuleScript & {
						ServerEvent: ModuleScript;
						ServerAsyncFunction: ModuleScript;
						ServerFunction: ModuleScript;
						MiddlewareFunction: ModuleScript;
						NetServerScriptSignal: ModuleScript;
						CreateServerListener: ModuleScript;
						ServerMessagingEvent: ModuleScript;
						MiddlewareEvent: ModuleScript;
					};
				};
			};
			snapdragon: Folder & {
				src: ModuleScript & {
					objectAssign: ModuleScript;
					SnapdragonRef: ModuleScript;
					SnapdragonController: ModuleScript;
					Symbol: ModuleScript;
					t: ModuleScript;
					Maid: ModuleScript;
					Signal: ModuleScript;
				};
			};
			zircon: Folder & {
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
						t: Folder & {
							lib: Folder & {
								ts: ModuleScript;
							};
						};
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
						["roact-hooks"]: Folder & {
							src: ModuleScript & {
								createUseState: ModuleScript;
								createUseCallback: ModuleScript;
								createUseContext: ModuleScript;
								createUseValue: ModuleScript;
								createUseReducer: ModuleScript;
								createUseMemo: ModuleScript;
								createUseEffect: ModuleScript;
								createUseBinding: ModuleScript;
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
					};
				};
				out: ModuleScript & {
					Log: ModuleScript;
					Shared: Folder & {
						Lazy: ModuleScript;
						MapUtils: ModuleScript;
						typeId: ModuleScript;
						tsImportShim: ModuleScript;
						NetPermissionMiddleware: ModuleScript;
						Remotes: ModuleScript;
						Debugging: ModuleScript;
						Collections: ModuleScript;
					};
					BuiltIn: Folder & {
						EnumPrint: ModuleScript;
						Print: ModuleScript;
					};
					Services: ModuleScript & {
						ClientRegistryService: ModuleScript;
						LogService: ModuleScript;
						RegistryService: ModuleScript;
						DispatchService: ModuleScript;
						ClientDispatchService: ModuleScript;
					};
					Client: ModuleScript & {
						Components: Folder & {
							SyntaxTextBox: ModuleScript;
							Window: ModuleScript;
							Titlebar: ModuleScript;
							Output: ModuleScript;
							MultiSelectDropdown: ModuleScript;
							Dropdown: ModuleScript;
							StructuredLogMessage: ModuleScript;
							SearchTextBox: ModuleScript;
							Padding: ModuleScript;
							OutputMessage: ModuleScript;
							Icon: ModuleScript;
							ScrollView: ModuleScript;
						};
						UIKit: Folder & {
							ThemeContext: ModuleScript;
						};
						Format: ModuleScript & {
							ZirconStructuredMessageTemplate: ModuleScript;
						};
						BuiltInConsole: Folder & {
							UI: Folder & {
								DockedConsole: ModuleScript;
								TopbarMenu: ModuleScript;
							};
							Store: ModuleScript & {
								_reducers: Folder & {
									ConsoleReducer: ModuleScript;
								};
							};
							DelayAsync: ModuleScript;
						};
						Context: Folder & {
							ZirconContext: ModuleScript;
						};
						Types: ModuleScript;
					};
					Class: Folder & {
						Validators: Folder & {
							ZirconFuzzyPlayersValidator: ModuleScript;
							ZirconFuzzyPlayerValidator: ModuleScript;
							OptionalValidator: ModuleScript;
						};
						ZirconTypeValidator: ModuleScript;
						StatefulZirconValidator: ModuleScript;
						ZirconEnumBuilder: ModuleScript;
						ZirconNamespaceBuilder: ModuleScript;
						ZirconContext: ModuleScript;
						TypeUtilities: ModuleScript;
						ZirconNamespace: ModuleScript;
						ZirconFunctionBuilder: ModuleScript;
						ZirconGroupBuilder: ModuleScript;
						ZirconFunction: ModuleScript;
						ZirconClientConfigurationBuilder: ModuleScript;
						ZirconConfigurationBuilder: ModuleScript;
						ZirconEnumItem: ModuleScript;
						ZirconEnum: ModuleScript;
					};
					Server: ModuleScript & {
						Class: Folder & {
							ZirconGroup: ModuleScript;
							ZirconFunction: ModuleScript;
						};
					};
				};
			};
			["compiler-types"]: Folder & {
				types: Folder;
			};
			["validate-tree"]: ModuleScript;
			["promise-child"]: ModuleScript;
			partcache: Folder & {
				out: ModuleScript & {
					Table: ModuleScript;
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
			spring: ModuleScript;
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
			signal: ModuleScript;
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
			["@flamework"]: Folder & {
				core: Folder & {
					node_modules: Folder & {
						["@rbxts"]: Folder & {
							t: Folder & {
								lib: Folder & {
									ts: ModuleScript;
								};
							};
						};
					};
					out: ModuleScript & {
						reflect: ModuleScript;
						metadata: ModuleScript;
						modding: ModuleScript;
						flamework: ModuleScript;
					};
				};
				components: Folder & {
					node_modules: Folder & {
						["@rbxts"]: Folder & {
							t: Folder & {
								lib: Folder & {
									ts: ModuleScript;
								};
							};
						};
					};
					out: ModuleScript & {
						componentTracker: ModuleScript;
					};
				};
				networking: Folder & {
					node_modules: Folder & {
						["@rbxts"]: Folder & {
							t: Folder & {
								lib: Folder & {
									ts: ModuleScript;
								};
							};
						};
					};
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
			datastore2: Folder & {
				src: ModuleScript & {
					IsPlayer: ModuleScript;
					Verifier: ModuleScript;
					DataStoreServiceRetriever: ModuleScript;
					SavingMethods: ModuleScript & {
						OrderedBackups: ModuleScript;
						Standard: ModuleScript;
					};
					Promise: ModuleScript;
					Settings: ModuleScript;
					TableUtil: ModuleScript;
					Constants: ModuleScript;
				};
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
			["lerp-functions"]: ModuleScript;
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
			["object-utils"]: ModuleScript;
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
