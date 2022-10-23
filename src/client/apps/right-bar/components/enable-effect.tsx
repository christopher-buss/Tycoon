import Roact from "@rbxts/roact";
import Hooks from "@rbxts/roact-hooks";
import { IRightBarStateProps } from "../right-bar-app";

export interface EnableEffectButtonProps extends IRightBarStateProps {
	Color: Color3;
	Text: string;
	Effect: boolean;
	Position: UDim2;
	Event: {
		MouseButton1Down: () => void;
	};
}

const InnerEnableEffectButton: Hooks.FC<EnableEffectButtonProps> = (props, _hooks) => {
	return (
		<textbutton
			BackgroundColor3={Color3.fromRGB(40, 40, 40)}
			BorderSizePixel={0}
			Font={Enum.Font.Fondamento}
			LayoutOrder={1}
			Position={props.Position}
			Size={new UDim2(0.374, 0, 0.133, 0)}
			Text={props.Effect ? "Disable " + props.Text : "Enable " + props.Text}
			TextColor3={props.Color}
			TextScaled={true}
			TextSize={16}
			TextStrokeTransparency={0.75}
			TextWrapped={true}
			Event={props.Event}
		>
			<uicorner CornerRadius={new UDim(0.05, 8)} />
			<uisizeconstraint MinSize={new Vector2(50, 20)} />
			<uitextsizeconstraint MaxTextSize={75} />
		</textbutton>
	);
};

export const EnableEffectButton = new Hooks(Roact)(InnerEnableEffectButton, {
	componentType: "PureComponent",
});
