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
			setBinding(Adornee.Transparency);
		}),
	);

	return (
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
				Text={timer.map(convertToTime)}
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
					Text={timer.map(convertToTime)}
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

export default TimerButtonBillboard;
