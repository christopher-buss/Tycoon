import { Service } from "@flamework/core";
import DataStore2 from "@rbxts/datastore2";
import { Logger } from "@rbxts/log";
import ProfileService from "@rbxts/profileservice";
import { ProfileStore } from "@rbxts/profileservice/globals";
import { Option } from "@rbxts/rust-classes";
import { Players } from "@rbxts/services";
import DefaultPlayerData, { IPlayerData, PlayerDataProfile } from "shared/meta/default-player-data";
import KickCode from "types/enum/kick-reason";
import PlayerRemovalService from "./player-removal-service";

const EloKey = "Ruby Key"; // Rebirths
const PcsKey = "Diamond Key"; // Purchases
const CshKey = "Uranium Key"; // Cash
const DntKey = "Gold Key"; // Donations

const dateTable = os.date("*t", os.time());
const Key = "Y:" + dateTable["year"] + " M:" + dateTable["month"] + " D:" + dateTable["day"];
const DntDaily = DntKey + Key; // Donations Today
const FstKey = Key; // First Date Played

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
		this.gameProfileStore = ProfileService.GetProfileStore<IPlayerData>("PlayerData", DefaultPlayerData);

		DataStore2.Combine("DATA", EloKey, PcsKey, CshKey, DntKey, FstKey, DntDaily);
	}

	// TODO
	public async migrateDataToProfileStore(player: Player, profile: PlayerDataProfile) {
		this.logger.Info(`Migrating data for ${player.Name} to ProfileStore`);

		const rebirths = DataStore2<number>(EloKey, player).Get();
		if (rebirths !== undefined) {
			profile.Data.rebirths = rebirths;
		}
		print(rebirths);

		const cash = DataStore2<number>(PcsKey, player).Get();
		if (cash !== undefined) {
			profile.Data.cash = cash;
		}
		print(cash);

		this.logger.Info(`Finished migrating data for ${player.Name} to ProfileStore`);

		return profile;
	}

	public async loadPlayerProfile(player: Player): Promise<Option<PlayerDataProfile>> {
		const dataKey = tostring(player.UserId);
		// const liveProfile = this.gameProfileStore.ViewProfileAsync(dataKey);

		const profile = this.gameProfileStore.LoadProfileAsync(dataKey, "ForceLoad");
		if (profile === undefined) {
			this.removalService.removeForBug(player, KickCode.PlayerProfileUndefined);
			return Option.none<PlayerDataProfile>();
		}

		if (!player.IsDescendantOf(Players)) {
			profile.Release();
		}

		// GDPR compliance
		profile.AddUserId(player.UserId);

		profile.Reconcile();

		// if (liveProfile === undefined) {
		// 	// We currently don't have a store. Need to check if we have old data from DataStore2.
		// 	profile = await this.migrateDataToProfileStore(player, profile);
		// }

		profile.ListenToRelease(() => {
			if (!player.IsDescendantOf(game)) {
				return Option.none<PlayerDataProfile>();
			}

			this.removalService.removeForBug(player, KickCode.PlayerProfileReleased);
		});

		return Option.some<PlayerDataProfile>(profile);
	}
}
