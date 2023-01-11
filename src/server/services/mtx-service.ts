import { OnInit, Service } from "@flamework/core";
import { Logger } from "@rbxts/log";
import { ProfileMetaData } from "@rbxts/profileservice/globals";
import { CharacterRigR6 } from "@rbxts/promise-character";
import { Option } from "@rbxts/rust-classes";
import { MarketplaceService, Players, ReplicatedStorage, ServerStorage } from "@rbxts/services";
import Products from "server/meta/product-functions";
import PlayerEntity from "server/modules/classes/player-entity";
import { GamepassPlayerKey, PlayerDataProfile } from "shared/meta/default-player-data";
import { Gamepasses } from "shared/meta/gamepasses";

import { OnPlayerJoin, PlayerService } from "./player/player-service";

/**
 * Service for handling microtransactions.
 */
@Service({})
export class MtxService implements OnInit, OnPlayerJoin {
	private readonly gamePasses: Map<number, string>;
	private readonly purchaseIdLog: number;

	constructor(private readonly logger: Logger, private readonly playerService: PlayerService) {
		this.purchaseIdLog = 50;

		this.gamePasses = new Map<number, string>();
		this.gamePasses.set(Gamepasses.DoubleMoney, "doubleMoneyGamepass");
		this.gamePasses.set(Gamepasses.Vip, "vipGamepass");
	}

	/** @hidden */
	public onInit(): void {
		MarketplaceService.PromptGamePassPurchaseFinished.Connect((...args): void => {
			return this.onGamePassPurchaseFinished(...args);
		});

		MarketplaceService.ProcessReceipt = (...args): Enum.ProductPurchaseDecision => {
			return this.processReceipt(...args).await() as unknown as Enum.ProductPurchaseDecision;
		};
	}

	/**
	 *
	 * @param playerData
	 * @param purchaseId
	 * @param callback
	 * @returns
	 */
	private async purchaseIdCheck(
		playerData: PlayerDataProfile,
		purchaseId: string,
		callback: () => void,
	): Promise<Enum.ProductPurchaseDecision> {
		if (!playerData.IsActive()) {
			return Enum.ProductPurchaseDecision.NotProcessedYet;
		}

		const metaData = playerData.MetaData;
		const localPurchaseIds = metaData.MetaTags.get("ProfilePurchaseIds") as Array<string>;
		if (localPurchaseIds === undefined) {
			metaData.MetaTags.set("ProfilePurchaseIds", []);
		}

		if (localPurchaseIds !== undefined && !localPurchaseIds.includes(purchaseId)) {
			while (localPurchaseIds.size() >= this.purchaseIdLog) {
				localPurchaseIds.remove(1);
			}
			localPurchaseIds.push(purchaseId);
			task.spawn(callback);
		}

		const result_opt = this.checkLatestMetaTags(metaData, purchaseId);
		if (result_opt.isSome()) {
			const result = result_opt.unwrap();
			if (result === Enum.ProductPurchaseDecision.PurchaseGranted) {
				return result;
			}
		}

		return new Promise((resolve, _reject, onCancel) => {
			const connection = playerData.MetaTagsUpdated.Connect(() => {
				const result_opt = this.checkLatestMetaTags(metaData, purchaseId);
				if (result_opt.isNone() && !playerData.IsActive()) {
					resolve(Enum.ProductPurchaseDecision.NotProcessedYet);
				}
			});

			onCancel(() => {
				connection.Disconnect();
			});
		});
	}

	/**
	 *
	 * @param metaData
	 * @param purchaseId
	 * @returns
	 */
	private checkLatestMetaTags(metaData: ProfileMetaData, purchaseId: string): Option<Enum.ProductPurchaseDecision> {
		const savedPurchaseIds = metaData.MetaTagsLatest.get("ProfilePurchaseIds") as Array<string>;
		if (savedPurchaseIds !== undefined && savedPurchaseIds.includes(purchaseId)) {
			return Option.some<Enum.ProductPurchaseDecision>(Enum.ProductPurchaseDecision.PurchaseGranted);
		}

		return Option.none<Enum.ProductPurchaseDecision>();
	}

	/**
	 *
	 */
	private grantProduct(playerEntity: PlayerEntity, productId: number): void {
		const productFunction = Products[productId as never] as (entity: PlayerEntity) => unknown;
		assert(productFunction, `Product function for product id ${productId} not found!`);
		if (productFunction !== undefined) {
			this.logger.Info(`Granting product ${productId} to ${playerEntity.player.Name}`);
			productFunction(playerEntity);
		}
	}

	/**
	 *
	 * @param receiptInfo
	 * @returns
	 */
	private async processReceipt(receiptInfo: ReceiptInfo): Promise<Enum.ProductPurchaseDecision> {
		this.logger.Info(`Processing receipt ${receiptInfo.PurchaseId} for ${receiptInfo.PlayerId}`);
		const player = Players.GetPlayerByUserId(receiptInfo.PlayerId);
		if (!player) {
			return Enum.ProductPurchaseDecision.NotProcessedYet;
		}

		const playerEntity_opt = this.playerService.getEntity(player);
		if (playerEntity_opt.isNone()) {
			return Enum.ProductPurchaseDecision.NotProcessedYet;
		}

		const playerEntity = playerEntity_opt.unwrap();
		return this.purchaseIdCheck(playerEntity.dataProfile, receiptInfo.PurchaseId, () => {
			return this.grantProduct(playerEntity, receiptInfo.ProductId);
		});
	}

	/**
	 *
	 * @param playerEntity
	 * @hidden
	 */
	public onPlayerJoin(playerEntity: PlayerEntity): void {
		if (playerEntity.name === "iSentinels") {
			this.gamePasses.forEach((gamepassFunctionName, id) => {
				playerEntity.updateData((data) => {
					data.gamePasses[gamepassFunctionName as GamepassPlayerKey] = true;
					return data;
				});
				(this[gamepassFunctionName as never] as Callback)(this, playerEntity);
			});

			// Events.sendOnScreenMessage(playerEntity.player, "Hello");

			return;
		}

		this.gamePasses.forEach((gamepassFunctionName, id) => {
			// Give the player any already owned gamepasses.
			if (playerEntity.data.gamePasses[gamepassFunctionName as never] === true) {
				// Calls the relating gamepass function.
				this.logger.Info(`Granting gamepass ${id} to ${playerEntity.player.Name}`);
				(this[gamepassFunctionName as never] as Callback)(this, playerEntity);
				return;
			}

			// Check if the player has purchased a non-owned gamepass since
			// rejoining the game.
			this.checkForGamepassOwned(playerEntity.player, id)
				.then((hasPass) => {
					if (hasPass) {
						this.logger.Info(`Player ${playerEntity.player.Name} now owns gamepass ${id}`);
						playerEntity.updateData((data) => {
							data.gamePasses[gamepassFunctionName as GamepassPlayerKey] = true;
							return data;
						});

						// Calls the relating gamepass function.
						(this[gamepassFunctionName as never] as Callback)(this, playerEntity);
					}
				})
				.catch((err) => {
					this.logger.Warn(`Failed to check for gamepass owned: {@Error}`, err);
				});
		});
	}

	public onPlayerRebirthed(playerEntity: PlayerEntity): void {
		this.gamePasses.forEach((gamepassFunctionName, id) => {
			if (playerEntity.data.gamePasses[gamepassFunctionName as never] === true) {
				// Calls the relating gamepass function.
				this.logger.Info(`Granting gamepass ${id} to ${playerEntity.player.Name}`);
				(this[gamepassFunctionName as never] as Callback)(this, playerEntity);
			}
		});
	}

	/**
	 * Checks if a player owns a given gamepass.
	 * @param player
	 * @param id
	 * @returns
	 */
	public checkForGamepassOwned(player: Player, id: number): Promise<boolean> {
		return new Promise((resolve, reject) => {
			let hasPass = false;
			const [ok, result] = pcall(() => {
				hasPass = MarketplaceService.UserOwnsGamePassAsync(player.UserId, id);
			});

			if (ok) {
				resolve(hasPass);
			}

			reject(result);
		});
	}

	/** @hidden */
	private onGamePassPurchaseFinished(player: Player, gamepassId: number, wasPurchased: boolean): void {
		if (wasPurchased) {
			const func = this[this.gamePasses.get(gamepassId) as never] as Callback;
			const playerEntity = this.playerService.getEntity(player);
			if (playerEntity.isSome()) {
				func(this, playerEntity.unwrap());
			}
		}
	}

	/**
	 * Gives a gamepass which is a tool to the player.
	 * @param playerEntity
	 * @param toolName
	 */
	private addToolGamepass(playerEntity: PlayerEntity, toolName: string): void {
		const player = playerEntity.player;

		function addTool(): void {
			let tool = ServerStorage.Gamepasses.FindFirstChild(toolName) as Tool;
			if (tool !== undefined) {
				tool = tool.Clone();
				tool.Parent = player.FindFirstChildOfClass("Backpack");
			}
		}

		const character = player.Character;
		if (character) {
			addTool();
		}

		playerEntity.playerRemoving.Add(player.CharacterAdded.Connect(addTool));
	}

	private cloudGamepass(playerEntity: PlayerEntity): void {
		this.addToolGamepass(playerEntity, "Cloud");
	}

	private speedCoilGamepass(playerEntity: PlayerEntity): void {
		this.addToolGamepass(playerEntity, "SpeedCoil");
	}

	private doubleMoneyGamepass(playerEntity: PlayerEntity): void {
		playerEntity.player.SetAttribute("DoubleMoneyGamepass", true);
	}

	private vipGamepass(playerEntity: PlayerEntity): void {
		playerEntity.player.SetAttribute("Vip", true);

		function addHat(character: CharacterRigR6): void {
			task.defer(() => {
				const crown = ReplicatedStorage.Accessories.Crown.Clone();
				crown.MeshPart.AccessoryWeld.Part1 = character.HumanoidRootPart;
				crown.Parent = character;
			});
		}

		const character = playerEntity.player.Character as CharacterRigR6;
		if (character) {
			addHat(character);
		}

		playerEntity.playerRemoving.Add(
			playerEntity.player.CharacterAdded.Connect((character) => {
				addHat(character as CharacterRigR6);
			}),
		);
	}

	// private robuxDropper(playerEntity: PlayerEntity): void {
	// 	const robuxDropperEncoded = encoderPartIdentifiers["Robux Dropper"];
	// 	if (playerEntity.data.purchased.includes(robuxDropperEncoded)) {
	// 		return;
	// 	}

	// 	playerEntity.updateData((data) => {
	// 		data.purchased.push(robuxDropperEncoded);
	// 		return data;
	// 	});

	// 	const purchaseButtons = Dependency<Components>().getAllComponents<PurchaseButton>();
	// 	purchaseButtons.forEach((purchaseButton) => {
	// 		if (
	// 			purchaseButton.instance.Name === "Robux Dropper" &&
	// 			purchaseButton.checkIfPlayerOwnsButton(playerEntity.player)
	// 		) {
	// 			for (const listener of purchaseButton.listeners) {
	// 				task.spawn(() => {
	// 					listener.onPurchaseButtonBought(playerEntity.player);
	// 				});
	// 			}

	// 			purchaseButton.hideButton().finally(() => {
	// 				purchaseButton.unbindButtonTouched();
	// 			});
	// 		}
	// 	});
	// }
}
