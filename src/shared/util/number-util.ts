export namespace NumberUtil {
	/**
	 * Generates a random number between min and max, but will not repeat the same
	 * number twice in a row.
	 *
	 * #### Usage:
	 * ```ts
	 * const getRandomInterval = NumberUtil.setRandomInterval(1, 10);
	 * const randomNumber = getRandomInterval();
	 * ```
	 *
	 * @param min The minimum number to generate
	 * @param max The maximum number to generate
	 *
	 * @returns A function that will generate a random number between min and max
	 * when called.
	 */
	export function setRandomInterval(min: number, max: number): () => number {
		assert(min < max, "min must be less than max");

		let lastValue: number;
		let value: number;
		let count = 0;
		const getRandom = (): number => {
			return math.floor(math.random() * (max - min + 1) + min);
		};

		return (): number => {
			let random;
			if (count > 0 && value !== lastValue) {
				--count;
				lastValue = value;
				return lastValue;
			}

			random = getRandom();

			while (random === lastValue) {
				value = random;
				++count;
				random = getRandom();
			}

			lastValue = random;
			return lastValue;
		};
	}
}
