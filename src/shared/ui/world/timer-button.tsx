import { Janitor } from "@rbxts/janitor";
import Roact from "@rbxts/roact";
import { lerpNumber } from "shared/util/math-util";

export interface IProps {
	Adornee: BasePart;
	Color: Color3;
	DisplayName?: string;
	Janitor: Janitor;
	Timer: number;
}

function convertToTime(seconds: number): string {
	const minutes = math.floor(seconds / 60);
	const second = seconds - minutes * 60;
	return `${string.format("%02i", minutes)}:${string.format("%02i", second)}`;
}

function TimerButtonBillboard({ Adornee, DisplayName, Color, Timer, Janitor }: IProps): Roact.Element {
	const [binding, setBinding] = Roact.createBinding<number>(Adornee.Transparency);

	const [timer, setTimer] = Roact.createBinding<number>(Timer);

	Adornee.Parent?.GetAttributeChangedSignal("Time").Connect(() => {
		const time = Adornee.Parent?.GetAttribute("Time") as number;
		if (time === 0) {
			setTimer(5);
		}

		setTimer(time);
	});

	Janitor.Add(
		Adornee.GetPropertyChangedSignal("Transparency").Connect(() => {
			return setBinding(Adornee.Transparency);
		}),
	);

	return (
		<billboardgui
			AlwaysOnTop={false}
			Adornee={Adornee}
			LightInfluence={0}
			MaxDistance={95}
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
				Text={timer.map(convertToTime)}
				TextTransparency={binding}
				Font={Enum.Font.GothamBlack}
				TextColor3={Color}
				TextScaled={true}
			>
				<uicorner />
			</textlabel>
		</billboardgui>
	);
}

export default TimerButtonBillboard;
