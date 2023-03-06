import { ContentProvider } from "@rbxts/services";

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

	export async function initializeAnimation<T extends Instance>(
		animationId: string,
		parent: T,
	): Promise<AnimationTrack> {
		let animator = parent.FindFirstChildWhichIsA("Animator");
		if (animator === undefined) {
			animator = new Instance("Animator");
			animator.Parent = parent;
		}

		const animation = new Instance("Animation");
		animation.AnimationId = animationId;

		const track = animator.LoadAnimation(animation);
		ContentProvider.PreloadAsync([animation]);
		return track;
	}

	/**
	 * Plays a given animation on a model with a humanoid
	 * @param humanoid The humanoid of the model
	 * @param animationId The animation id to play
	 */
	export function playAnimationOnHumanoid(humanoid: Humanoid, animationId: string): AnimationTrack {
		let animator = humanoid.FindFirstChildWhichIsA("Animator");
		if (animator === undefined) {
			animator = new Instance("Animator");
			animator.Parent = humanoid;
		}

		const animation = new Instance("Animation");
		animation.AnimationId = animationId;

		const track = animator.LoadAnimation(animation);
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
