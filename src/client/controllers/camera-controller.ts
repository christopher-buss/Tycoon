import { Controller, OnInit } from "@flamework/core";
import { Workspace } from "@rbxts/services";
import { Events } from "client/network";

@Controller({})
export class CameraController implements OnInit {
	public onInit(): void {
		Events.playerTeleported.connect((orientation) => {
			this.positionCamera(orientation);
		});
	}

	public positionCamera(orientation: Vector3): void {
		const camera = Workspace.CurrentCamera;
		if (!camera) {
			return;
		}

		camera.CFrame = CFrame.Angles(orientation.X, orientation.Y, orientation.Z);
	}
}
