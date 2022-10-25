import { OnInit, Service } from "@flamework/core";
import { Logger } from "@rbxts/log";
import promiseR15, { CharacterRigR15, CharacterRigR6, promiseR6 } from "@rbxts/promise-character";
import { promiseChildOfClass } from "@rbxts/promise-child";
import playerEntity from "server/modules/classes/player-entity";
import { Events } from "server/network";
import { GamepassPlayerKey } from "shared/meta/default-player-data";
import { OnPlayerJoin, PlayerService } from "./player-service";

export type EffectInfo = Fire | Sparkles;

@Service({})
export class PlayerEffectService implements OnInit, OnPlayerJoin {
	constructor(private readonly logger: Logger, private readonly playerService: PlayerService) {}

	public onInit(): void {
		Events.modifyEffect.connect((...args) => this.clientModifyEffect(...args));
	}

	public onPlayerJoin(playerEntity: playerEntity): void {
		const player = playerEntity.player;
		if (player.Character) {
			this.characterAdded(player.Character, playerEntity);
		}

		player.CharacterAdded.Connect((character) => {
			this.characterAdded(character, playerEntity);
		});
	}

	private clientModifyEffect(player: Player, activate: boolean, effectName: string) {
		const entity_opt = this.playerService.getEntity(player);
		if (entity_opt.isNone()) {
			return;
		}

		const playerEntity = entity_opt.unwrap();
		const hasEffect = playerEntity.data.gamePasses[effectName as GamepassPlayerKey];
		if (hasEffect !== undefined && hasEffect) {
			switch (effectName) {
				case "sparkleEffectGamepass":
					playerEntity.updateData((data) => {
						data.effectsActivated.sparkle = activate;
						return data;
					});
					break;

				case "fireEffectGamepass":
					playerEntity.updateData((data) => {
						data.effectsActivated.fire = activate;
						return data;
					});
					break;

				default:
					this.logger.Warn(`Unknown effect name ${effectName}`);
					break;
			}
		}

		this.characterAdded(player.Character!, playerEntity);
	}

	private async characterAdded(_c: Model, playerEntity: playerEntity) {
		const rigType = (await promiseChildOfClass(_c, "Humanoid")).RigType.Name;

		if (rigType === "R15") {
			const rig15 = await promiseR15(_c);
			this.characterR15(rig15, playerEntity);
		} else if (rigType === "R6") {
			const rig6 = await promiseR6(_c);
			this.characterR6(rig6, playerEntity);
		} else {
			throw `${_c.Name} has an unknown rig type! ${rigType}`;
		}
	}

	private characterR6(rig6: CharacterRigR6, playerEntity: playerEntity) {
		if (playerEntity.data.gamePasses.sparkleEffectGamepass && playerEntity.data.effectsActivated.sparkle) {
			this.activateSparkles(playerEntity.player, rig6.Torso);
		} else {
			this.deactivateSparkles(playerEntity.player, rig6.Torso);
		}

		if (playerEntity.data.gamePasses.fireEffectGamepass && playerEntity.data.effectsActivated.fire) {
			this.activateFire(playerEntity.player, rig6.Torso);
		} else {
			this.deactivateFire(playerEntity.player, rig6.Torso);
		}
	}

	private characterR15(rig15: CharacterRigR15, playerEntity: playerEntity) {
		if (playerEntity.data.gamePasses.sparkleEffectGamepass && playerEntity.data.effectsActivated.sparkle) {
			this.activateSparkles(playerEntity.player, rig15.UpperTorso);
		} else {
			this.deactivateSparkles(playerEntity.player, rig15.UpperTorso);
		}

		if (playerEntity.data.gamePasses.fireEffectGamepass && playerEntity.data.effectsActivated.fire) {
			this.activateFire(playerEntity.player, rig15.UpperTorso);
		} else {
			this.deactivateFire(playerEntity.player, rig15.UpperTorso);
		}
	}

	private modifyEffect<T extends EffectInfo>(
		activate: boolean,
		effectType: string,
		player: Player,
		effectLocation: BasePart,
	) {
		let effect = player.Character?.FindFirstChild(effectLocation.Name)?.FindFirstChild(effectType) as T;
		if (effect === undefined) {
			effect = new Instance(effectType as unknown as keyof CreatableInstances) as T;
			effect.Name = effectType;
			effect.Parent = effectLocation;
		}
		effect.Enabled = activate;
	}

	private activateSparkles(player: Player, sparkleLocation: BasePart) {
		this.modifyEffect<Fire>(true, "Sparkles", player, sparkleLocation);
	}

	private deactivateSparkles(player: Player, sparkleLocation: BasePart) {
		this.modifyEffect<Sparkles>(false, "Sparkles", player, sparkleLocation);
	}

	private activateFire(player: Player, fireLocation: BasePart) {
		this.modifyEffect<Fire>(true, "Fire", player, fireLocation);
	}

	private deactivateFire(player: Player, fireLocation: BasePart) {
		this.modifyEffect<Fire>(false, "Fire", player, fireLocation);
	}
}
