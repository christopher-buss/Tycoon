import { FormatCompact } from "@rbxts/format-number";
import Roact from "@rbxts/roact";
import { App, IPassedProps } from "client/controllers/ui";
import { IClientStore } from "client/rodux/rodux";
import { Tag } from "types/enum/tags";

interface IStateProps extends IPassedProps {
	cash: string;
	rebirths: string;
}

@App({
	name: Tag.PlayerHead,
	tag: Tag.PlayerHead,
	useSurfaceGui: false,
	mapStateToProps: (state: IClientStore) => {
		return identity<IStateProps>({
			cash: "¥" + FormatCompact(state.playerData.cash),
			rebirths: state.playerData.rebirths + " rebirths",
		});
	},
})
class PlayerHead extends Roact.PureComponent<IStateProps> {
	public render() {
		return (
			<billboardgui
				Key={Tag.PlayerHead}
				Adornee={this.props.instance as BasePart}
				ExtentsOffsetWorldSpace={new Vector3(0, 0.75, 0)}
				LightInfluence={1}
				MaxDistance={75}
				ResetOnSpawn={true}
				Size={new UDim2(5, 0, 1.5, 0)}
				SizeOffset={new Vector2(0, 1)}
				StudsOffset={new Vector3(0, 0.5, 0)}
			>
				<textbox
					Key="Rebirths"
					AnchorPoint={new Vector2(0.5, 0)}
					BackgroundTransparency={1}
					Font={Enum.Font.Fondamento}
					PlaceholderColor3={Color3.fromRGB(255, 255, 255)}
					Position={new UDim2(0.5, 0, 0, 0)}
					Size={new UDim2(2, 0, 0.5, 0)}
					Text={this.props.rebirths}
					TextColor3={Color3.fromRGB(255, 0, 4)}
					TextScaled={true}
					TextSize={25}
					TextStrokeTransparency={0.3}
					TextWrapped={true}
					TextYAlignment={Enum.TextYAlignment.Bottom}
				/>

				<textbox
					Key="Cash"
					AnchorPoint={new Vector2(0.5, 0)}
					BackgroundTransparency={1}
					Font={Enum.Font.Fondamento}
					PlaceholderColor3={Color3.fromRGB(255, 255, 255)}
					Position={new UDim2(0.5, 0, 0.5, 0)}
					Size={new UDim2(2, 0, 0.5, 0)}
					Text={this.props.cash}
					TextColor3={Color3.fromRGB(255, 255, 255)}
					TextScaled={true}
					TextSize={25}
					TextStrokeTransparency={0.3}
					TextWrapped={true}
					TextYAlignment={Enum.TextYAlignment.Bottom}
				/>
			</billboardgui>
		);
	}
}

export = PlayerHead;
