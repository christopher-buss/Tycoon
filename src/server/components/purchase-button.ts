import { BaseComponent, Component } from "@flamework/components";
import { Modding, OnStart } from "@flamework/core";
import { Janitor } from "@rbxts/janitor";
import { Logger } from "@rbxts/log";
import { RunService } from "@rbxts/services";
import Spring from "@rbxts/spring";
import { FlameworkUtil } from "shared/util/flamework-utils";
import { lerpNumber } from "shared/util/math-util";
import { PlayerUtil } from "shared/util/player-util";
import { Attributes, IPurchaseButtonModel } from "types/interfaces/buttons";
import { Lot } from "./lot";

export interface IOnPurchaseButtonBought {
	onPurchaseButtonBought: () => void;
}

/**
 * A button component that can be touched by a player to purchased a specified
 * linked object.
 */
@Component({ tag: "PurchaseButton" })
export class PurchaseButton extends BaseComponent<Attributes, IPurchaseButtonModel> implements OnStart {
	private debounce: boolean;
	private readonly janitor: Janitor<{ Visibility: string | RBXScriptConnection }>;
	private readonly touchPart: BasePart;

	private readonly dependencies: Array<string>;
	private lot!: Lot;

	private listeners = new Set<IOnPurchaseButtonBought>();

	constructor(private readonly logger: Logger) {
		super();
		this.attributes.DisplayName = this.instance.Name;
		this.attributes.Price = 0; // prices[this.LinkedComponentId]; ?
		this.debounce = false;
		this.dependencies = [];
		this.janitor = new Janitor();
		this.touchPart = this.instance.Primary;
	}

	onStart() {
		FlameworkUtil.waitForComponentOnInstance<Lot>(this.instance.Parent?.Parent as Model).andThen((component) => {
			assert(component !== undefined, "Lot is undefined");
			this.lot = component;
		});

		if (!this.dependencies.isEmpty()) {
			this.bindButtonTouched();
			return;
		}

		Modding.onListenerAdded<IOnPurchaseButtonBought>((object) => {
			this.listeners.add(object);
		});

		Modding.onListenerRemoved<IOnPurchaseButtonBought>((object) => {
			this.listeners.delete(object);
		});

		// Don't have this onStart, only have it when a player owns a tycoon and doesn't own the linked component
		this.bindButtonTouched();
	}

	private bindButtonTouched(): void {
		this.instance.Primary.CanTouch = true;
		this.forceButtonVisible();
		this.janitor.Add(() => {
			this.touchPart.Touched.Connect((otherPart) => this.onComponentTouched(otherPart));
		});
	}

	/** @hidden */
	private onComponentTouched(part: BasePart): void {
		if (this.debounce) {
			return;
		}

		this.debounce = true;

		const player_opt = PlayerUtil.getPlayerFromDescendant(part);
		if (player_opt.isNone()) {
			this.debounce = false;
			return;
		}

		const player = player_opt.unwrap();
		if (!this.lot.getOwner().isSome() || this.lot.getOwner().unwrap().UserId !== player.UserId) {
			this.debounce = false;
			return;
		}

		this.logger.Info("{ComponentId} purchased by {@Player}", this.attributes.LinkedComponentId, player);

		this.hideButton().finally(() => {
			// this.destroy();
			print("Button Invisible");

			for (const listener of this.listeners) {
				task.spawn(() => {
					listener.onPurchaseButtonBought();
				});
			}
		});
	}

	/** @hidden */
	// TODO: Should this be done on a client-component?
	private async setButtonVisibility(visible: boolean, force: boolean): Promise<void> {
		const goal = visible ? 0 : 1;
		const base = visible ? 1 : 0;

		if (force) {
			this.touchPart.Transparency = goal;
			this.touchPart.CanCollide = visible;
			return;
		}

		this.touchPart.Transparency = base;
		this.touchPart.CanCollide = visible;

		const spring = new Spring<number>(base, 5, goal, 1);

		this.janitor.Add(
			RunService.Heartbeat.Connect((deltaTime) => {
				const position = spring.update(deltaTime);
				this.touchPart.Transparency = lerpNumber(base, goal, position);

				if ((goal === 1 && position > 0.99) || (goal === 0 && position < 0.01)) {
					this.janitor.Remove("Visibility");
				}
			}),
			"Disconnect",
			"Visibility",
		);

		this.touchPart.Transparency = goal;
		this.touchPart.CanCollide = visible;
	}

	/** Show the purchase button using a transparency lerp. */
	private showButton(): Promise<void> {
		return this.setButtonVisibility(true, true);
	}

	/** Hide the purchase button using a transparency lerp. */
	private hideButton(): Promise<void> {
		return this.setButtonVisibility(false, false);
	}

	/** Show the purchase button instantaneously. */
	private forceButtonVisible(): Promise<void> {
		return this.setButtonVisibility(true, true);
	}

	/** Hide the purchase button instantaneously. */
	private forceButtonHidden(): Promise<void> {
		return this.setButtonVisibility(false, true);
	}

	/** @override */
	public destroy(): void {
		this.janitor.Destroy();
		super.destroy();
	}
}
