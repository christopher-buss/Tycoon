import { BaseComponent, Component, Components } from "@flamework/components";
import { Dependency, OnStart } from "@flamework/core";
import { Logger } from "@rbxts/log";
import { Option, Result } from "@rbxts/rust-classes";
import { Players, Teams } from "@rbxts/services";
import { default as PlayerEntity } from "server/modules/classes/player-entity";
import { LotService } from "server/services/tycoon/lot-service";
import {
	DecodePartIdentifier,
	decoderPartIdentifiers,
	EncodePartIdentifier,
	encoderPartIdentifiers,
} from "shared/meta/part-identifiers";
import { Tag } from "types/enum/tags";
import { ILotAttributes, ILotModel, LotErrors } from "types/interfaces/lots";

import { PurchaseButton } from "./purchase-button";

/**
 * A component that is assigned to each lot in the game.
 *
 * This component is responsible for handling any functionality related to the
 * setup and teardown of lots.
 */
@Component({
	tag: Tag.Lot,
})
export class Lot extends BaseComponent<ILotAttributes, ILotModel> implements OnStart {
	public readonly name: string;
	public readonly position: Vector3;

	private readonly team: Team;

	constructor(private readonly logger: Logger, private readonly lotService: LotService) {
		super();

		print("STARTING LOT");

		this.position = this.instance.Spawn.Position;

		this.team = Teams.FindFirstChild(this.instance.Name) as Team;
		assert(this.team !== undefined, `Team ${this.instance.Name} does not exist`);

		this.name = this.team.Name;
		// this.position = this.instance.ReplicationPart.Position;
	}

	/** @hidden */
	public onStart(): void {
		this.clearOwnedButtons();
	}

	/**
	 * Attempts to assign a given player as the new owner of the lot.
	 *
	 * @param playerEntity Player class to assign as the new owner.
	 *
	 * @returns True if the player was successfully assigned as the new owner,
	 * else returns the reason why the player could not be assigned as the
	 * owner.
	 */
	public assignOwner(playerEntity: PlayerEntity): Result<true, LotErrors> {
		const player = playerEntity.player;
		this.logger.Info(`Attempting to assign ${player} to a new lot ${this.name}`);
		return this.getOwner().match(
			() => Result.err<true, LotErrors>(LotErrors.LotOwned),
			() => {
				return this.lotService.getLotFromPlayer(player).match(
					() => Result.err<true, LotErrors>(LotErrors.PlayerAlreadyHasLot),
					() => {
						this.attributes.OwnerId = player.UserId;
						this.lotService.fireOnLotOwned(this);
						task.spawn(() => {
							this.setupOwner(playerEntity);
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
		this.logger.Info(`Attempting to clear owner of lot ${this.name}`);
		return this.getOwner().match(
			() => {
				this.attributes.OwnerId = undefined;
				// this.setupGui();
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

	/**
	 * Initializes the owner of the lot after they have been assigned.
	 *
	 * @param player the new owner of the lot.
	 */
	private setupOwner(playerEntity: PlayerEntity): void {
		const player = playerEntity.player;
		player.RequestStreamAroundAsync(this.position);
		player.RespawnLocation = this.instance.Spawn;
		player.Team = this.team;
		player.SetAttribute("Lot", this.team.Name);
		this.loadPurchaseButtons(playerEntity);
		// this.setupGui(player);
		player.LoadCharacter();
	}

	/**
	 *
	 */
	private clearOwnedButtons(): void {
		const buttons = this.instance.Buttons.GetChildren();

		buttons.forEach((button) => {
			const buttonComponent = Dependency<Components>().getComponent<PurchaseButton>(button);
			if (!buttonComponent) {
				this.logger.Error(`Button ${button} does not have a PurchaseButton component`);
				return;
			}

			buttonComponent.unbindButtonTouched(true);
		});
	}

	/**
	 * Sets up the GUI for the lot.
	 *
	 * If the player is not provided, then the GUI will be set as "Unclaimed".
	 * @param playerName The potential name of the player.
	 */
	// private setupGui(player?: Player): void {
	// 	const claimPart = this.instance.Essentials.Claim;

	// 	if (player !== undefined) {
	// 		claimPart.Unclaimed.Enabled = false;
	// 		claimPart.Claimed.Enabled = true;
	// 		claimPart.Claimed.TextBox.Username.Text = `${player.Name}'s`;
	// 		claimPart.Claimed.IconBox.PlayerIcon.Image = `rbxthumb://type=AvatarHeadShot&id=${player.UserId}&w=420&h=420`;
	// 	} else {
	// 		claimPart.Unclaimed.Enabled = true;
	// 		claimPart.Claimed.Enabled = false;
	// 	}
	// }

	/**
	 * Add any owned items for the player to the tycoon.
	 * @param playerEntity
	 */
	public loadPurchaseButtons(playerEntity: PlayerEntity): void {
		this.handleOwnedItems(playerEntity, playerEntity.player);

		const buttons = this.instance.Buttons.GetChildren();
		const nonOwnedButtons = this.getNonOwnedButtons(buttons, playerEntity);
		const objectsWithDependencies = this.handleNonOwnedButtons(nonOwnedButtons);
		objectsWithDependencies.forEach((buttonComponent) => {
			const dependency = buttonComponent.attributes.Dependency;
			for (const button of buttons) {
				if (button.Name === dependency) {
					const dependencyButton = Dependency<Components>().getComponent<PurchaseButton>(button);
					if (!dependencyButton) {
						this.logger.Error(`Could not find purchase button component for ${button}`);
						return;
					}

					if (!dependencyButton.purchased) {
						buttonComponent.unbindButtonTouched(true);
					}

					dependencyButton.addDependency(buttonComponent);
					return;
				}
			}
		});
	}

	/**
	 *
	 * @param playerEntity
	 * @param player
	 */
	private handleOwnedItems(playerEntity: PlayerEntity, player: Player): void {
		playerEntity.data.purchased.forEach((encoded) => {
			const decoded = decoderPartIdentifiers[encoded as keyof DecodePartIdentifier];
			if (decoded === undefined) {
				this.logger.Error(`Could not decode part identifier ${encoded}`);
				return;
			}

			const button = this.instance.Buttons.FindFirstChild(decoded) as BasePart;
			if (!button) {
				return;
			}

			const buttonComponent = Dependency<Components>().getComponent<PurchaseButton>(button);
			if (!buttonComponent) {
				this.logger.Error(`Could not find PurchaseButton component for ${button}`);
				return;
			}

			buttonComponent.purchased = true;

			// Add the corresponding item to the tycoon.
			buttonComponent.unbindButtonTouched(true);
			for (const listener of buttonComponent.listeners) {
				task.spawn(() => {
					listener.onPurchaseButtonBought(player, buttonComponent.janitor);
				});
			}
		});
	}

	/**
	 *
	 * @param buttons
	 * @param playerEntity
	 * @returns
	 */
	private getNonOwnedButtons(buttons: Array<Instance>, playerEntity: PlayerEntity): Array<Instance> {
		return buttons.filter((button) => {
			const encoded = encoderPartIdentifiers[button.Name as keyof EncodePartIdentifier];
			if (encoded === undefined) {
				this.logger.Warn("Could not encode part identifier {@Identifier}", button.Name);
				return;
			}

			return !playerEntity.data.purchased.includes(encoded);
		});
	}

	/**
	 *
	 * @param nonOwnedButtons
	 * @returns
	 */
	private handleNonOwnedButtons(nonOwnedButtons: Array<Instance>): Array<PurchaseButton> {
		const objectsWithDependencies: Array<PurchaseButton> = [];
		nonOwnedButtons.forEach((button) => {
			const buttonComponent = Dependency<Components>().getComponent<PurchaseButton>(button);
			if (!buttonComponent) {
				this.logger.Error(`Could not find purchase button component for ${button}`);
				return;
			}

			const dependency = buttonComponent.attributes.Dependency;
			if (dependency !== undefined && dependency !== "") {
				objectsWithDependencies.push(buttonComponent);
			}

			buttonComponent.bindButtonTouched(true);
		});

		return objectsWithDependencies;
	}
}
