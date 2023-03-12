export interface ModelWithPrimaryPart extends Model {
	PrimaryPart: BasePart;
}

export namespace RobloxUtil {
	/**
	 * Joins with default roblox's asset link with the asset id
	 * provided in id parameter
	 */
	export function assetUrlWithId(id: number): string {
		return `rbxassetid://${id}`;
	}

	export async function preloadAnimation(animationId: string): Promise<Animation> {
		const animation = new Instance("Animation");
		animation.AnimationId = animationId;
		//TODO: Why can't I preload animations?
		// if (RunService.IsClient()) {
		// 	ContentProvider.PreloadAsync([animation]);
		// }
		return animation;
	}

	export async function retryLoadAnimation(
		animator: Animator,
		animation: Animation,
	): Promise<AnimationTrack | undefined> {
		const load = (): Promise<AnimationTrack> => {
			return new Promise((resolve, reject) => {
				const [success, track] = pcall(() => animator.LoadAnimation(animation)) as LuaTuple<
					[boolean, AnimationTrack]
				>;

				if (!success) {
					reject();
				}

				return resolve(track);
			});
		};

		return Promise.retryWithDelay(load, 5, 1);
	}

	/**
	 * Plays a given animation on a model with a humanoid
	 * @param humanoid The humanoid of the model
	 * @param animationId The animation id to play
	 */
	export async function playAnimationOnHumanoid(humanoid: Humanoid, animation: Animation): Promise<AnimationTrack> {
		let animator = humanoid.FindFirstChildWhichIsA("Animator");
		if (animator === undefined) {
			animator = new Instance("Animator");
			animator.Parent = humanoid;
		}

		const track = await retryLoadAnimation(animator, animation);
		assert(track, "Could not load animation");

		track.Play();

		return track;
	}

	/**
	 *
	 * @param model
	 * @returns
	 */
	export function hasPrimaryPart(model: Model): model is ModelWithPrimaryPart {
		return !!model.PrimaryPart;
	}
}
