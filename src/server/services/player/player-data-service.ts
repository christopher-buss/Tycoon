import { Service } from "@flamework/core";
import DataStore2 from "@rbxts/datastore2";
import { Logger } from "@rbxts/log";
import ProfileService from "@rbxts/profileservice";
import { ProfileStore } from "@rbxts/profileservice/globals";
import { Option } from "@rbxts/rust-classes";
import { DataStoreService, HttpService, Players, RunService } from "@rbxts/services";
import DefaultPlayerData, { IPlayerData, PlayerDataProfile } from "shared/meta/default-player-data";
import { EncodePartIdentifier, encoderPartIdentifiers } from "shared/meta/part-identifiers";
import PlayerKickReason from "types/enum/kick-reason";

import PlayerRemovalService from "./player-removal-service";

const EloKey = "Ruby Key"; // Rebirths
const PcsKey = "Diamond Key"; // Purchases
const CshKey = "Uranium Key"; // Cash
const DntKey = "Gold Key"; // Donations

const dateTable = os.date("*t", os.time());
const Key = "Y:" + dateTable["year"] + " M:" + dateTable["month"] + " D:" + dateTable["day"];
const DntDaily = DntKey + Key; // Donations Today
const FstKey = Key; // First Date Played

const DataStoreName = RunService.IsStudio() ? "PlayerData" : "TestPlayerData";

/**
 * This service handles everything to do with interfacing with Roblox
 * datastores and ProfileService for players.
 *
 * @note It should *not* be used directly and is consumed by the `PlayerEntity`
 * class.
 */
@Service({})
export default class PlayerDataService {
	private gameProfileStore: ProfileStore<IPlayerData>;

	constructor(private readonly logger: Logger, private readonly removalService: PlayerRemovalService) {
		this.gameProfileStore = ProfileService.GetProfileStore<IPlayerData>(DataStoreName, DefaultPlayerData);

		DataStore2.Combine("DATA", EloKey, PcsKey, CshKey, DntKey, FstKey, DntDaily);
	}

	/**
	 *
	 * @param player
	 * @returns
	 */
	public async loadPlayerProfile(player: Player): Promise<Option<PlayerDataProfile>> {
		const dataKey = tostring(player.UserId);
		let profile = this.gameProfileStore.LoadProfileAsync(dataKey, "ForceLoad");
		if (profile === undefined) {
			this.removalService.removeForBug(player, PlayerKickReason.PlayerProfileUndefined);
			return Option.none<PlayerDataProfile>();
		}

		if (!player.IsDescendantOf(Players)) {
			profile.Release();
		}

		// GDPR compliance
		profile.AddUserId(player.UserId);

		profile.Reconcile();

		if (profile.Data.migrated === false) {
			profile = await this.migrateDataToProfileStore(player, profile);
		}

		profile.ListenToRelease(() => {
			if (!player.IsDescendantOf(game)) {
				return Option.none<PlayerDataProfile>();
			}

			this.removalService.removeForBug(player, PlayerKickReason.PlayerProfileReleased);
		});

		return Option.some<PlayerDataProfile>(profile);
	}

	/**
	 * This function migrates data from the old datastores to ProfileService.
	 *
	 * Although most games will not need to do this, it is included here incase
	 * of a future migration.
	 *
	 * @param player The player to migrate data for
	 * @param profile The profileservice profile to migrate data to
	 * @returns The profileservice profile with the migrated data
	 */
	private async migrateDataToProfileStore(player: Player, profile: PlayerDataProfile): Promise<PlayerDataProfile> {
		this.logger.Info(`Migrating data for ${player.Name} to ProfileStore`);

		const rebirths = DataStore2<number>(EloKey, player).Get();
		if (rebirths !== undefined) {
			profile.Data.rebirths = rebirths;
		}

		const cash = DataStore2<number>(CshKey, player).Get();
		if (cash !== undefined) {
			profile.Data.cash = cash;
		}

		const purchases = DataStore2<string>(PcsKey, player).Get();
		if (purchases !== undefined) {
			const decodedPurchases = HttpService.JSONDecode(purchases) as string;

			const purchaseArray: Array<number> = [];
			for (const purchase of decodedPurchases.split("$%")) {
				const encodedPurchase = encoderPartIdentifiers[purchase as keyof EncodePartIdentifier];
				if (encodedPurchase !== undefined) {
					purchaseArray.push(encodedPurchase);
				}
			}

			profile.Data.purchased = purchaseArray;
		}

		task.defer(() => {
			const DataStore = DataStoreService.GetDataStore("DATA");
			DataStore.RemoveAsync(tostring(player.UserId));
		});

		profile.Data.migrated = true;

		this.logger.Info(`Finished migrating data for ${player.Name} to ProfileStore`);

		return profile;
	}
}
