import { OnInit, Service } from "@flamework/core";
import { Logger } from "@rbxts/log";
import { Option } from "@rbxts/rust-classes";
import playerEntity from "server/modules/classes/player-entity";
import DefaultPlayerData, { IPlayerData } from "shared/meta/default-player-data";

import { OnPlayerJoin } from "./player/player-service";

interface ILeaderstatValueTypes {
	IntValue: number;
	StringValue: string;
}

interface ILeaderstatEntry<T extends keyof ILeaderstatValueTypes = keyof ILeaderstatValueTypes> {
	Name: string;
	ValueType: T;
	DefaultValue: ILeaderstatValueTypes[T];
	PlayerDataKey?: string;
}

/**
 * A service that initializes the roblox leaderboard stats for the game.
 */
@Service({})
export class LeaderstatsService implements OnInit, OnPlayerJoin {
	private leaderstats: Array<ILeaderstatEntry>;
	private playerToLeaderstatsMap: Map<Player, Folder>;
	private playerToValueMap: Map<Player, Map<string, Instances[keyof ILeaderstatValueTypes]>>;

	constructor(private readonly logger: Logger) {
		this.leaderstats = [];
		this.playerToLeaderstatsMap = new Map();
		this.playerToValueMap = new Map();
	}

	/** @hidden */
	public onInit(): void {
		this.registerStat("Rebirths", "IntValue", DefaultPlayerData.rebirths, "rebirths");
		this.registerStat("Cash", "IntValue", DefaultPlayerData.cash, "cash");
	}

	/**
	 * Binds any registered stats to the player.
	 * @param playerEntity A class attached to the player that manages data.
	 * @hidden
	 */
	public onPlayerJoin(playerEntity: playerEntity): void {
		const leaderstats = new Instance("Folder");
		leaderstats.Name = "leaderstats";
		leaderstats.Parent = playerEntity.player;

		this.playerToLeaderstatsMap.set(playerEntity.player, leaderstats);

		this.logger.Info(`Assigning leaderboard stats to {@Player} `, playerEntity.player.Name);

		const valueMap = new Map<string, Instances[keyof ILeaderstatValueTypes]>();

		this.leaderstats.forEach((entry) => {
			const value = new Instance(entry.ValueType);

			if (entry.PlayerDataKey !== undefined) {
				value.Value = playerEntity.data[entry.PlayerDataKey as keyof IPlayerData] as string | number;
			} else {
				value.Value = entry.DefaultValue;
			}

			value.Name = entry.Name;
			value.Parent = leaderstats;

			valueMap.set(entry.Name, value);
		});

		this.playerToValueMap.set(playerEntity.player, valueMap);

		playerEntity.playerRemoving.Add(() => this.onPlayerRemoving(playerEntity.player));
	}

	/** @hidden */
	private onPlayerRemoving(player: Player): void {
		const valueMap = this.playerToValueMap.get(player);
		if (valueMap !== undefined) {
			valueMap.forEach((val) => val.Destroy());
		}
		this.playerToValueMap.delete(player);

		// Destroy leaderstats on leave.
		const leaderstats = this.playerToLeaderstatsMap.get(player);
		if (leaderstats !== undefined) {
			leaderstats.Destroy();
		}
		this.playerToLeaderstatsMap.delete(player);
	}

	/**
	 * Registers a new stat to the leaderboard.
	 * @param statName The name of the stat.
	 * @param valueType The type of value the stat will hold.
	 * @param defaultValue The default value of the stat.
	 * @param playerDataKey An optional key for persistent data that binds to the stat.
	 */
	private registerStat<N extends keyof ILeaderstatValueTypes>(
		statName: string,
		valueType: N,
		defaultValue: ILeaderstatValueTypes[N],
		playerDataKey?: string,
	): void {
		assert(
			this.leaderstats.filter((entry) => entry.Name === statName).size() <= 0,
			`Stat provided already exists.`,
		);

		this.leaderstats.push({
			Name: statName,
			DefaultValue: defaultValue,
			ValueType: valueType,
			PlayerDataKey: playerDataKey,
		});

		this.logger.Info(`Registered leaderboard stat {@stat}`, statName);
	}

	/**
	 * Returns a given stat object for a player. This is used to update the
	 * leaderboard values for a given player.
	 * @param player The player to get the stat object for.
	 * @param statName The name of the stat to find.
	 * @returns The stat object if it exists.
	 */
	public getStatObject<N extends keyof ILeaderstatValueTypes>(
		player: Player,
		statName: string,
	): Option<Instances[N]> {
		const valueMap = this.playerToValueMap.get(player);
		if (!valueMap) {
			return Option.none<Instances[N]>();
		}

		const entry = this.leaderstats.find((entry) => entry.Name === statName);
		if (!entry) {
			return Option.none<Instances[N]>();
		}

		return Option.wrap<Instances[N]>(valueMap.get(entry.Name) as Instances[N]);
	}
}
