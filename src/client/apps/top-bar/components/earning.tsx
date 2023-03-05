import Roact from "@rbxts/roact";
import Hooks from "@rbxts/roact-hooks";
import { IPassedProps } from "client/controllers/ui";

interface IStateProps extends IPassedProps {
	multiplier: number;
}

const InnerEarningsBar: Hooks.FC<IStateProps> = (props) => {
	return (
		<textlabel
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundTransparency={1}
			Font={Enum.Font.FredokaOne}
			Position={new UDim2(0.498, 0, 0.17300000000000001, 0)}
			Size={new UDim2(1.0030000000000001, 0, 0.215, 0)}
			Text={`Multiplier: ${props.multiplier}x`}
			TextColor3={Color3.fromRGB(23, 245, 238)}
			TextScaled={true}
			TextSize={14}
			TextStrokeColor3={Color3.fromRGB(16, 167, 159)}
			TextStrokeTransparency={0}
			TextWrapped={true}
		/>

		// 	<textbutton
		// 		Key="Multiplier"
		// 		AnchorPoint={new Vector2(0.5, 0.5)}
		// 		BackgroundTransparency={1}
		// 		Font={Enum.Font.Fondamento}
		// 		Position={new UDim2(0.5, 0, 0.5, 0)}
		// 		Size={new UDim2(1, 0, 1, 0)}
		// 		Text={"EARNING " + this.props.multiplier + "X"}
		// 		TextColor3={Color3.fromRGB(103, 33, 255)}
		// 		TextScaled={true}
		// 		TextSize={14}
		// 		TextWrapped={true}
		// 		TextXAlignment={Enum.TextXAlignment.Left}
		// 		TextYAlignment={Enum.TextYAlignment.Bottom}
		// 	/>
		// </frame>
	);
};

export const EarningsBar = new Hooks(Roact)(InnerEarningsBar, {
	componentType: "PureComponent",
});
