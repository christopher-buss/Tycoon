import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { FormatCompact } from "@rbxts/format-number";
import { Janitor } from "@rbxts/janitor";
import { Logger } from "@rbxts/log";
import Roact from "@rbxts/roact";
import { Option } from "@rbxts/rust-classes";
import { Players } from "@rbxts/services";
import { PlayerHeadUi } from "shared/ui/world/player-head";
import { PlayerUtil } from "shared/util/player-util";
import { Tag } from "types/enum/tags";

interface IPlayerHeadModel extends MeshPart {}

@Component({
	tag: Tag.PlayerHead,
})
export class PlayerHead extends BaseComponent<{}, IPlayerHeadModel> implements OnStart {
	private player!: Player;
	private tree_opt: Option<Roact.Tree>;
	private playerGui: PlayerGui;

	private readonly janitor: Janitor<void>;

	constructor(private readonly logger: Logger) {
		super();
		this.tree_opt = Option.none<Roact.Tree>();

		this.janitor = new Janitor();

		this.playerGui = Players.LocalPlayer.WaitForChild("PlayerGui") as PlayerGui;

		PlayerUtil.getPlayerFromDescendant(this.instance).match(
			(player) => {
				this.player = player;
			},
			() => this.destroy(),
		);

		// assert(this.instance.ModelStreamingMode === Enum.ModelStreamingMode.Atomic);
	}

	public onStart(): void {
		const billboard = this.createInterface();
		this.setupInterface(billboard);
	}

	private createInterface(): Roact.Element {
		return PlayerHeadUi({
			Cash: "$" + FormatCompact((this.player.GetAttribute("Cash") as number) ?? 0, 2),
			Rebirths: ((this.player.GetAttribute("Rebirths") as number) ?? 0) + " rebirths",
			Instance: this.instance,
			Player: this.player,
		});
	}

	private setupInterface(billboard: Roact.Element): void {
		this.logger.Debug(`Mounting player head ui for ${this.player.Name}`);
		this.tree_opt = Option.wrap<Roact.Tree>(Roact.mount(billboard, this.playerGui, "PlayerHead"));

		this.janitor.Add(() => {
			if (this.tree_opt.isSome()) {
				this.logger.Debug(`Unmounting player head ui for ${this.player.Name}`);
				Roact.unmount(this.tree_opt.unwrap());
			}
		});
	}

	public destroy(): void {
		super.destroy();
		this.janitor.Destroy();
	}
}
