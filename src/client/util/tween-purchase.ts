import { TweenService } from "@rbxts/services";

const RNG = new Random();
const OFFSET = 2;

function getDescendantsWhichAreA<T extends keyof Instances>(ancestor: Instance, className: T): Instance[] {
	const result: Instance[] = [];
	for (const descendant of ancestor.GetDescendants()) {
		if (descendant.IsA(className)) {
			result.push(descendant);
		}
	}
	return result;
}

function instanceListToPropertyMap<T extends BasePart, K extends keyof Partial<WritableInstanceProperties<BasePart>>>(
	instances: T[],
	propertyList: K[],
) {
	const result = new Map<BasePart, Map<K, T[K]>>();
	for (const instance of instances) {
		result.set(instance, new Map<K, T[K]>());
		for (const property of propertyList) {
			result.get(instance)?.set(property, instance[property]);
		}
	}
	return result;
}

export async function animateModelIn(model: Model, tweenInfo: TweenInfo) {
	const parts = getDescendantsWhichAreA(model, "BasePart") as BasePart[];
	const originalProperties = instanceListToPropertyMap(parts, ["Transparency", "CFrame", "Color", "Size"]);

	for (const part of parts) {
		part.Transparency = 1;
		part.Color = Color3.fromRGB(255, 255, 255);
		part.Size = new Vector3();

		const positionOffset = new Vector3(
			RNG.NextNumber(-1, 1),
			RNG.NextNumber(-0.25, 1.75),
			RNG.NextNumber(-1, 1),
		).mul(OFFSET);
		const rotationOffset = CFrame.Angles(
			RNG.NextNumber(-math.pi, math.pi),
			RNG.NextNumber(-math.pi, math.pi),
			RNG.NextNumber(-math.pi, math.pi),
		);
		part.CFrame = new CFrame(positionOffset).mul(rotationOffset);
	}

	return new Promise<void>((resolve) => {
		for (const part of parts) {
			const properties = originalProperties.get(part) as unknown as Partial<ExtractMembers<BasePart, Tweenable>>;
			const tween = TweenService.Create(part, tweenInfo, properties);

			tween.Completed.Connect(() => {
				part.Transparency = originalProperties.get(part)?.get("Transparency") as number;
				part.CFrame = originalProperties.get(part)?.get("CFrame") as CFrame;
				return resolve();
			});

			tween.Play();
			task.wait(0.03);
		}
	});
}
