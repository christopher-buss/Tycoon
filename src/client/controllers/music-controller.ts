import { Controller, OnInit, OnStart } from "@flamework/core";
import { Logger } from "@rbxts/log";
import { ContentProvider, ReplicatedStorage, SoundService } from "@rbxts/services";

@Controller({})
export class MusicController implements OnStart, OnInit {
	private backgroundMusic: Array<Sound>;
	private backgroundMusicSoundGroup!: SoundGroup;
	private songIndex: number;

	constructor(private readonly logger: Logger) {
		this.backgroundMusic = [];
		this.songIndex = 0;
	}

	public onInit(): void {
		this.backgroundMusic = ReplicatedStorage.Sounds.BackgroundMusic.GetChildren() as Array<Sound>;
		this.backgroundMusicSoundGroup = SoundService.BackgroundMusic;
	}

	public onStart(): void {
		Promise.try(() => ContentProvider.PreloadAsync(this.backgroundMusic))
			.andThen(() => {
				if (this.backgroundMusic.size() === 0) {
					warn(`No background music found!`);
					return;
				}

				this.playMusic();
			})
			.catch((err) => {
				this.logger.Warn(err);
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
