import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Janitor } from "@rbxts/janitor";
import { Logger } from "@rbxts/log";
import { Players } from "@rbxts/services";
import PlayerEntity from "server/modules/classes/player-entity";
import { Events } from "server/network";
import { OnPlayerJoin } from "server/services/player/player-service";
import { Tag } from "types/enum/tags";

interface ITeleportAttributes {}

interface ITeleportModel extends Model {
	Portal1: BasePart;
	Portal2: BasePart;
}

@Component({
	tag: Tag.Teleport,
})
export class Teleport extends BaseComponent<ITeleportAttributes, ITeleportModel> implements OnStart, OnPlayerJoin {
	private readonly janitor: Janitor;
	private debounce: Map<Player, boolean>;

	constructor(private readonly logger: Logger) {
		super();
		this.janitor = new Janitor();
		this.debounce = new Map();
	}

	public onPlayerJoin(playerEntity: PlayerEntity): void {
		this.debounce.set(playerEntity.player, false);

		playerEntity.playerRemoving.Add(() => {
			this.debounce.delete(playerEntity.player);
		});
	}

	public onStart(): void {
		this.janitor.Add(
			this.instance.Portal1.Touched.Connect((part) => this.onTeleportTouched(part, this.instance.Portal2)),
		);
		this.janitor.Add(
			this.instance.Portal2.Touched.Connect((part) => this.onTeleportTouched(part, this.instance.Portal1)),
		);
	}

	private onTeleportTouched(part: BasePart, otherPortal: BasePart): void {
		if (!part.IsA("BasePart")) {
			return;
		}

		const player = Players.GetPlayerFromCharacter(part.Parent);
		if (!player) {
			return;
		}

		if (this.debounce.get(player)) {
			return;
		}

		this.teleport(player, otherPortal);
	}

	public teleport(player: Player, otherPortal: BasePart): void {
		this.debounce.set(player, true);
		task.delay(2, () => {
			this.debounce.set(player, false);
		});

		this.logger.Debug(`Teleport ${player.Name} to ${otherPortal.Name}`);

		Events.playerTeleported.fire(player, new Vector3(0, math.rad(otherPortal.Orientation.Y - 90), 0));

		player.RequestStreamAroundAsync(otherPortal.Position, 1);

		player.Character?.PivotTo(otherPortal.CFrame);
	}
}
