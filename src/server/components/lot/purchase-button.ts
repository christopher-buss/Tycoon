import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Janitor } from "@rbxts/janitor";
import { Logger } from "@rbxts/log";
import { HttpService, RunService } from "@rbxts/services";
import Spring from "@rbxts/spring";
import { PlayerService } from "server/services/player/player-service";
import { MoneyService } from "server/services/stores/money-service";
import Parts from "shared/meta/part-info";
import { FlameworkUtil } from "shared/util/flamework-utils";
import { lerpNumber } from "shared/util/math-util";
import { PlayerUtil } from "shared/util/player-util";
import { IPurchaseButtonAttributes, IPurchaseButtonModel } from "types/interfaces/buttons";
import { Lot } from "./lot";

export interface IOnPurchaseButtonBought {
	/** Called when this button is successfully purchased. */
	onPurchaseButtonBought(owner: Player): void;
}

/**
 * A button component that can be touched by a player to purchased a specified
 * linked object.
 */
@Component({ tag: "PurchaseButton" })
export class PurchaseButton extends BaseComponent<IPurchaseButtonAttributes, IPurchaseButtonModel> implements OnStart {
	private debounce: boolean;
	private janitor: Janitor<{ Visibility: string | RBXScriptConnection }>;
	private readonly touchPart: BasePart;

	private lot!: Lot;

	public listeners = new Set<IOnPurchaseButtonBought>();

	constructor(
		private readonly logger: Logger,
		private readonly playerService: PlayerService,
		private readonly moneyService: MoneyService,
	) {
		super();
		this.attributes.ComponentId = HttpService.GenerateGUID(false);
		this.attributes.DisplayName = this.instance.Name;
		this.debounce = false;

		this.janitor = new Janitor();
		this.touchPart = this.instance.Head;

		const part = Parts[this.attributes.DisplayName as keyof typeof Parts];
		if (part === undefined) {
			return;
		}

		const price = part.Price;
		if (price === undefined || price < 0) {
			this.logger.Error(`Price for ${this.attributes.DisplayName} is invalid.`);
			return;
		}

		this.attributes.Price = price;
	}

	public onStart() {
		FlameworkUtil.waitForComponentOnInstance<Lot>(this.instance.Parent?.Parent as Model).andThen((component) => {
			assert(component !== undefined, "Lot is undefined");
			this.lot = component;
		});

		// if (!this.dependencies.isEmpty()) {
		// 	this.bindButtonTouched();
		// 	return;
		// }

		// Don't have this onStart, only have it when a player owns a tycoon and doesn't own the linked component
		// this.bindButtonTouched();
	}

	public addListener(object: IOnPurchaseButtonBought): void {
		this.listeners.add(object);
	}

	public bindButtonTouched(): void {
		this.logger.Debug("Binding button touched for {ComponentId}", this.attributes.ComponentId);
		this.touchPart.CanTouch = true;
		this.forceButtonVisible();
		this.janitor.Add(this.touchPart.Touched.Connect((otherPart) => this.onComponentTouched(otherPart)));
	}

	public unbindButtonTouched(): void {
		this.logger.Debug("Unbinding button touched for {ComponentId}", this.attributes.ComponentId);
		this.touchPart.CanTouch = false;
		this.forceButtonHidden();
		this.janitor.Cleanup();
	}

	/** @hidden */
	private onComponentTouched(part: BasePart): void {
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
		if (!this.lot.getOwner().isSome() || this.lot.getOwner().unwrap().UserId !== player.UserId) {
			this.debounce = false;
			return;
		}

		const playerEntity_opt = this.playerService.getEntity(player);
		if (playerEntity_opt.isNone()) {
			this.logger.Error(`Player entity for ${player} could not be found`);
			this.debounce = false;
			return;
		}

		this.logger.Info("{ComponentId} attempting to be purchased by {@Player}", this.attributes.ComponentId, player);

		const canSpend = this.moneyService.spendMoney(player, this.attributes.Price!);
		if (!canSpend) {
			task.delay(0.5, () => {
				this.debounce = false;
			});
			return;
		}

		const playerEntity = playerEntity_opt.unwrap();
		// playerEntity.updateData((data) => {
		// 	const identifier = encoderPartIdentifiers[this.attributes.DisplayName! as keyof EncodePartIdentifier];
		// 	if (identifier === undefined) {
		// 		this.logger.Error("Identifier is undefined");
		// 		return data;
		// 	}

		// 	data.purchased.push(identifier);
		// 	return data;
		// });

		this.logger.Info("{ComponentId} purchased by {@Player}", this.attributes.ComponentId, player);

		for (const listener of this.listeners) {
			task.spawn(() => {
				listener.onPurchaseButtonBought(player);
			});
		}

		this.hideButton(); //.finally(() => {});
	}

	/** @hidden */
	private async setButtonVisibility(visible: boolean, force: boolean): Promise<void> {
		const goal = visible ? 0 : 1;
		const base = visible ? 1 : 0;

		if (force) {
			this.touchPart.Transparency = goal;
			this.touchPart.CanCollide = visible;
			return;
		}

		this.touchPart.CanCollide = visible;

		const spring = new Spring<number>(base, 5, goal, 1);

		this.janitor.Add(
			RunService.Heartbeat.Connect((deltaTime) => {
				const position = spring.update(deltaTime);
				this.touchPart.Transparency = lerpNumber(base, goal, position);

				if ((goal === 1 && position > 0.99) || (goal === 0 && position < 0.01)) {
					this.touchPart.Transparency = goal;
					this.janitor.Remove("Visibility");
				}
			}),
			"Disconnect",
			"Visibility",
		);
	}

	/** Show the purchase button using a transparency lerp. */
	public showButton(): Promise<void> {
		return this.setButtonVisibility(true, true);
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
