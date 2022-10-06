import { OnInit, OnStart, Service } from "@flamework/core";
import { ChatService, GetLuaChatService } from "@rbxts/chat-service";
import playerEntity from "server/modules/classes/player-entity";
import { OnPlayerJoin, PlayerService } from "./player-service";

interface IChatTagContainer {
	TagText: string;
	TagColor: Color3;
}

interface IChatTagEntry {
	requirement: (player: Player) => boolean;
	setupConnection?: (player: Player) => RBXScriptConnection | undefined;
}

@Service({})
export class PlayerChatService implements OnStart, OnInit, OnPlayerJoin {
	private readonly ChatService: ChatService;
	private tags: IChatTagEntry[];

	constructor(private readonly playerService: PlayerService) {
		this.ChatService = GetLuaChatService();
		this.tags = [];
	}

	/** @hidden */
	public onPlayerJoin(playerEntity: playerEntity): void {
		playerEntity.player.SetAttribute("Vip", true);
	}

	/** @hidden */
	public onInit() {
		this.ChatService.SpeakerAdded.Connect((...args): void => this.speakerAdded(...args));
	}

	/** @hidden */
	public onStart() {
		this.ChatService.GetSpeakerList().forEach((speaker: string) => {
			task.spawn(() => this.speakerAdded(speaker));
		});

		// this.ChatService.
		// this.ChatService.GetChannelList().forEach((channelName) => {
		// 	const channel = this.ChatService.GetChannel(channelName);
		// 	channel.GetSpeakerList().forEach((speakerName) => {
		// 		task.spawn(() => this.speakerAdded(speakerName));
		// 	});
		// });
	}

	private registerAttributeTag(attributeName: string): void {
		this.tags.push({
			requirement: (player: Player) => player.GetAttribute(attributeName) === true,
			setupConnection: (player: Player) => {
				return player.GetAttributeChangedSignal(attributeName).Connect((newValue: boolean) => {
					if (newValue === true) {
						print("Hi");
					}
				});
			},
		});
	}

	private speakerAdded(speakerName: string): void {
		print("Speaker Added");
		task.wait(3);
		const speaker = this.ChatService.GetSpeaker(speakerName);
		const player = speaker?.GetPlayer();
		if (!player) {
			return;
		}

		const playerEntity_opt = this.playerService.getEntity(player);
		if (playerEntity_opt.isNone()) {
			return;
		}

		const playerEntity = playerEntity_opt.unwrap();

		this.tags.forEach((entry) => {
			if (entry.requirement(player)) {
				if (entry.setupConnection !== undefined) {
					playerEntity.playerRemoving.Add(entry.setupConnection);
				}
			}
		});
	}
}
