import { OnInit, Service } from "@flamework/core";
import { ChatService, ChatSpeaker, ExtraData, GetLuaChatService } from "@rbxts/chat-service";
import { Logger } from "@rbxts/log";
import { default as PlayerEntity, default as playerEntity } from "server/modules/classes/player-entity";
import { GROUP_ID } from "shared/shared-constants";

import { OnPlayerJoin } from "./player-service";

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
	private tags: Array<IChatTagEntry>;
	private groupTags: Array<IChatTagEntry>;
	private playerCurrentTags: Map<Player, Array<IChatTagContainer>>;

	constructor(private readonly logger: Logger) {
		this.ChatService = GetLuaChatService();
		this.tags = [];
		this.groupTags = [];
		this.playerCurrentTags = new Map();
	}

	/** @hidden */
	public onPlayerJoin(playerEntity: playerEntity): void {
		const speaker = this.ChatService.GetSpeaker(playerEntity.player.Name);
		this.logger.Debug(`Player ${playerEntity.player.Name} joined, adding chat speaker.`);
		if (speaker) {
			this.speakerAdded(playerEntity, speaker);
			return;
		}

		const connection = this.ChatService.SpeakerAdded.Connect((name) => {
			if (name === playerEntity.player.Name) {
				const speaker = this.ChatService.GetSpeaker(name);
				if (!speaker) {
					this.logger.Error(`Speaker added for ${name} but speaker is undefined`);
					return;
				}
				connection.Disconnect();
				this.speakerAdded(playerEntity, speaker);
			}
		});
	}

	/** @hidden */
	public onInit(): void {
		this.registerAttributeTag("Vip", {
			TagText: "VIP",
			TagColor: Color3.fromRGB(209, 197, 32),
		});

		this.registerGroupTag(GROUP_ID, 254, {
			TagText: "Owner",
			TagColor: Color3.fromRGB(255, 0, 0),
		});

		this.registerGroupTag(GROUP_ID, 1, {
			TagText: "Member",
			TagColor: Color3.fromRGB(0, 77, 221),
		});
	}

	private registerPremiumTag(tagInfo: IChatTagContainer): void {
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
				return player.GetAttributeChangedSignal(attributeName).Connect(() => {
					if (player.GetAttribute(attributeName) === true) {
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
		const playerTags: Array<IChatTagContainer> = [];
		this.playerCurrentTags.set(playerEntity.player, playerTags);

		// We only want to award the highest rank group tag.
		for (const entry of this.groupTags) {
			if (entry.requirement(playerEntity.player)) {
				this.logger.Info(`Adding tag ${entry.tagInfo.TagText} to ${playerEntity.player.Name}`);
				playerTags.push(entry.tagInfo);
				break;
			}
		}

		for (const entry of this.tags) {
			if (entry.requirement(playerEntity.player)) {
				this.logger.Info(`Adding tag ${entry.tagInfo.TagText} to ${playerEntity.player.Name}`);
				playerTags.push(entry.tagInfo);
			} else if (entry.setupConnection !== undefined) {
				this.logger.Verbose(`Adding connection for ${playerEntity.player.Name} to ${entry.tagInfo.TagText}`);
				playerEntity.playerRemoving.Add(entry.setupConnection(playerEntity.player));
			}
		}

		speaker?.SetExtraData("Tags", playerTags);
	}

	public sendSystemMessage(message: string, data: Partial<ExtraData>): void {
		this.ChatService.GetSpeaker("System")?.SayMessage(message, "All", data);
	}

	public sendLocalSystemMessage(player: Player, message: string, data: Partial<ExtraData>): void {
		this.ChatService.GetSpeaker(player.Name)?.SendSystemMessage(message, "System", data);
	}
}
