import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Janitor } from "@rbxts/janitor";
import { Logger } from "@rbxts/log";
import { MarketplaceService, RunService } from "@rbxts/services";
import Spring from "@rbxts/spring";
import PlayerEntity from "server/modules/classes/player-entity";
import { MtxService } from "server/services/mtx-service";
import { PlayerService } from "server/services/player/player-service";
import { MoneyService } from "server/services/stores/money-service";
import { EncodePartIdentifier, encoderPartIdentifiers } from "shared/meta/part-identifiers";
import { PartInfo, PartInfoType } from "shared/meta/part-info";
import { FlameworkUtil } from "shared/util/flamework-utils";
import { lerpNumber } from "shared/util/math-util";
import { PlayerUtil } from "shared/util/player-util";
import { Tag } from "types/enum/tags";
import { IPurchaseButtonAttributes, IPurchaseButtonModel } from "types/interfaces/buttons";

import { Lot } from "./lot";

export interface IOnPurchaseButtonBought {
	/** Called when this button is successfully purchased. */
	onPurchaseButtonBought(owner: Player, janitor: Janitor): void;
	onPurchaseButtonBought(owner: Player, janitor: Janitor): void;
}

/**
 * A button component that can be touched by a player to purchased a specified
 * linked object.
 */
@Component({
	tag: Tag.PurchaseButton,
})
export class PurchaseButton extends BaseComponent<IPurchaseButtonAttributes, IPurchaseButtonModel> implements OnStart {
	public janitor: Janitor<{ Visibility: string | RBXScriptConnection }>;
	public listeners: Set<IOnPurchaseButtonBought>;
	public lot!: Lot;
	public purchased: boolean;

	private identifier: string;
	private debounce: boolean;
	private dependencies: Array<PurchaseButton>;

	private canCollideMap: Map<BasePart, boolean>;
	private transparencyMap: Map<BasePart, number>;

	private readonly touchPart: BasePart;

	constructor(
		private readonly logger: Logger,
		private readonly playerService: PlayerService,
		private readonly moneyService: MoneyService,
		private readonly mtxService: MtxService,
	) {
		super();

		this.listeners = new Set<IOnPurchaseButtonBought>();
		this.purchased = false;

		this.identifier = this.instance.Name;
		this.debounce = false;
		this.dependencies = [];
		this.janitor = new Janitor();

		this.touchPart = this.instance.TouchPart;

		this.canCollideMap = new Map();
		this.transparencyMap = new Map();
		this.instance.GetChildren().forEach((child) => {
			if (child.IsA("BasePart")) {
				this.canCollideMap.set(child, child.CanCollide);
				this.transparencyMap.set(child, child.Transparency);
			}
		});

		const part = PartInfo[this.instance.Name as PartInfoType];
		if (part === undefined) {
			return;
		}

		const price = part.Price;
		if (price === undefined || price < 0) {
			this.logger.Error(`Price for ${this.identifier} is invalid.`);
			return;
		}

		this.attributes.Price = price;
	}

	/** @hidden */
	public onStart(): void {
		FlameworkUtil.waitForComponentOnInstance<Lot>(this.instance.Parent?.Parent as Model)
			.andThen((component) => {
				assert(component !== undefined, "Lot is undefined");
				this.lot = component;
			})
			.catch((err) => {
				this.logger.Error(err);
			});
	}

	/**
	 *
	 * @param dependency
	 */
	public addDependency(dependency: PurchaseButton): void {
		this.dependencies.push(dependency);
	}

	/**
	 *
	 * @param object
	 */
	public addListener(object: IOnPurchaseButtonBought): void {
		this.listeners.add(object);
	}

	/**
	 *
	 * @param force
	 */
	public bindButtonTouched(force: boolean): void {
		// TODO :this would probably be better as a buyJanitor and a removeJanitor for easier understanding
		this.janitor.Cleanup();
		this.logger.Debug(`Binding button touched for ${this.instance.Name}`);
		this.purchased = false;
		this.touchPart.CanTouch = true;
		if (force) {
			this.forceButtonVisible().catch((err) => this.logger.Warn(err));
		} else {
			this.showButton().catch((err) => this.logger.Warn(err));
		}
		this.janitor.Add(this.touchPart.Touched.Connect((otherPart) => this.onComponentTouched(otherPart)));
	}

	/**
	 *
	 * @param force
	 */
	public unbindButtonTouched(force: boolean): void {
		this.logger.Debug(`Unbinding button touched for ${this.instance.Name}`);
		this.touchPart.CanTouch = false;
		if (force) {
			this.forceButtonHidden().catch((err) => this.logger.Warn(err));
		} else {
			this.hideButton().catch((err) => this.logger.Warn(err));
		}
		this.janitor.Cleanup();
	}

	/**
	 *
	 * @param player
	 * @returns
	 */
	public checkIfPlayerOwnsButton(player: Player): boolean {
		return this.lot.getOwner().isSome() && this.lot.getOwner().unwrap().UserId === player.UserId;
	}

	/**
	 *
	 * @param part
	 * @returns
	 *
	 * @hidden
	 */
	private async onComponentTouched(part: BasePart): Promise<void> {
		if (this.debounce) {
			return;
		}

		this.debounce = true;

		const player_opt = PlayerUtil.getPlayerFromDescendant(part);
		if (player_opt.isNone()) {
			this.debounce = false;
			return;
		}

		const player = player_opt.unwrap();
		if (!this.checkIfPlayerOwnsButton(player)) {
			this.debounce = false;
			return;
		}

		const playerEntity_opt = this.playerService.getEntity(player);
		if (playerEntity_opt.isNone()) {
			this.logger.Error(`Player entity for ${player} could not be found`);
			this.debounce = false;
			return;
		}

		const playerEntity = playerEntity_opt.unwrap();

		if (this.attributes.Rebirths !== undefined && this.attributes.Rebirths > 0) {
			if (playerEntity.data.rebirths < this.attributes.Rebirths) {
				// dont have enough rebirths
				if (this.attributes.GamepassId !== undefined && this.attributes.GamepassId > 0) {
					const result = await this.buyWithRobux(player);
					if (result !== true) {
						task.delay(0.5, () => {
							this.debounce = false;
						});
						return;
					}
				}
			}
		}

		const rebirthCheck = (): boolean => {
			if (this.attributes.Rebirths !== undefined && this.attributes.Rebirths > 0) {
				return playerEntity.data.rebirths >= this.attributes.Rebirths;
			}
			return true;
		};

		if (this.attributes.GamepassId !== undefined && this.attributes.GamepassId > 0) {
			if (!rebirthCheck()) {
				const result = await this.buyWithRobux(player);
				if (result !== true) {
					task.delay(0.5, () => {
						this.debounce = false;
					});
					return;
				}
			}
		} else {
			if (!rebirthCheck() || !this.buyWithMoney(playerEntity)) {
				task.delay(0.5, () => {
					this.debounce = false;
				});
				return;
			}
		}

		playerEntity.updateData((data) => {
			const identifier = encoderPartIdentifiers[this.instance.Name as keyof EncodePartIdentifier];
			if (identifier === undefined) {
				this.logger.Error(`Identifier for ${this.instance.Name} is undefined`);
				return data;
			}

			data.purchased.push(identifier);
			return data;
		});

		this.logger.Info(`${this.instance.Name} purchased by ${player}`);

		this.purchased = true;
		this.dependencies.forEach((dependency) => dependency.bindButtonTouched(false));
		this.unbindButtonTouched(false);

		this.listeners.forEach((listener) => {
			task.spawn(() => {
				listener.onPurchaseButtonBought(player, this.janitor);
			});
		});

		// GameAnalytics.addProgressionEvent(player.UserId, {
		// 	progressionStatus: GameAnalytics.EGAProgressionStatus.Complete,
		// 	progression01: this.instance.Name,
		// });
	}

	/**
	 *
	 * @param player
	 * @returns
	 */
	private buyWithMoney(playerEntity: PlayerEntity): boolean {
		this.logger.Info(`${this.instance.Name} attempting to be purchased by ${playerEntity.player}`);
		return this.moneyService.spendMoneyForEntity(playerEntity, this.attributes.Price!);
	}

	/**
	 *
	 * @param player
	 * @returns
	 */
	private async buyWithRobux(player: Player): Promise<boolean | void> {
		return this.mtxService
			.checkForGamepassOwned(player, this.attributes.GamepassId!)
			.andThen((owned) => {
				if (!owned) {
					MarketplaceService.PromptGamePassPurchase(player, this.attributes.GamepassId!);
					return false;
				}

				return true;
			})
			.catch((err) => {
				this.logger.Warn(`Error checking for gamepass owned: ${err}`);
			});
	}

	/**
	 *
	 * @param visible
	 * @param force
	 *
	 * @hidden
	 */
	private async setButtonVisibility(visible: boolean, force: boolean): Promise<void> {
		const promises: Array<Promise<void>> = [];

		this.transparencyMap.forEach((originalTransparency, part) => {
			const goal = visible ? originalTransparency : 1;
			const base = visible ? 1 : originalTransparency;

			if (force) {
				part.Transparency = goal;
				return;
			}

			const spring = new Spring<number>(base, 5, goal, 1);
			promises.push(
				new Promise((resolve) => {
					const connection = RunService.Heartbeat.Connect((deltaTime) => {
						const position = spring.update(deltaTime);
						if (base !== 1) {
							part.Transparency = lerpNumber(base, goal, position);
						} else {
							part.Transparency = lerpNumber(goal, base, position);
						}
						if ((goal === 1 && position > 0.99) || (goal === 0 && position < 0.01)) {
							part.Transparency = goal;
							connection.Disconnect();
							resolve();
						}
					});
				}),
			);
		});

		this.canCollideMap.forEach((originalCanCollide, part) => {
			part.CanCollide = visible ? originalCanCollide : false;
		});

		await Promise.all(promises);
	}

	/** Show the purchase button using a transparency lerp. */
	public showButton(): Promise<void> {
		return this.setButtonVisibility(true, false);
	}

	/** Hide the purchase button using a transparency lerp. */
	public hideButton(): Promise<void> {
		return this.setButtonVisibility(false, false);
	}

	/** Show the purchase button instantaneously. */
	public forceButtonVisible(): Promise<void> {
		return this.setButtonVisibility(true, true);
	}

	/** Hide the purchase button instantaneously. */
	public forceButtonHidden(): Promise<void> {
		return this.setButtonVisibility(false, true);
	}

	/** @override */
	public destroy(): void {
		super.destroy();
		this.janitor.Destroy();
	}
}
