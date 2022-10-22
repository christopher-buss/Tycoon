import { FormatCompact } from "@rbxts/format-number";
import Roact from "@rbxts/roact";
import { App, IPassedProps } from "client/controllers/ui";
import { IClientStore } from "client/rodux/rodux";
import { BASE_REBIRTH_PRICE, REBIRTH_ADDITIONAL_PRICE } from "shared/shared-constants";
import { Tag } from "types/enum/tags";

interface IStateProps extends IPassedProps {
	rebirths: string;
}

@App({
	name: Tag.RebirthButton,
	tag: Tag.RebirthButton,
	useSurfaceGui: false,
	mapStateToProps: (state: IClientStore) => {
		return identity<IStateProps>({
			rebirths: FormatCompact(BASE_REBIRTH_PRICE + state.playerData.rebirths * REBIRTH_ADDITIONAL_PRICE),
		});
	},
})
class RebirthButton extends Roact.PureComponent<IStateProps> {
	public render() {
		return (
			<billboardgui
				MaxDistance={125}
				Size={new UDim2(10, 0, 2, 0)}
				Adornee={this.props.instance?.WaitForChild("Board") as BasePart}
			>
				<textlabel
					Key="Contents"
					BackgroundTransparency={1}
					Font={Enum.Font.Fondamento}
					Position={new UDim2(0, 0, -0.5, 0)}
					Size={new UDim2(1, 0, 1, 0)}
					Text="Rebirth"
					TextColor3={Color3.fromRGB(255, 188, 235)}
					TextScaled={true}
					TextSize={50}
					TextStrokeTransparency={0}
					TextWrapped={true}
				/>
				<textlabel
					Key="Cost"
					BackgroundTransparency={1}
					Font={Enum.Font.Fondamento}
					Position={new UDim2(0, 0, 0.3, 0)}
					Size={new UDim2(1, 0, 0.7, 0)}
					Text={this.props.rebirths}
					TextColor3={Color3.fromRGB(255, 188, 235)}
					TextScaled={true}
					TextSize={50}
					TextStrokeTransparency={0}
					TextWrapped={true}
				/>
			</billboardgui>
		);
	}
}

export = RebirthButton;
