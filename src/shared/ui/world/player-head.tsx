import { FormatCompact } from "@rbxts/format-number";
import Roact from "@rbxts/roact";
import { Players } from "@rbxts/services";
import { Tag } from "types/enum/tags";

export interface IPlayerHeadProps {
	Cash: string;
	Instance: Instance;
	Rebirths: string;
	Player: Player;
}

function PlayerHeadUi(props: IPlayerHeadProps): Roact.Element {
	const [cashBinding, cashSetBinding] = Roact.createBinding(props.Cash);
	const [rebirthsBinding, rebirthsSetBinding] = Roact.createBinding(props.Rebirths);

	props.Player.GetAttributeChangedSignal("Cash").Connect(() => {
		return cashSetBinding("$" + FormatCompact(props.Player.GetAttribute("Cash") as number, 2));
	});

	props.Player.GetAttributeChangedSignal("Rebirths").Connect(() => {
		return rebirthsSetBinding((props.Player.GetAttribute("Rebirths") as number) + " rebirths");
	});

	return (
		<billboardgui
			Key={Tag.PlayerHead}
			Adornee={props.Instance as BasePart}
			ExtentsOffsetWorldSpace={new Vector3(0, 0.75, 0)}
			LightInfluence={0}
			MaxDistance={75}
			ResetOnSpawn={true}
			Size={new UDim2(5, 0, 2.25, 0)}
			SizeOffset={new Vector2(0, 0.6)}
			StudsOffset={new Vector3(0, 0.5, 0)}
		>
			<textbox
				Key="Cash"
				AnchorPoint={new Vector2(0.5, 0)}
				BackgroundTransparency={1}
				Font={Enum.Font.FredokaOne}
				PlaceholderColor3={Color3.fromRGB(255, 255, 255)}
				Position={new UDim2(0.5, 0, 0, 0)}
				Size={new UDim2(1, 0, 0.33, 0)}
				Text={cashBinding}
				TextColor3={Color3.fromRGB(255, 255, 255)}
				TextScaled={true}
				TextSize={25}
				TextStrokeTransparency={0.3}
				TextWrapped={true}
				TextYAlignment={Enum.TextYAlignment.Bottom}
			/>
			<textbox
				Key="Rebirths"
				AnchorPoint={new Vector2(0.5, 0)}
				BackgroundTransparency={1}
				Font={Enum.Font.FredokaOne}
				PlaceholderColor3={Color3.fromRGB(255, 255, 255)}
				Position={new UDim2(0.5, 0, 0.33, 0)}
				Size={new UDim2(1, 0, 0.33, 0)}
				Text={rebirthsBinding}
				TextColor3={Color3.fromRGB(147, 152, 255)}
				TextScaled={true}
				TextSize={25}
				TextStrokeTransparency={0.3}
				TextWrapped={true}
				TextYAlignment={Enum.TextYAlignment.Bottom}
			/>

			<textbox
				Key="PlayerName"
				AnchorPoint={new Vector2(0.5, 0)}
				BackgroundTransparency={1}
				Font={Enum.Font.FredokaOne}
				PlaceholderColor3={Color3.fromRGB(255, 255, 255)}
				Position={new UDim2(0.5, 0, 0.66, 0)}
				Size={new UDim2(1, 0, 0.33, 0)}
				Text={props.Player === Players.LocalPlayer ? "" : props.Player.Name}
				TextColor3={props.Player.TeamColor.Color}
				TextScaled={true}
				TextSize={25}
				TextStrokeTransparency={0.3}
				TextWrapped={true}
				TextYAlignment={Enum.TextYAlignment.Bottom}
			/>
		</billboardgui>
	);
}

export { PlayerHeadUi };
