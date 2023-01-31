import Roact from "@rbxts/roact";
import { Players } from "@rbxts/services";
import { Tag } from "types/enum/tags";

export interface IRebithButtonProps {
	ButtonsOwned: number;
	ButtonsToBuy: number;
	Instance: Instance;
	// Rebirths: string;
}

function RebirthButtonBillboard(props: IRebithButtonProps): Roact.Element {
	const [buttonsOwnedBinding, buttonsOwnedSetBinding] = Roact.createBinding(props.ButtonsOwned);
	const [buttonsToBuyBinding, buttonsToBuySetBinding] = Roact.createBinding(props.ButtonsToBuy);

	Players.LocalPlayer.GetAttributeChangedSignal("ButtonsOwned").Connect(() => {
		buttonsOwnedSetBinding(Players.LocalPlayer.GetAttribute("ButtonsOwned") as number);
	});

	Players.LocalPlayer.GetAttributeChangedSignal("ButtonsToBuy").Connect(() => {
		buttonsToBuySetBinding(Players.LocalPlayer.GetAttribute("ButtonsToBuy") as number);
	});

	const text = Roact.joinBindings([buttonsOwnedBinding, buttonsToBuyBinding]).map((joint) => {
		return `${joint[0] ?? 0} / ${joint[1]} Owned`;
	});

	return (
		<billboardgui
			Active={true}
			Adornee={props.Instance as BasePart}
			Key={Tag.RebirthButton}
			AlwaysOnTop={true}
			ClipsDescendants={true}
			LightInfluence={1}
			MaxDistance={170}
			ResetOnSpawn={false}
			Size={new UDim2(15, 0, 8, 0)}
			ZIndexBehavior={Enum.ZIndexBehavior.Sibling}
		>
			<textlabel
				BackgroundTransparency={1}
				Font={Enum.Font.GothamBold}
				Position={new UDim2(0, -1, 0, -2)}
				Size={new UDim2(1, 0, 0.5, 0)}
				Text="Rebirth"
				TextColor3={Color3.fromRGB(255, 255, 255)}
				TextScaled={true}
				TextSize={20}
				TextStrokeColor3={Color3.fromRGB(135, 135, 135)}
				TextStrokeTransparency={0}
				TextWrapped={true}
			/>
			<textlabel
				AnchorPoint={new Vector2(0.5, 0)}
				BackgroundTransparency={1}
				Font={Enum.Font.GothamBold}
				Position={new UDim2(0.5, 0, 0.6, 0)}
				Size={new UDim2(1, 0, 0.5, 0)}
				Text={text}
				TextColor3={Color3.fromRGB(255, 193, 6)}
				TextScaled={true}
				TextSize={30}
				TextStrokeColor3={Color3.fromRGB(135, 135, 135)}
				TextStrokeTransparency={0}
				TextWrapped={true}
			/>
		</billboardgui>
	);
}

export { RebirthButtonBillboard };
