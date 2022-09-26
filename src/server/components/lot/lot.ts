import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Logger } from "@rbxts/log";
import { Option, Result } from "@rbxts/rust-classes";
import { HttpService, Players, Teams } from "@rbxts/services";
import { LotService } from "server/services/lot-service";
import { ILotAttributes, ILotModel, LotErrors } from "types/interfaces/lots";

/**
 * A component that is assigned to each lot in the game.
 */
@Component({ tag: "Lot" })
export class Lot extends BaseComponent<ILotAttributes, ILotModel> implements OnStart {
	private readonly team: Team;

	public constructor(private readonly logger: Logger, private readonly lotService: LotService) {
		super();
		this.team = Teams.FindFirstChild(this.instance.Name) as Team;
	}

	/** @hidden */
	public onStart() {
		// Generate an identifier for the lot.
		this.attributes.ComponentId = HttpService.GenerateGUID(false);
	}

	/**
	 * Attempts to assign a given player as the new owner of the lot.
	 *
	 * @param player Player instance to assign as the new owner.
	 *
	 * @returns True if the player was successfully assigned as the new owner,
	 * else returns the reason why the player could not be assigned as the
	 * owner.
	 */
	public assignOwner(player: Player): Result<true, LotErrors> {
		this.logger.Info("Attempting to assign {@Player} to a new lot", player, this.attributes.ComponentId!);
		return this.getOwner().match(
			() => Result.err<true, LotErrors>(LotErrors.LotOwned),
			() => {
				return this.lotService.getLotFromPlayer(player).match(
					() => Result.err<true, LotErrors>(LotErrors.PlayerAlreadyHasLot),
					() => {
						this.attributes.OwnerId = player.UserId;
						task.spawn(() => {
							this.setupOwner(player);
						});
						return Result.ok<true, LotErrors>(true);
					},
				);
			},
		);
	}

	/**
	 * Initializes the owner of the lot after they have been assigned.
	 *
	 * @param player the new owner of the lot.
	 */
	private setupOwner(player: Player): void {
		player.RequestStreamAroundAsync(this.instance.Spawn.Position);
		player.RespawnLocation = this.instance.Spawn;
		player.Team = this.team;
		player.LoadCharacter();
	}

	/**
	 * Removes the current owner of the lot.
	 *
	 * @returns true if the owner was successfully removed, else returns the
	 * reason why the owner could not be removed.
	 */
	public clearOwner(): Result<true, LotErrors> {
		this.logger.Info("Attempting to remove lot owner", this.attributes.ComponentId!);
		return this.getOwner().match(
			() => {
				this.attributes.OwnerId = undefined;
				return Result.ok<true, LotErrors>(true);
			},
			() => Result.err<true, LotErrors>(LotErrors.ClearOwnership),
		);
	}

	/**
	 * Get the current owner of the lot.
	 *
	 * @returns Player instance if there is an owner.
	 */
	public getOwner(): Option<Player> {
		// Usually we would just use GetPlayers(), but this does not
		// necessarily work when using Roblox test players - errors have been
		// observed when these players leave the game. Therefore for testing
		// purposes this approach is being used.
		for (const player of Players.GetChildren()) {
			if (player.IsA("Player")) {
				if (player.UserId === this.attributes.OwnerId) {
					return Option.some<Player>(player);
				}
			}
		}

		return Option.none<Player>();
	}
}
