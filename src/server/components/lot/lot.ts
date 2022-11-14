import { BaseComponent, Component, Components } from "@flamework/components";
import { Dependency, OnStart } from "@flamework/core";
import { Logger } from "@rbxts/log";
import { Option, Result } from "@rbxts/rust-classes";
import { HttpService, Players, Teams } from "@rbxts/services";
import { PlayerService } from "server/services/player/player-service";
import { LotService } from "server/services/tycoon/lot-service";
import {
	DecodePartIdentifier,
	decoderPartIdentifiers,
	EncodePartIdentifier,
	encoderPartIdentifiers,
} from "shared/meta/part-identifiers";
import { ILotAttributes, ILotModel, LotErrors } from "types/interfaces/lots";
import { PurchaseButton } from "./purchase-button";

/**
 * A component that is assigned to each lot in the game.
 */
@Component({ tag: "Lot" })
export class Lot extends BaseComponent<ILotAttributes, ILotModel> implements OnStart {
	private readonly team: Team;
	public readonly name: string;
	public readonly position: Vector3;

	private objectsWithDependencies: Array<PurchaseButton>;

	public constructor(
		private readonly logger: Logger,
		private readonly lotService: LotService,
		private readonly playerService: PlayerService,
	) {
		super();

		this.team = Teams.FindFirstChild(this.instance.Name) as Team;
		assert(this.team !== undefined, `Team ${this.instance.Name} does not exist`);

		this.name = this.team.Name;
		this.position = this.instance.ReplicationPart.Position;

		this.objectsWithDependencies = [];
	}

	/** @hidden */
	public onStart() {
		// Generate an identifier for the lot.
		this.attributes.ComponentId = HttpService.GenerateGUID(false);
		this.clearOwnedButtons();
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
						this.lotService.fireOnLotOwned(this);
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
	 * Removes the current owner of the lot.
	 *
	 * @returns true if the owner was successfully removed, else returns the
	 * reason why the owner could not be removed.
	 */
	public clearOwner(): Result<true, LotErrors> {
		this.logger.Info(`Attempting to clear owner of lot {@Lot}`, this.attributes.ComponentId!);
		return this.getOwner().match(
			() => {
				this.attributes.OwnerId = undefined;
				this.setupGui();
				task.spawn(() => this.clearOwnedButtons());
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

	private clearOwnedButtons(): void {
		const buttons = this.instance.Buttons.GetChildren();

		buttons.forEach((button) => {
			const buttonComponent = Dependency<Components>().getComponent<PurchaseButton>(button);
			if (!buttonComponent) {
				// this.logger.Error("Could not find purchase button component for {@Button}", button);
				return;
			}

			buttonComponent.unbindButtonTouched();
		});
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
		player.SetAttribute("Lot", this.team.Name);
		this.loadPurchaseButtons(player);
		this.setupGui(player);
		player.LoadCharacter();
	}

	private setupGui(player?: Player): void {
		this.instance.Essentials.Claim.Gui.PlayerName.Text = player?.Name ?? "Unclaimed";
	}

	/**
	 * Add any owned items for the player to the tycoon.
	 * @param player
	 */
	public loadPurchaseButtons(player: Player): void {
		const entity_opt = this.playerService.getEntity(player);
		if (!entity_opt.isSome()) {
			return;
		}

		const playerEntity = entity_opt.unwrap();
		playerEntity.data.purchased.forEach((encoded) => {
			const decoded = decoderPartIdentifiers[encoded as keyof DecodePartIdentifier];
			if (decoded === undefined) {
				this.logger.Error("Could not decode part identifier {@Identifier}", encoded);
				return;
			}

			const button = this.instance.Buttons.FindFirstChild(decoded) as BasePart | undefined;
			if (!button) {
				return;
			}

			const buttonComponent = Dependency<Components>().getComponent<PurchaseButton>(button);
			if (!buttonComponent) {
				this.logger.Error("Could not find purchase button component for {@Button}", button);
				return;
			}

			buttonComponent.purchased = true;

			// Add the corresponding item to the tycoon.
			buttonComponent.unbindButtonTouched();
			for (const listener of buttonComponent.listeners) {
				task.spawn(() => {
					listener.onPurchaseButtonBought(player, buttonComponent.janitor);
				});
			}
		});

		const buttons = this.instance.Buttons.GetChildren();
		const nonOwnedButtons = buttons.filter((button) => {
			const encoded = encoderPartIdentifiers[button.Name as keyof EncodePartIdentifier];
			if (encoded === undefined) {
				this.logger.Warn("Could not encode part identifier {@Identifier}", button.Name);
				return;
			}

			return !playerEntity.data.purchased.includes(encoded);
		});

		nonOwnedButtons.forEach((button) => {
			const buttonComponent = Dependency<Components>().getComponent<PurchaseButton>(button);
			if (!buttonComponent) {
				this.logger.Error("Could not find purchase button component for {@Button}", button);
				return;
			}

			const dependency = buttonComponent.attributes.Dependency;
			if (dependency !== undefined && dependency !== "") {
				this.objectsWithDependencies.push(buttonComponent);
			}

			buttonComponent.bindButtonTouched();
		});

		this.objectsWithDependencies.forEach((buttonComponent) => {
			const dependency = buttonComponent.attributes.Dependency;
			for (const button of buttons) {
				if (button.Name === dependency) {
					const dependencyButton = Dependency<Components>().getComponent<PurchaseButton>(button);
					if (!dependencyButton) {
						this.logger.Error("Could not find purchase button component for {@Button}", button);
						return;
					}

					if (!dependencyButton.purchased) {
						buttonComponent.unbindButtonTouched();
					}

					dependencyButton.addDependency(buttonComponent);
					return;
				}
			}
		});
	}
}
