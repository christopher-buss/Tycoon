import { Controller, OnInit } from "@flamework/core";
import { animateModelIn } from "client/util/tween-purchase";
import getObject from "shared/util/instance-util";

@Controller({})
export class AnimationController implements OnInit {
	public onInit(): void {
		// Events.playerBoughtObject.connect((objectLocation) => this.onPlayerBoughtObject(objectLocation));
	}

	private onPlayerBoughtObject(objectLocation: string): void {
		const boughtObject = getObject(objectLocation) as Model;
		print(boughtObject);
		animateModelIn(boughtObject, new TweenInfo(1, Enum.EasingStyle.Elastic, Enum.EasingDirection.Out));
	}
}
