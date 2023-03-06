import { Service } from "@flamework/core";
import { ServerStorage } from "@rbxts/services";
import playerEntity from "server/modules/classes/player-entity";

import { OnPlayerJoin } from "./player-service";

@Service({})
export class PlayerToolService implements OnPlayerJoin {
	public onPlayerJoin(playerEntity: playerEntity): void {
		if (playerEntity.player.Character) {
			this.addOwnedTools(playerEntity);
		}

		playerEntity.player.CharacterAdded.Connect(() => {
			this.addOwnedTools(playerEntity);
		});
	}

	private addOwnedTools(playerEntity: playerEntity): void {
		for (const toolName of playerEntity.data.acquiredTools) {
			const backpack = playerEntity.player.FindFirstChildOfClass("Backpack");
			if (backpack) {
				let newTool = ServerStorage.RebirthItems.FindFirstChild(toolName) as Tool;
				if (newTool) {
					newTool = newTool.Clone();
					newTool.Parent = backpack;
				}
			}
		}
	}
}
