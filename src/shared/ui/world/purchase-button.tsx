import { Janitor } from "@rbxts/janitor";
import Roact from "@rbxts/roact";
import { lerpNumber } from "shared/util/math-util";

export interface IProps {
	Adornee: BasePart;
	Color: Color3;
	DisplayName?: string;
	Janitor: Janitor;
	Price?: string;
}

function ButtonBillboard({ Adornee, DisplayName, Color, Price, Janitor }: IProps): Roact.Element {
	const [binding, setBinding] = Roact.createBinding<number>(Adornee.Transparency);

	Janitor.Add(
		Adornee.GetPropertyChangedSignal("Transparency").Connect(() => {
			return setBinding(Adornee.Transparency);
		}),
	);

	return (
		// <billboardgui
		// 	AlwaysOnTop={false}
		// 	Adornee={Adornee}
		// 	LightInfluence={0}
		// 	MaxDistance={95}
		// 	Size={UDim2.fromScale(8, 2)}
		// 	StudsOffset={new Vector3(0, 2, 0)}
		// 	ResetOnSpawn={false}
		// >
		// 	<textlabel
		// 		BackgroundTransparency={1}
		// 		Key="Title"
		// 		Size={UDim2.fromScale(1, 0.5)}
		// 		Font={Enum.Font.SourceSansBold}
		// 		TextScaled={true}
		// 		TextStrokeTransparency={binding.map((v) => lerpNumber(0.7, 1, v))}
		// 		Text={DisplayName}
		// 		TextColor3={new Color3(1, 1, 1)}
		// 		TextTransparency={binding}
		// 	/>
		// 	<textlabel
		// 		AnchorPoint={new Vector2(0.5, 0)}
		// 		BackgroundColor3={new Color3(1, 1, 1)}
		// 		BackgroundTransparency={binding}
		// 		Key="Price"
		// 		Position={UDim2.fromScale(0.5, 0.6)}
		// 		Size={UDim2.fromScale(0.5, 0.4)}
		// 		Text={`${Price}`}
		// 		TextTransparency={binding}
		// 		Font={Enum.Font.GothamBlack}
		// 		TextColor3={Color}
		// 		TextScaled={true}
		// 	>
		// 		<uicorner />
		// 	</textlabel>
		// </billboardgui>#

		<billboardgui
			Adornee={Adornee}
			MaxDistance={95}
			ResetOnSpawn={false}
			Size={new UDim2(8, 0, 2, 0)}
			StudsOffset={new Vector3(0, 2, 0)}
		>
			<textlabel
				BackgroundTransparency={1}
				Font={Enum.Font.SourceSansBold}
				Size={new UDim2(1, 0, 0.5, 0)}
				Text={DisplayName}
				TextColor3={Color3.fromRGB(0, 0, 0)}
				TextTransparency={binding}
				TextScaled={true}
				TextWrapped={true}
			>
				<textlabel
					BackgroundTransparency={1}
					Font={Enum.Font.SourceSansBold}
					Position={new UDim2(0, -1, 0, -2)}
					Size={new UDim2(1, 0, 1, 0)}
					Text={DisplayName}
					TextColor3={Color3.fromRGB(255, 255, 255)}
					TextScaled={true}
					TextStrokeTransparency={binding.map((v) => lerpNumber(0.9, 1, v))}
					TextTransparency={binding}
					TextWrapped={true}
				/>
				<uitextsizeconstraint />
			</textlabel>
			<textlabel
				AnchorPoint={new Vector2(0.5, 0)}
				BackgroundColor3={Color3.fromRGB(255, 255, 255)}
				BackgroundTransparency={binding}
				Font={Enum.Font.GothamBlack}
				Position={new UDim2(0.5, 0, 0.6, 0)}
				Size={new UDim2(0.5, 0, 0.4, 0)}
				Text={`${Price}`}
				TextColor3={Color3.fromRGB(12, 3, 3)}
				TextTransparency={binding}
				TextScaled={true}
				TextWrapped={true}
			>
				<uicorner />
				<textlabel
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundTransparency={1}
					Font={Enum.Font.GothamBlack}
					Position={new UDim2(0.5, -1, 0.5, -2)}
					Size={new UDim2(1, 0, 1, 0)}
					Text={`${Price}`}
					TextColor3={Color}
					// TextColor3={Color3.fromRGB(203, 46, 46)}
					TextScaled={true}
					TextStrokeTransparency={binding.map((v) => lerpNumber(0.8, 1, v))}
					TextTransparency={binding}
					TextWrapped={true}
				/>
			</textlabel>
		</billboardgui>
	);
}

export default ButtonBillboard;
