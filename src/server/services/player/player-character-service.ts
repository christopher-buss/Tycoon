import { OnStart, Service } from "@flamework/core";
import { Logger } from "@rbxts/log";
import promiseR15, { CharacterRigR6, CharacterRigR15, promiseR6 } from "@rbxts/promise-character";
import { promiseChildOfClass } from "@rbxts/promise-child";
import { CollectionService, Players } from "@rbxts/services";
import playerEntity from "server/modules/classes/player-entity";
import { Tag } from "types/enum/tags";

import { OnPlayerJoin } from "./player-service";

@Service({})
export class PlayerCharacterService implements OnStart, OnPlayerJoin {
	constructor(private readonly logger: Logger) {}

	public onStart(): void {
		// initaliseServer();
	}

	public onPlayerJoin(playerEntity: playerEntity): void {
		const player = playerEntity.player;
		if (player.Character) {
			this.characterAdded(player, player.Character).catch((err) => this.logger.Warn(err));
		}

		player.CharacterAdded.Connect((character) => {
			this.characterAdded(player, character).catch((err) => this.logger.Warn(err));
		});

		//TODO: move this
		player.SetAttribute("Cash", playerEntity.data.cash);
		player.SetAttribute("Rebirths", playerEntity.data.rebirths);
	}

	private async characterAdded(player: Player, _c: Model): Promise<void> {
		const rigType = (await promiseChildOfClass(_c, "Humanoid")).RigType.Name;

		if (rigType === "R15") {
			const rig15 = await promiseR15(_c);
			this.characterR15(rig15);
			this.characterShared(player, rig15);
		} else if (rigType === "R6") {
			const rig6 = await promiseR6(_c);
			this.characterR6(rig6);
			this.characterShared(player, rig6);
		} else {
			throw error(`${_c.Name} has an unknown rig type! ${rigType}`);
		}
	}

	private characterR6(_rig6: CharacterRigR6): void {}

	private characterR15(_rig15: CharacterRigR15): void {}

	private characterShared(player: Player, rig: CharacterRigR6 | CharacterRigR15): void {
		task.defer(() => {
			rig.Humanoid.DisplayDistanceType = Enum.HumanoidDisplayDistanceType.None;
			CollectionService.AddTag(rig.Head, Tag.PlayerHead);
		});

		rig.Humanoid.Died.Connect(() => {
			task.wait(Players.RespawnTime);
			player.LoadCharacter();
		});

		rig.Humanoid.WalkSpeed = 50;
	}
}
