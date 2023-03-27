import Roact from "@rbxts/roact";
import { App } from "client/controllers/ui";

import { SideBarButton } from "./components/SideBarButton";

@App({
	name: "LeftBarApp",
	ignoreGuiInset: true,
	displayOnStart: true,
})
class LeftBarApp extends Roact.PureComponent<{}> {
	public render(): Roact.Element {
		return (
			<frame
				Key="LeftBar"
				AnchorPoint={new Vector2(0, 0.5)}
				BackgroundTransparency={1}
				Position={new UDim2(0, 0, 0.5, 0)}
				Size={new UDim2(0.145, 0, 0.4, 0)}
			>
				<uiaspectratioconstraint AspectRatio={0.507} />
				<SideBarButton
					Key="VIP"
					AnchorPoint={new Vector2(0.5, 0)}
					HoverImage="rbxassetid://12224739340"
					Image="rbxassetid://12224736308"
					Position={new UDim2(0.5, 0, 0, 0)}
				/>
				<SideBarButton
					Key="Codes"
					AnchorPoint={new Vector2(0.5, 1)}
					HoverImage="rbxassetid://12235064390"
					Image="rbxassetid://12235063199"
					Position={new UDim2(0.5, 0, 1, 0)}
				/>
			</frame>
		);
	}
}

export = LeftBarApp;
