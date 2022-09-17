import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Janitor } from "@rbxts/janitor";
import { Logger } from "@rbxts/log";
import Roact from "@rbxts/roact";
import { Option } from "@rbxts/rust-classes";
import { Players } from "@rbxts/services";
import { observeChild } from "@rbxts/streamable";
import purchaseButton from "shared/ui/world/purchase-button";
import { Attributes, IPurchaseButtonModel } from "types/interfaces/buttons";

/**
 * A component that players in the game can touch to purchase corresponding
 * objects in the game. This client component is responsible for rendering ui
 * related to the purchase button.
 */
@Component({ tag: "PurchaseButton" })
export class PurchaseButton extends BaseComponent<Attributes, IPurchaseButtonModel> implements OnStart {
	private readonly janitor: Janitor<void>;
	private tree_opt: Option<Roact.Tree>;

	constructor(private readonly logger: Logger) {
		super();
		this.janitor = new Janitor();
		this.tree_opt = Option.none<Roact.Tree>();
	}

	/** @hidden */
	public onStart() {
		this.janitor.Add(
			observeChild(this.instance, "Primary", (_primary) => {
				this.onStreamIn();
				return () => {};
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
		return purchaseButton({
			Adornee: this.instance.Primary as BasePart,
			DisplayName: this.instance.Name,
			Price: this.attributes.Price,
			Janitor: this.janitor,
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

		this.logger.Info(`Successfully mounted purchase button for ${this.instance.Name}`);

		this.janitor.Add(() => {
			if (this.tree_opt.isSome()) {
				Roact.unmount(this.tree_opt.unwrap());
				this.logger.Info(`Successfully unmounted purchase button for ${this.instance.Name}`);
				return;
			}
		});
	}

	public destroy(): void {
		super.destroy();
		this.janitor.Destroy();
	}
}