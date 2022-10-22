import { Controller, OnStart } from "@flamework/core";
import { Players, SocialService } from "@rbxts/services";
import Icon from "@rbxts/topbar-plus";
import { Events } from "client/network";
import { ClientStore } from "client/rodux/rodux";
import { MusicController } from "./music-controller";

@Controller({})
export class TopbarController implements OnStart {
	constructor(private readonly musicController: MusicController) {}

	public onStart() {
		this.setupMusicButton();
		this.setupInviteFriendsButton();
	}

	private setupMusicButton(): void {
		const muteMusic = new Icon();
		muteMusic.setRight();
		muteMusic.setImage(6413981913);
		muteMusic.setTip("Mute background audio!");
		muteMusic.deselectWhenOtherIconSelected = false;

		const canPlayMusic = ClientStore.getState().playerData.settings.music;
		if (canPlayMusic) {
			muteMusic.setImage(166377448);
			muteMusic.select();
		}

		muteMusic.selected.Connect(() => {
			Events.updateSettings.fire({ music: true });
		});

		muteMusic.deselected.Connect(() => {
			Events.updateSettings.fire({ music: false });
		});

		ClientStore.changed.connect((newState) => {
			if (newState.playerData.settings.music) {
				this.musicController.resumeMusic();
				muteMusic.setImage(166377448);
				if (muteMusic.getToggleState() === "deselected") {
					muteMusic.select();
				}
			} else {
				this.musicController.pauseMusic();
				muteMusic.setImage(6413981913);
				if (muteMusic.getToggleState() === "selected") {
					muteMusic.select();
				}
			}
		});
	}

	private setupInviteFriendsButton(): void {
		const inviteFriends = new Icon();
		inviteFriends.setImage(7343626130, "deselected");
		inviteFriends.setCornerRadius(0, 8);
		inviteFriends.setRight();
		inviteFriends.setTip("Invite your friends!");
		inviteFriends.selected.Connect(async () => {
			inviteFriends.deselect();

			const [_, result_1] = pcall(() => SocialService.CanSendGameInviteAsync(Players.LocalPlayer));

			if (result_1 === true) {
				pcall(() => {
					SocialService.PromptGameInvite(Players.LocalPlayer);
				});
			}
		});
	}
}
