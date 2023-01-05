import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Janitor } from "@rbxts/janitor";
import { Logger } from "@rbxts/log";
import Roact from "@rbxts/roact";
import { Option } from "@rbxts/rust-classes";
import { Players } from "@rbxts/services";
import { observeChild } from "@rbxts/streamable";
import timerButtonBillboard from "shared/ui/world/timer-button";
import { Tag } from "types/enum/tags";
import { IPurchaseButtonAttributes, IPurchaseButtonModel } from "types/interfaces/buttons";

const noop = (): void => {};

interface Attributes extends IPurchaseButtonAttributes {
	Time: number;
}

/**
 * A component that players in the game can touch to purchase corresponding
 * objects in the game. This client component is responsible for rendering ui
 * related to the purchase button.
 */
@Component({ tag: Tag.TimerButton })
export class TimerButton extends BaseComponent<Attributes, IPurchaseButtonModel> implements OnStart {
	private readonly janitor: Janitor<void>;
	private tree_opt: Option<Roact.Tree>;

	constructor(private readonly logger: Logger) {
		super();
		this.janitor = new Janitor();
		this.tree_opt = Option.none<Roact.Tree>();
	}

	public onStart(): void {
		this.janitor.Add(
			observeChild(this.instance, "TouchPart", () => {
				this.onStreamIn();
				return noop;
			}),
		);
	}

	/**
	 * Called internally when the purchase button is streamed in.
	 *
	 * @hidden
	 */
	private onStreamIn(): void {
		const billboard = this.createInterface();
		this.setupInterface(billboard);
	}

	/**
	 * Creates the user interface object for the purchase button.
	 * @returns the ui object.
	 */
	private createInterface(): Roact.Element {
		let displayName = this.attributes.DisplayName as string;
		if (displayName === undefined || displayName === "") {
			displayName = this.instance.Name;
		}

		let color = Color3.fromRGB(126, 126, 126);
		if (this.attributes.GamepassId !== undefined && this.attributes.GamepassId !== 0) {
			color = Color3.fromRGB(38, 255, 0);
		}

		this.janitor.Add(
			task.spawn(() => {
				while (this.attributes.Time > 0) {
					this.attributes.Time -= 1;
					task.wait(1);
				}
			}),
		);

		return timerButtonBillboard({
			Adornee: this.instance.TouchPart,
			Color: color,
			DisplayName: displayName,
			Janitor: this.janitor,
			Timer: this.attributes.Time,
		});
	}

	/**
	 * Binds the mount and unmount connections for the user interface.
	 * @param billboard The user interface object to bind.
	 */
	private setupInterface(billboard: Roact.Element): void {
		this.tree_opt = Option.some<Roact.Tree>(
			Roact.mount(billboard, Players.LocalPlayer.FindFirstChildOfClass("PlayerGui"), this.instance.Name),
		);

		this.janitor.Add(() => {
			if (this.tree_opt.isSome()) {
				Roact.unmount(this.tree_opt.unwrap());
				this.logger.Debug(`Successfully unmounted purchase button for ${this.instance.Name}`);
			}
		});
	}

	public destroy(): void {
		super.destroy();
		this.janitor.Destroy();
	}
}
