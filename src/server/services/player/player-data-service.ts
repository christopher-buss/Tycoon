import { Service } from "@flamework/core";
import ProfileService from "@rbxts/profileservice";
import { ProfileStore } from "@rbxts/profileservice/globals";
import { Option } from "@rbxts/rust-classes";
import { Players } from "@rbxts/services";
import DefaultPlayerData, { IPlayerData, PlayerDataProfile } from "shared/meta/default-player-data";
import KickCode from "types/enum/kick-reason";
import PlayerRemovalService from "./player-removal-service";

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

	constructor(private readonly removalService: PlayerRemovalService) {
		this.gameProfileStore = ProfileService.GetProfileStore<IPlayerData>("PlayerData", DefaultPlayerData);
	}

	public async loadPlayerProfile(player: Player): Promise<Option<PlayerDataProfile>> {
		const dataKey = tostring(player.UserId);
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

		profile.ListenToRelease(() => {
			if (!player.IsDescendantOf(game)) {
				return Option.none<PlayerDataProfile>();
			}

			this.removalService.removeForBug(player, KickCode.PlayerProfileReleased);
		});

		return Option.some<PlayerDataProfile>(profile);
	}
}
