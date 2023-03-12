import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Janitor } from "@rbxts/janitor";
import { Logger } from "@rbxts/log";
import Roact from "@rbxts/roact";
import { Option } from "@rbxts/rust-classes";
import { CollectionService, Players } from "@rbxts/services";
import purchaseButton from "shared/ui/world/purchase-button";
import { Tag } from "types/enum/tags";
import { IPurchaseButtonAttributes, IPurchaseButtonModel } from "types/interfaces/buttons";
import { ILotModel } from "types/interfaces/lots";

/**
 * A component that players in the game can touch to purchase corresponding
 * objects in the game. This client component is responsible for rendering ui
 * related to the purchase button.
 */
@Component({
	tag: Tag.PurchaseButton,
})
export class PurchaseButton extends BaseComponent<IPurchaseButtonAttributes, IPurchaseButtonModel> implements OnStart {
	private readonly janitor: Janitor<void>;
	private tree_opt: Option<Roact.Tree>;

	constructor(private readonly logger: Logger) {
		super();
		this.janitor = new Janitor();
		this.tree_opt = Option.none<Roact.Tree>();
		assert(this.instance.ModelStreamingMode === Enum.ModelStreamingMode.Atomic);
	}

	public async onStart(): Promise<void> {
		if (!(await this.instantiationCheck())) {
			this.destroy();
			return;
		}

		if (CollectionService.HasTag(this.instance, Tag.TimerButton)) {
			return;
		}

		const billboard = this.createInterface();
		this.setupInterface(billboard);
	}

	private async instantiationCheck(): Promise<boolean> {
		return new Promise((resolve) => {
			const owner = this.instance.Parent?.Parent as ILotModel;
			assert(owner, "Owner is undefined");

			const lot = Players.LocalPlayer.GetAttribute("Lot") as string;
			if (lot !== undefined) {
				resolve(owner.Name === lot);
				return;
			}

			this.janitor.Add(
				Players.LocalPlayer.GetAttributeChangedSignal("Lot").Once(() => {
					resolve(owner.Name === (Players.LocalPlayer.GetAttribute("Lot") as string));
				}),
			);
		});
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

		let color = this.instance.TouchPart.Color;
		let price = this.attributes.Price === 0 ? "FREE" : "$" + tostring(this.attributes.Price);
		if (this.attributes.GamepassId !== undefined && this.attributes.GamepassId !== 0) {
			color = Color3.fromRGB(38, 255, 0);
			price = this.attributes.Price + "R$";
		}

		return purchaseButton({
			Adornee: this.instance.TouchPart,
			Color: color,
			DisplayName: displayName,
			Janitor: this.janitor,
			Price: price,
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
				this.logger.Verbose(`Successfully unmounted purchase button for ${this.instance.Name}`);
			}
		});
	}

	public destroy(): void {
		super.destroy();
		this.janitor.Destroy();
	}
}
