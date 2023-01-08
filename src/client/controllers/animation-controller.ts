import { Controller, OnInit } from "@flamework/core";
import { CollectionService } from "@rbxts/services";
import { Events } from "client/network";
import { animateModelIn } from "client/util/tween-purchase";
import getObject from "shared/util/instance-util";

@Controller({})
export class AnimationController implements OnInit {
	public onInit(): void {
		Events.animateItem.connect((numberOfDescendants, objectLocation) => {
			this.onPlayerBoughtObject(numberOfDescendants, objectLocation);
		});
	}

	private onPlayerBoughtObject(numberOfDescendants: number, objectLocation: string): void {
		const boughtObject = getObject(objectLocation) as Model;
		if (!boughtObject) {
			return;
		}

		if (CollectionService.HasTag(boughtObject, "Friend")) {
			return;
		}

		let loadedDescendants = boughtObject.GetDescendants().size();
		const connection = boughtObject.DescendantAdded.Connect(() => {
			loadedDescendants += 1;
			if (loadedDescendants === numberOfDescendants) {
				connection.Disconnect();
				animateModelIn(
					boughtObject,
					new TweenInfo(0.5, Enum.EasingStyle.Linear, Enum.EasingDirection.Out),
				).catch((err) => {
					warn(err);
				});
			}
		});

		// while (boughtObject.GetDescendants().size() < numberOfDescendants) {
		// 	task.wait();
		// }

		// animateModelIn(boughtObject, new TweenInfo(0.5, Enum.EasingStyle.Linear, Enum.EasingDirection.Out)).catch(
		// 	(err) => {
		// 		warn(err);
		// 	},
		// );
	}
}
