import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Logger } from "@rbxts/log";
import { Option } from "@rbxts/rust-classes";
import { HttpService, Players } from "@rbxts/services";
import { ILotAttributes, ILotModel } from "types/interfaces/lots";

@Component({ tag: "Lot" })
export class Lot extends BaseComponent<ILotAttributes, ILotModel> implements OnStart {
	public constructor(private readonly logger: Logger) {
		super();
	}

	/** @hidden */
	public onStart() {
		this.attributes.ComponentId = HttpService.GenerateGUID(false);
	}

	/**
	 * Get the current owner of the lot.
	 *
	 * @returns Player instance if there is an owner.
	 */
	public getOwner(): Option<Player> {
		return Option.wrap<Player>(Players.GetPlayerByUserId(this.attributes.Owner ?? -math.huge));
	}
}
