import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Janitor } from "@rbxts/janitor";
import { Logger } from "@rbxts/log";
import Roact from "@rbxts/roact";
import { Option } from "@rbxts/rust-classes";
import { Players } from "@rbxts/services";
import { IGamepassPromptModel } from "server/components/mtx/gamepass-prompt";
import GamepassBillboard from "shared/ui/world/gamepass";
import { Tag } from "types/enum/tags";

interface Attributes {
	Color?: Color3;
	DisplayName?: string;
}

@Component({
	tag: Tag.GamepassPrompt,
})
export class GamepassPrompt extends BaseComponent<Attributes, IGamepassPromptModel> implements OnStart {
	private readonly janitor: Janitor<void>;
	private tree_opt: Option<Roact.Tree>;

	constructor(private readonly logger: Logger) {
		super();
		this.janitor = new Janitor();
		this.tree_opt = Option.none<Roact.Tree>();
		assert(this.instance.ModelStreamingMode === Enum.ModelStreamingMode.Atomic);
	}

	public onStart(): void {
		const billboard = this.createInterface();
		this.setupInterface(billboard);
	}

	private createInterface(): Roact.Element {
		let displayName = this.attributes.DisplayName as string;
		if (displayName === undefined || displayName === "") {
			displayName = this.instance.Name;
		}

		const color = this.attributes.Color ?? Color3.fromRGB(255, 255, 255);

		return GamepassBillboard({
			Adornee: this.instance.Root,
			Color: color,
			DisplayName: displayName,
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
