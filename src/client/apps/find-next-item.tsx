import Roact from "@rbxts/roact";

class FindNextItem extends Roact.PureComponent {
	public render(): Roact.Element {
		return (
			<frame
				Key="FindNextItemButton"
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(255, 255, 255)}
				BorderSizePixel={0}
				Position={new UDim2(0.5, 0, 0.859, 0)}
				Size={new UDim2(0.029, 0, 0.067, 0)}
				ZIndex={6}
			>
				<uicorner Key="1" CornerRadius={new UDim(1, 0)} />
				<imagebutton
					Key="Button"
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundTransparency={1}
					Image="rbxassetid://4509163032"
					ImageColor3={Color3.fromRGB(195, 40, 74)}
					Position={new UDim2(0.5, 0, 0.5, 0)}
					Size={new UDim2(0.8, 0, 0.8, 0)}
					ZIndex={3}
				/>
				<uigradient
					Key="4"
					Color={
						new ColorSequence([
							new ColorSequenceKeypoint(0, Color3.fromRGB(195, 40, 74)),
							new ColorSequenceKeypoint(1, Color3.fromRGB(209, 41, 81)),
						])
					}
				/>
				<uiaspectratioconstraint AspectRatio={0.993} />
				<uisizeconstraint MinSize={new Vector2(63, 63)} />
				<frame
					Key="2"
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundColor3={Color3.fromRGB(57, 57, 57)}
					BorderSizePixel={0}
					Position={new UDim2(0.5, 0, 0.5, 0)}
					Size={new UDim2(0.9, 0, 0.9, 0)}
					ZIndex={3}
				>
					<uicorner Key="1" CornerRadius={new UDim(1, 0)} />
				</frame>
			</frame>
		);
	}
}

export = FindNextItem;
