import { Controller, OnInit, OnStart } from "@flamework/core";
import { ContentProvider, ReplicatedStorage, SoundService } from "@rbxts/services";

@Controller({})
export class MusicController implements OnStart, OnInit {
	private backgroundMusic: Sound[];
	private backgroundMusicSoundGroup!: SoundGroup;
	private songIndex: number;

	constructor() {
		this.backgroundMusic = [];
		this.songIndex = 0;
	}

	public onInit() {
		this.backgroundMusic = ReplicatedStorage.Sounds.BackgroundMusic.GetChildren() as Sound[];
		this.backgroundMusicSoundGroup = SoundService.BackgroundMusic;
	}

	public onStart() {
		Promise.try(() => ContentProvider.PreloadAsync(this.backgroundMusic)).andThen(() => {
			this.playMusic();
		});
	}

	private playMusic(): void {
		while (true) {
			const song = this.backgroundMusic[this.songIndex];
			song.Play();

			this.songIndex = (this.songIndex % this.backgroundMusic.size()) + 1;
			task.wait(song.TimeLength);
		}
	}

	public resumeMusic(): void {
		this.backgroundMusicSoundGroup.Volume = 0.35;
	}

	public pauseMusic(): void {
		this.backgroundMusicSoundGroup.Volume = 0;
	}
}
