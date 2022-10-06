import { OnInit, Service } from "@flamework/core";
import { Logger } from "@rbxts/log";
import { Option } from "@rbxts/rust-classes";
import { MarketplaceService, Players, ServerStorage } from "@rbxts/services";
import Products from "server/meta/product-functions";
import PlayerEntity from "server/modules/classes/player-entity";
import { GamepassPlayerKey, PlayerDataProfile } from "shared/meta/default-player-data";
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
		this.gamePasses.set(71804134, "cloudGamepass");
		this.gamePasses.set(70168504, "speedCoilGamepass");
		this.gamePasses.set(70167932, "doubleMoneyGamepass");
	}

	/** @hidden */
	public onInit() {
		MarketplaceService.PromptGamePassPurchaseFinished.Connect((...args): void =>
			this.onGamePassPurchaseFinished(...args),
		);

		MarketplaceService.ProcessReceipt = (...args) => {
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
		const localPurchaseIds = metaData.MetaTags.get("ProfilePurchaseIds") as string[];
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

		function checkLatestMetaTags(): Option<Enum.ProductPurchaseDecision> {
			const savedPurchaseIds = metaData.MetaTagsLatest.get("ProfilePurchaseIds") as string[];
			if (savedPurchaseIds !== undefined && savedPurchaseIds.includes(purchaseId)) {
				return Option.some<Enum.ProductPurchaseDecision>(Enum.ProductPurchaseDecision.PurchaseGranted);
			}

			return Option.none<Enum.ProductPurchaseDecision>();
		}

		const result_opt = checkLatestMetaTags();
		if (result_opt.isSome()) {
			const result = result_opt.unwrap();
			if (result === Enum.ProductPurchaseDecision.PurchaseGranted) {
				return result;
			}
		}

		return new Promise((resolve, _reject, onCancel) => {
			const connection = playerData.MetaTagsUpdated.Connect(() => {
				const result_opt = checkLatestMetaTags();
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
		for (const [id, gamepassFunctionName] of this.gamePasses) {
			// Give the player any already owned gamepasses.
			if (playerEntity.data.gamePasses[gamepassFunctionName as never] === true) {
				// Calls the relating gamepass function.
				this.logger.Info(`Granting gamepass ${id} to ${playerEntity.player.Name}`);
				(this[gamepassFunctionName as never] as Callback)(this, playerEntity);
				continue;
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
		}

		// playerEntity.playerRemoving.Add(() => this.onPlayerRemoving(playerEntity.player));
	}

	// /** @hidden */
	// private onPlayerRemoving(player: Player): void {}

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
			func(this, playerEntity);
		}
	}

	/**
	 * Gives a gamepass which is a tool to the player.
	 * @param playerEntity
	 * @param toolName
	 */
	private addToolGamepass(playerEntity: PlayerEntity, toolName: string): void {
		const player = playerEntity.player;

		function addTool() {
			let tool = ServerStorage.Gamepasses.FindFirstChild(toolName) as Tool;
			// assert(tool, `Tool ${toolName} not found!`);
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
}
