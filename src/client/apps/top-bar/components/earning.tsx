import Roact from "@rbxts/roact";
import { App, IPassedProps } from "client/controllers/ui";
import { IClientStore } from "client/rodux/rodux";

interface IStateProps extends IPassedProps {
	multiplier: number;
}

@App({
	name: "Earning",
	displayOnStart: true,
	mapStateToProps: (state: IClientStore) => {
		return identity<IStateProps>({
			multiplier: (1 + state.playerData.rebirths / 5) * (state.playerData.gamePasses.doubleMoneyGamepass ? 2 : 1),
		});
	},
})
class EarningsBar extends Roact.PureComponent<IStateProps> {
	public render(): Roact.Element {
		return (
			<frame
				Key="Earning"
				BackgroundTransparency={1}
				Position={new UDim2(0, 10, 0.9450000000000001, -10)}
				Size={new UDim2(0.15, 0, 0.055, 0)}
			>
				<textbutton
					Key="Multiplier"
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundTransparency={1}
					Font={Enum.Font.Fondamento}
					Position={new UDim2(0.5, 0, 0.5, 0)}
					Size={new UDim2(1, 0, 1, 0)}
					Text={"EARNING " + this.props.multiplier + "X"}
					TextColor3={Color3.fromRGB(103, 33, 255)}
					TextScaled={true}
					TextSize={14}
					TextWrapped={true}
					TextXAlignment={Enum.TextXAlignment.Left}
					TextYAlignment={Enum.TextYAlignment.Bottom}
				/>
			</frame>
		);
	}
}

export = EarningsBar;
