import { IPlayerData } from "shared/meta/default-player-data";

export function calculateMultiplier(data: IPlayerData): number {
	let multiplier = 1 + data.rebirths / 5;
	if (data.gamePasses.doubleMoneyGamepass) {
		multiplier *= 2;
	}

	if (data.frenzyTimeLeft > 0) {
		if (data.gamePasses.vipGamepass) {
			multiplier *= 4;
		} else {
			multiplier *= 2;
		}
	}

	return multiplier;
}
