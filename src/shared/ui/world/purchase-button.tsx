import { Janitor } from "@rbxts/janitor";
import Roact from "@rbxts/roact";
import { lerpNumber } from "shared/util/math-util";

export interface IProps {
	Adornee: BasePart;
	DisplayName?: string;
	Price?: number;
	Janitor: Janitor;
}

function ButtonBillboard({ Adornee, DisplayName, Price, Janitor }: IProps): Roact.Element {
	const [binding, setBinding] = Roact.createBinding<number>(Adornee.Transparency);

	Janitor.Add(
		Adornee.GetPropertyChangedSignal("Transparency").Connect(() => {
			return setBinding(Adornee.Transparency);
		}),
	);

	return (
		<billboardgui
			AlwaysOnTop={true}
			Adornee={Adornee}
			LightInfluence={0}
			MaxDistance={40}
			Size={UDim2.fromScale(8, 2)}
			StudsOffset={new Vector3(0, 2, 0)}
			ResetOnSpawn={false}
		>
			<textlabel
				BackgroundTransparency={1}
				Key="Title"
				Size={UDim2.fromScale(1, 0.5)}
				Font={Enum.Font.SourceSansBold}
				TextScaled={true}
				TextStrokeTransparency={binding.map((v) => lerpNumber(0.7, 1, v))}
				Text={DisplayName}
				TextColor3={new Color3(1, 1, 1)}
				TextTransparency={binding}
			/>
			<textlabel
				AnchorPoint={new Vector2(0.5, 0)}
				BackgroundColor3={new Color3(1, 1, 1)}
				BackgroundTransparency={binding}
				Key="Price"
				Position={UDim2.fromScale(0.5, 0.6)}
				Size={UDim2.fromScale(0.5, 0.4)}
				Text={`$${Price}`}
				TextTransparency={binding}
				Font={Enum.Font.GothamBlack}
				TextColor3={Color3.fromRGB(126, 126, 126)}
				TextScaled={true}
			>
				<uicorner />
			</textlabel>
		</billboardgui>
	);
}

export default ButtonBillboard;
