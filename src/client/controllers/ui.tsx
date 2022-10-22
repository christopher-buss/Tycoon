import { Controller, Flamework, Modding, OnStart, Reflect } from "@flamework/core";
import { Logger } from "@rbxts/log";
import Roact from "@rbxts/roact";
import RoactRodux, { StoreProvider } from "@rbxts/roact-rodux";
import Rodux from "@rbxts/rodux";
import { CollectionService, Players } from "@rbxts/services";
import { ClientStore, IClientStore, StoreActions } from "client/rodux/rodux";
import { DecoratorMetadata } from "types/interfaces/flamework";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ClassDecorator = (ctor: any) => any;
type Constructor<T = Roact.Component> = new (...args: never[]) => T;

const noop = () => {};

export type StoreDispatch = Rodux.Dispatch<StoreActions>;

export interface IAppConfig {
	/** Debug name for app. */
	name: string;
	/** Display order of Surface/ScreenGui. */
	displayOrder?: number;
	/** Ignore topbar inset if rendering with a ScreenGui. */
	ignoreGuiInset?: boolean;
	/** Show this app on any part with this CollectionService tag. */
	tag?: string;
	/** If this is specified then the root component will be connected to Rodux. */
	mapStateToProps?: (state: IClientStore) => unknown;
	mapDispatchToProps?: (dispatch: StoreDispatch) => unknown;

	/** This only needs to be set if an instance is present and the gui is not a surface gui. */
	useSurfaceGui?: boolean;
}

interface AppInfo {
	ctor: Constructor;
	identifier: string;
	config: IAppConfig;
}

export interface IPassedProps {
	instance?: BasePart;
}

// export declare function App(opts: IAppConfig): ClassDecorator;

export const App = Modding.createMetaDecorator<[IAppConfig]>("Class");

@Controller({})
export class UserInterfaceController implements OnStart {
	private appHandles = new Map<Constructor, Roact.Tree>();
	private apps = new Map<Constructor, AppInfo>();
	private playerGui = Players.LocalPlayer.FindFirstChildOfClass("PlayerGui")!;
	private tagConnections = new Set<string>();

	constructor(private readonly logger: Logger) {}

	public onStart(): void {
		for (const [ctor, identifier] of Reflect.objToId) {
			const app = Reflect.getOwnMetadata<DecoratorMetadata<IAppConfig>>(
				ctor,
				`flamework:decorators.${Flamework.id<typeof App>()}`,
			);

			if (app) {
				const config = app.arguments[0];

				this.apps.set(ctor as Constructor, {
					ctor: ctor as Constructor,
					config,
					identifier,
				});

				if (config.tag !== undefined) {
					this.setupTagConnections(config.tag);
				}
			}
		}
	}

	/** Setup CollectionService connections for a specific tag. */
	private setupTagConnections(tag: string) {
		if (this.tagConnections.has(tag)) {
			return;
		}

		CollectionService.GetTagged(tag).forEach((i) => {
			return this.onTagAdded(tag, i);
		});

		CollectionService.GetInstanceAddedSignal(tag).Connect((i) => {
			return this.onTagAdded(tag, i);
		});

		CollectionService.GetInstanceRemovedSignal(tag).Connect((i) => {
			return this.onTagRemoved(tag, i);
		});

		this.logger.Debug(`Added connections for tag "{Tag}"`, tag);
		this.tagConnections.add(tag);
	}

	/** When an instance is added to a tag, we want to find out which apps render onto it. */
	private onTagAdded(tag: string, instance: Instance) {
		if (!instance.IsA("BasePart")) {
			return;
		}

		this.logger.Debug(`Instance "{Instance}" added to tag "{Tag}"`, instance.GetFullName(), tag);

		for (const [app, { config }] of this.apps) {
			if (config.tag !== tag) {
				continue;
			}

			this.showApp(app, instance);
			return;
		}
	}

	/** Unmount any apps which are connected to a dead instance. */
	private onTagRemoved(tag: string, instance: Instance) {
		this.logger.Debug(`Instance "${instance.GetFullName()}" removed from tag "${tag}"`);
		this.tagConnections.delete(tag);
	}

	private showApp(element: Constructor, instance?: BasePart): void {
		const { config } = this.apps.get(element)!;

		let component = element as unknown as Roact.FunctionComponent;
		if (config.mapStateToProps || config.mapDispatchToProps) {
			const mapStateToProps = config.mapStateToProps || noop;
			const mapDispatchToProps = config.mapDispatchToProps || noop;

			component = RoactRodux.connect(
				(state: IClientStore) => mapStateToProps(state),
				(dispatch: StoreDispatch) => mapDispatchToProps(dispatch),
			)(component);
		}

		const content = (
			<StoreProvider store={ClientStore}>
				{Roact.createElement<IPassedProps>(component, { instance })}
			</StoreProvider>
		);

		let gui: Roact.Element;

		if (instance) {
			if (!config.useSurfaceGui) {
				gui = content;
			} else {
				gui = (
					<surfacegui
						Key={config.name}
						Adornee={instance}
						LightInfluence={1}
						ResetOnSpawn={false}
						ZIndexBehavior={Enum.ZIndexBehavior.Sibling}
						SizingMode={Enum.SurfaceGuiSizingMode.PixelsPerStud}
						PixelsPerStud={50}
					>
						{content}
					</surfacegui>
				);
			}
		} else {
			gui = (
				<screengui
					Key={config.name}
					DisplayOrder={config.displayOrder}
					IgnoreGuiInset={config.ignoreGuiInset}
					ResetOnSpawn={false}
					ZIndexBehavior={Enum.ZIndexBehavior.Sibling}
				>
					{content}
				</screengui>
			);
		}

		const handle = Roact.mount(gui, this.playerGui, config.name);

		this.appHandles.set(element, handle);
		this.logger.Debug(`Mounted new app instance "{Name}"`, config.name);
	}
}
