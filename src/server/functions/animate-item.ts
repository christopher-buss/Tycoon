import { Dependency } from "@flamework/core";
import { Events } from "server/network";
import { DropperService } from "server/services/tycoon/dropper-service";

export namespace AnimationUtil {
	export function animateItem(lotOwner: string, object: Instance): void {
		const players: Array<Player> = [];
		for (const [player, lotName] of Dependency<DropperService>().lotToReplicateTo) {
			if (lotName === lotOwner) {
				players.push(player);
			}
		}

		const location = "workspace.Lots." + lotOwner + ".Objects." + object.Name;
		Events.animateItem.fire(players, object.GetDescendants().size(), location);
	}
}
