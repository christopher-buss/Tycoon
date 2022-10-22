import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Logger } from "@rbxts/log";
import { ServerStorage } from "@rbxts/services";
import { PlayerService } from "server/services/player/player-service";
import { Tag } from "types/enum/tags";

interface Attributes {
	RequiredRebirths: number;
	ToolName: string;
}

interface RebirthUpgradeModel extends Part {
	ProximityPrompt: ProximityPrompt;
}

@Component({
	tag: Tag.RebirthUpgrade,
})
export class RebirthUpgrade extends BaseComponent<Attributes, RebirthUpgradeModel> implements OnStart {
	private readonly tool: Tool;

	constructor(private readonly logger: Logger, private readonly playerService: PlayerService) {
		super();

		// eslint-disable-next-line roblox-ts/no-any
		this.tool = ServerStorage.RebirthItems.FindFirstChild(this.attributes.ToolName) as Tool;
		assert(this.tool !== undefined, `Could not find tool ${this.attributes.ToolName}`);
	}

	public onStart() {
		this.instance.ProximityPrompt.Triggered.Connect((player) => this.onProximityPromptTriggered(player));
	}

	private onProximityPromptTriggered(player: Player) {
		const entity_opt = this.playerService.getEntity(player);
		if (entity_opt.isNone()) {
			return;
		}

		const playerEntity = entity_opt.unwrap();

		// Player already has the tool acquired so it should not be given again.
		const existingTool = playerEntity.data.acquiredTools.find((toolName) => toolName === this.tool.Name);
		if (existingTool !== undefined) {
			this.logger.Info(`Player ${player.Name} already has tool ${this.tool.Name} acquired.`);
			return;
		}

		const totalRebirths = playerEntity.data.rebirths;
		if (totalRebirths < this.attributes.RequiredRebirths) {
			return;
		}

		this.logger.Info(`Giving ${player.Name} ${this.tool.Name}`);

		playerEntity.updateData((data) => {
			data.acquiredTools.push(this.tool.Name);
			return data;
		});

		const addTool = () => {
			const tool = this.tool.Clone();
			const backpack = player.FindFirstChild("Backpack");
			if (backpack) {
				tool.Parent = backpack;
			}
		};

		const character = player.Character;
		if (character) {
			addTool();
		}

		playerEntity.playerRemoving.Add(player.CharacterAdded.Connect(addTool));
	}
}
