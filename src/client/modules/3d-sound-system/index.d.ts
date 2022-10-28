declare namespace SoundSystem {
	export function Attach(soundObj: Sound): void;

	export function Create(
		id: string,
		target: Instance | Vector3 | CFrame,
		name: string,
		looped?: boolean,
	): Attachment & { Sound: Sound };
}

export = SoundSystem;
