/**
 *
 * @param base
 * @param goal
 * @param alpha
 * @returns
 */
export function lerpNumber(base: number, goal: number, alpha: number) {
	return base + (goal - base) * alpha;
}
