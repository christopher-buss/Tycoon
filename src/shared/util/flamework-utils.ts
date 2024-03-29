import { BaseComponent, Components } from "@flamework/components";
import { Controller, Dependency, Flamework, Modding, Reflect, Service } from "@flamework/core";
import { Constructor } from "@flamework/core/out/types";

// https://github.com/memolemo-studios/SoftwareTycoon/blob/2ca3edf6dd73579b1bdc8a3af6dd3997a8cf261e/src/shared/utils/flamework.ts
export namespace FlameworkUtil {
	/** Flamework decorator prefix */
	export const DECORATOR_PREFIX = `flamework:decorators.`;

	/** Returns if an `object` has a decorator with decorator id */
	export function isDecoratorOf(id: string, obj: object): boolean {
		return Reflect.hasMetadata(obj, DECORATOR_PREFIX + id);
	}

	/** Returns if an `object` is a Flamework Controller */
	export function isController(obj: object): boolean {
		return isDecoratorOf(Flamework.id<typeof Controller>(), obj);
	}

	/** Returns if an `object` is a Flamework service */
	export function isService(obj: object): boolean {
		return isDecoratorOf(Flamework.id<typeof Service>(), obj);
	}

	/**
	 * Gets a real dependency singletons based by filtering
	 * out certain objects from the filter function
	 */
	export function getDependencySingletons<T>(
		filterCallback: (ctor: Constructor<object>, dependency: unknown) => boolean,
	): Map<string, T> {
		const singletons = new Map<string, T>();
		for (const [id, ctor] of Reflect.idToObj) {
			// making sure it is a real singleton
			if (!isSingleton(ctor)) continue;

			// get a real dependency from hidden Flamework function
			const dependency = Flamework.resolveDependency(id);

			// use a filter function for something useful
			if (!filterCallback(ctor as Constructor<object>, dependency)) continue;
			singletons.set(id, dependency as T);
		}
		return singletons;
	}

	/**
	 * Returns if an `object` is a Flamework singleton
	 * (Service or Controller)
	 *
	 * Useful for shared Flamework modules
	 */
	export function isSingleton(obj: object): boolean {
		return isController(obj) || isService(obj);
	}

	/**
	 * Waits until a Flamework `component` exists on a given entity.
	 *
	 * @metadata macro */
	export async function waitForComponentOnInstance<T extends BaseComponent>(
		instance: Instance,
		specifier?: Modding.Generic<T, "id">,
	): Promise<T> {
		assert(specifier, "[waitForComponentOnInstance] Specifier is required");

		let component = Dependency<Components>().getComponent<T>(instance, specifier.id);

		if (component === undefined) {
			do {
				component = Dependency<Components>().getComponent<T>(instance, specifier.id);
				task.wait();
			} while (component === undefined);
		}

		return component;
	}
}
