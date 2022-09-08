import { Controller, Flamework, OnInit, Reflect } from "@flamework/core";
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
	/** Show this app on a billboardgui if defined. */
	type?: "billboardgui";
	/** If this is specified then the root component will be connected to Rodux. */
	mapStateToProps?: (state: IClientStore) => unknown;
	mapDispatchToProps?: (dispatch: StoreDispatch) => unknown;
}

interface AppInfo {
	ctor: Constructor;
	identifier: string;
	config: IAppConfig;
}

export declare function App(opts: IAppConfig): ClassDecorator;

@Controller({})
export class UserInterfaceController implements OnInit {
	private appHandles = new Map<Constructor, Roact.Tree>();
	private apps = new Map<Constructor, AppInfo>();
	private playerGui = Players.LocalPlayer.FindFirstChildOfClass("PlayerGui")!;
	private tagConnections = new Set<string>();

	constructor(private readonly logger: Logger) {}

	onInit() {
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
		if (this.tagConnections.has(tag)) return;

		CollectionService.GetTagged(tag).forEach((i) => {
			return this.onTagAdded(tag, i);
		});
		CollectionService.GetInstanceAddedSignal(tag).Connect((i) => {
			return this.onTagAdded(tag, i);
		});
		// CollectionService.GetInstanceRemovedSignal(tag).Connect((i) => this.onTagRemoved(tag, i));

		this.logger.Debug(`Added connections for tag "{Tag}"`, tag);
		this.tagConnections.add(tag);
	}

	/** When an instance is added to a tag, we want to find out which apps render onto it. */
	private onTagAdded(tag: string, instance: Instance) {
		if (!instance.IsA("BasePart")) return;
		this.logger.Debug(`Instance "{Instance}" added to tag "{Tag}"`, instance.GetFullName(), tag);

		for (const [app, { config }] of this.apps) {
			if (config.tag !== tag) {
				continue;
			}

			this.showApp(app, instance);
			return;
		}
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

		const content = <StoreProvider store={ClientStore}>{Roact.createElement(component)}</StoreProvider>;

		const handle = Roact.mount(
			instance ? (
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
			) : (
				<screengui
					Key={config.name}
					DisplayOrder={config.displayOrder}
					IgnoreGuiInset={config.ignoreGuiInset}
					ResetOnSpawn={false}
					ZIndexBehavior={Enum.ZIndexBehavior.Sibling}
				>
					{content}
				</screengui>
			),
			this.playerGui,
			config.name,
		);

		this.appHandles.set(element, handle);
		this.logger.Debug(`Mounted new app instance "{Name}"`, config.name);
	}
}
