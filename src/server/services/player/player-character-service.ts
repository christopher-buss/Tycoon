import { OnStart, Service } from "@flamework/core";
import { initaliseServer } from "@rbxts/character-realism";
import promiseR15, { CharacterRigR15, CharacterRigR6, promiseR6 } from "@rbxts/promise-character";
import { promiseChildOfClass } from "@rbxts/promise-child";
import { CollectionService, Players } from "@rbxts/services";
import playerEntity from "server/modules/classes/player-entity";
import { Tag } from "types/enum/tags";
import { OnPlayerJoin } from "./player-service";

@Service({})
export class PlayerCharacterService implements OnStart, OnPlayerJoin {
	constructor() {}

	public onStart(): void {
		initaliseServer();
	}

	public onPlayerJoin(playerEntity: playerEntity): void {
		const player = playerEntity.player;
		if (player.Character) {
			this.characterAdded(player, player.Character);
		}

		player.CharacterAdded.Connect((character) => {
			this.characterAdded(player, character);
		});
	}

	private async characterAdded(player: Player, _c: Model) {
		const rigType = (await promiseChildOfClass(_c, "Humanoid")).RigType.Name;

		if (rigType === "R15") {
			const rig15 = await promiseR15(_c);
			//this.characterR15(rig15);
			this.characterShared(player, rig15);
		} else if (rigType === "R6") {
			const rig6 = await promiseR6(_c);
			//this.characterR6(rig6);
			this.characterShared(player, rig6);
		} else {
			throw `${_c.Name} has an unknown rig type! ${rigType}`;
		}
	}

	private characterR6(rig6: CharacterRigR6) {}

	private characterR15(rig15: CharacterRigR15) {}

	private characterShared(player: Player, rig: CharacterRigR6 | CharacterRigR15): void {
		CollectionService.AddTag(rig.Head, Tag.PlayerHead);

		rig.Humanoid.Died.Connect(() => {
			task.wait(Players.RespawnTime);
			player.LoadCharacter();
		});
	}
}
