import { OnInit, Service } from "@flamework/core";
import { ChatService, ChatSpeaker, ExtraData, GetLuaChatService } from "@rbxts/chat-service";
import { Logger } from "@rbxts/log";
import { default as PlayerEntity, default as playerEntity } from "server/modules/classes/player-entity";
import { GROUP_ID } from "shared/shared-constants";
import { OnPlayerJoin, PlayerService } from "./player-service";

interface IChatTagContainer {
	TagText: string;
	TagColor: Color3;
}

interface IChatTagEntry {
	requirement: (player: Player) => boolean;
	setupConnection?: (player: Player) => RBXScriptConnection;
	tagInfo: IChatTagContainer;
}

@Service({})
export class PlayerChatService implements OnInit, OnPlayerJoin {
	private readonly ChatService: ChatService;
	private tags: IChatTagEntry[];
	private groupTags: IChatTagEntry[];
	private playerCurrentTags: Map<Player, IChatTagContainer[]>;

	constructor(private readonly logger: Logger, private readonly playerService: PlayerService) {
		this.ChatService = GetLuaChatService();
		this.tags = [];
		this.groupTags = [];
		this.playerCurrentTags = new Map();
	}

	/** @hidden */
	public onPlayerJoin(playerEntity: playerEntity): void {
		playerEntity.player.SetAttribute("Vip", true);

		const speaker = this.ChatService.GetSpeaker(playerEntity.player.Name);
		if (speaker) {
			this.speakerAdded(playerEntity, speaker);
		}
	}

	/** @hidden */
	public onInit() {
		this.registerAttributeTag("Vip", {
			TagText: "VIP",
			TagColor: Color3.fromRGB(209, 197, 32),
		});

		this.registerGroupTag(GROUP_ID, 254, {
			TagText: "Vice President & Shareholder",
			TagColor: Color3.fromRGB(255, 0, 0),
		});

		this.registerGroupTag(GROUP_ID, 4, {
			TagText: "Director",
			TagColor: Color3.fromRGB(0, 77, 221),
		});

		this.registerGroupTag(GROUP_ID, 2, {
			TagText: "Administrator",
			TagColor: Color3.fromRGB(0, 77, 221),
		});

		this.registerGroupTag(GROUP_ID, 1, {
			TagText: "Member",
			TagColor: Color3.fromRGB(0, 77, 221),
		});

		// this.registerPremiumTag({
		// 	TagText: "Premium",
		// 	TagColor: Color3.fromRGB(206, 197, 197),
		// });
	}

	private registerPremiumTag(tagInfo: IChatTagContainer) {
		this.tags.push({
			requirement: (player: Player) => player.MembershipType === Enum.MembershipType.Premium,
			tagInfo: tagInfo,
		});
	}

	private registerGroupTag(groupId: number, rank: number, tagInfo: IChatTagContainer): void {
		this.groupTags.push({
			requirement: (player: Player) => player.IsInGroup(groupId) && player.GetRankInGroup(groupId) >= rank,
			tagInfo: tagInfo,
		});
	}

	private registerAttributeTag(attributeName: string, tagInfo: IChatTagContainer): void {
		this.tags.push({
			requirement: (player: Player) => player.GetAttribute(attributeName) === true,
			setupConnection: (player: Player) => {
				return player.GetAttributeChangedSignal(attributeName).Connect((newValue: boolean) => {
					if (newValue === true) {
						this.playerCurrentTags.get(player)?.push(tagInfo);
						const currentTags = this.playerCurrentTags.get(player);
						if (currentTags) {
							this.ChatService.GetSpeaker(player.Name)?.SetExtraData("Tags", currentTags);
						}
					}
				});
			},
			tagInfo: tagInfo,
		});
	}

	private speakerAdded(playerEntity: PlayerEntity, speaker: ChatSpeaker): void {
		const playerTags: IChatTagContainer[] = [];

		// We only want to award the highest rank group tag.
		for (const entry of this.groupTags) {
			if (entry.requirement(playerEntity.player)) {
				this.logger.Info(`Adding tag ${entry.tagInfo.TagText} to ${playerEntity.player.Name}`);
				playerTags.push(entry.tagInfo);
				break;
			}
		}

		this.tags.forEach((entry) => {
			if (entry.requirement(playerEntity.player)) {
				this.logger.Info(`Adding tag ${entry.tagInfo.TagText} to ${playerEntity.player.Name}`);
				playerTags.push(entry.tagInfo);
			} else if (entry.setupConnection !== undefined) {
				playerEntity.playerRemoving.Add(entry.setupConnection(playerEntity.player));
			}
		});

		speaker?.SetExtraData("Tags", playerTags);
	}

	public sendSystemMessage(message: string, data: Partial<ExtraData>): void {
		this.ChatService.GetSpeaker("System")?.SayMessage(message, "All", data);
	}

	public sendLocalSystemMessage(player: Player, message: string, data: Partial<ExtraData>): void {
		this.ChatService.GetSpeaker(player.Name)?.SendSystemMessage(message, "System", data);
	}
}
