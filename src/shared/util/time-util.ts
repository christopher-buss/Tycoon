export namespace TimeUtil {
	export function convertToTime(seconds: number): string {
		const minutes = math.floor(seconds / 60);
		const second = seconds - minutes * 60;
		return `${string.format("%02i", minutes)}:${string.format("%02i", second)}`;
	}
}
