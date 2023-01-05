import { TweenService } from "@rbxts/services";

function apply<T extends Instance>(obj: T, props: Partial<ExtractMembers<T, Tweenable>>): void {
	// eslint-disable-next-line roblox-ts/no-array-pairs
	for (const [key, value] of pairs(props)) {
		obj[key as WritablePropertyNames<T>] = value as WritableProperties<T>[WritablePropertyNames<T>];
	}
}

export namespace TweenUtil {
	export function tweenPromise<T>(
		obj: Instance,
		tweenInfo: TweenInfo,
		props: Partial<ExtractMembers<T, Tweenable>>,
	): Promise<void> {
		return new Promise((resolve, _reject, onCancel) => {
			const tween = TweenService.Create(obj, tweenInfo, props);

			if (
				onCancel(() => {
					tween.Cancel();
					apply(obj, props);
				})
			) {
				return;
			}

			tween.Completed.Connect(() => {
				resolve();
			});

			tween.Play();
		});
	}
}
