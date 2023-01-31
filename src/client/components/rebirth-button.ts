import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Janitor } from "@rbxts/janitor";
import { Logger } from "@rbxts/log";
import Roact from "@rbxts/roact";
import { Option } from "@rbxts/rust-classes";
import { Players } from "@rbxts/services";
import { observeChild } from "@rbxts/streamable";
import { RebirthButtonBillboard } from "shared/ui/world/rebirth-button";
import { Tag } from "types/enum/tags";
import { IRebirthButtonAttributes, IRebirthButtonModel } from "types/interfaces/buttons";

@Component({
	tag: Tag.RebirthButton,
})
export class RebirthButton extends BaseComponent<IRebirthButtonAttributes, IRebirthButtonModel> implements OnStart {
	private tree_opt: Option<Roact.Tree>;
	private playerGui: PlayerGui;

	private readonly janitor: Janitor<void>;

	constructor(private readonly logger: Logger) {
		super();
		this.tree_opt = Option.none<Roact.Tree>();
		this.janitor = new Janitor();
		this.playerGui = Players.LocalPlayer.WaitForChild("PlayerGui") as PlayerGui;
	}

	public onStart(): void {
		this.janitor.Add(
			observeChild(this.instance, "TouchPart", () => {
				this.onStreamIn();
				return (): void => {};
			}),
		);
	}

	private onStreamIn(): void {
		const billboard = this.createInterface();
		this.setupInterface(billboard);
	}

	private createInterface(): Roact.Element {
		return RebirthButtonBillboard({
			ButtonsOwned: Players.LocalPlayer.GetAttribute("ButtonsOwned") as number,
			ButtonsToBuy: Players.LocalPlayer.GetAttribute("ButtonsToBuy") as number,
			Instance: this.instance.Text,
		});
	}

	private setupInterface(billboard: Roact.Element): void {
		this.logger.Debug(`Mounting rebirth button ui`);
		this.tree_opt = Option.wrap<Roact.Tree>(Roact.mount(billboard, this.playerGui, "PlayerHead"));

		this.janitor.Add(() => {
			if (this.tree_opt.isSome()) {
				this.logger.Debug(`Unmounting rebirth button`);
				Roact.unmount(this.tree_opt.unwrap());
			}
		});
	}
}
