import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Janitor } from "@rbxts/janitor";
import { JellyfishService } from "server/services/jellyfish-service";
import { FlameworkUtil } from "shared/util/flamework-utils";
import { PlayerUtil } from "shared/util/player-util";
import { Tag } from "types/enum/tags";

import { IPetModel, Pet } from "./pet";

interface Attributes {}

interface IJellyfishModel extends Model {
	Pet: IPetModel;
	TouchPart: MeshPart;
}

@Component({
	tag: Tag.Jellyfish,
})
export class Jellyfish extends BaseComponent<Attributes, IJellyfishModel> implements OnStart {
	private readonly janitor: Janitor;

	private model!: Pet;
	private debounce: boolean;

	constructor(private readonly jellyfishService: JellyfishService) {
		super();
		this.janitor = new Janitor();
		this.janitor.LinkToInstance(this.instance, false);

		this.debounce = false;
	}

	public async onStart(): Promise<void> {
		await FlameworkUtil.waitForComponentOnInstance<Pet>(this.instance.Pet).andThen((pet) => {
			this.model = pet;
		});

		this.model.proximityPrompt.Destroy();

		this.instance.TouchPart.CanTouch = true;

		this.janitor.Add(
			this.instance.TouchPart.Touched.Connect((part) => {
				if (this.debounce) {
					return;
				}

				const player_opt = PlayerUtil.getPlayerFromDescendant(part);
				if (player_opt.isSome()) {
					this.onTouched(player_opt.unwrap());
				}
			}),
		);
	}

	private onTouched(player: Player): void {
		this.debounce = true;
		this.jellyfishService.collectJellyfish(player);

		this.model.petTheDamnDog();
		task.wait(3); // TODO: get the animation length somehow

		this.instance.Destroy();

		// this.destroy();
	}

	public destroy(): void {
		super.destroy();
		this.janitor.Destroy();
	}
}
