import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Janitor } from "@rbxts/janitor";
import { PlayerUtil } from "shared/util/player-util";

/**
 * A component used to respawn the player on touch.
 *
 * This is so that the player cannot fall through the map, and instead are
 * respawned after a brief delay.
 */
@Component({
	tag: "RespawnPlayer",
})
export class RespawnPlayer extends BaseComponent<{}, BasePart> implements OnStart {
	private readonly janitor: Janitor<void>;

	constructor() {
		super();
		this.janitor = new Janitor<void>();
	}

	public onStart(): void {
		this.janitor.Add(this.instance.Touched.Connect((...args) => this.onTouched(...args)));
	}

	private onTouched(part: BasePart): void {
		const player_opt = PlayerUtil.getPlayerFromDescendant(part);
		if (player_opt.isNone()) {
			return;
		}

		const player = player_opt.unwrap();
		if (player.GetAttribute("Respawning") === true) {
			return;
		}

		player.SetAttribute("Respawning", true);

		player.Character?.BreakJoints();
		task.delay(0.5, () => {
			player.LoadCharacter();
			player.SetAttribute("Respawning", undefined);
		});
	}

	public destroy(): void {
		super.destroy();
		this.janitor.Destroy();
	}
}
