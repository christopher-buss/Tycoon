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

@Component({ tag: "PurchaseButton" })
export class PurchaseButton extends BaseComponent<Attributes, IPurchaseButtonModel> implements OnStart {
	private readonly janitor: Janitor<void>;
	private tree_opt: Option<Roact.Tree>;

	constructor(private readonly logger: Logger) {
		super();
		this.janitor = new Janitor();
		this.tree_opt = Option.none<Roact.Tree>();
	}

	private onStreamIn(primary: Instance): void {
		const billboard = purchaseButton({
			Adornee: primary as BasePart,
			DisplayName: this.instance.Name,
			Janitor: this.janitor,
		});

		this.tree_opt = Option.some<Roact.Tree>(
			Roact.mount(billboard, Players.LocalPlayer.FindFirstChildOfClass("PlayerGui"), this.instance.Name),
		);

		this.logger.Info(`Successfully mounted purchase button for ${this.instance.Name}`);

		this.janitor.Add(() => {
			if (this.tree_opt.isSome()) {
				Roact.unmount(this.tree_opt.unwrap());
				return;
			}
		});
	}

	private onStreamOut(): void {
		if (this.tree_opt.isSome()) {
			Roact.unmount(this.tree_opt.unwrap());
			return;
		}
	}

	onStart() {
		this.janitor.Add(
			observeChild(this.instance, "Primary", (primary) => {
				this.onStreamIn(primary);
				return () => this.onStreamOut();
			}),
		);
	}

	destroy(): void {
		super.destroy();
		this.janitor.Destroy();
	}
}
