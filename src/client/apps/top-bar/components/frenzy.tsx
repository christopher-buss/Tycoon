import Roact from "@rbxts/roact";
import Hooks from "@rbxts/roact-hooks";
import { TimeUtil } from "shared/util/time-util";

// class Frenzy extends Roact.PureComponent {
// 	public render(): Roact.Element {
// 		return <frame Key="Frenzy" />;
// 	}
// }

interface IFrenzyProps {
	frenzyTimeLeft: number;
}

const InnerFrenzy: Hooks.FC<IFrenzyProps> = (props) => {
	// const [binding, setBinding] = Roact.createBinding<Color3>(new Color3());

	const [transparency, setTransparency] = Roact.createBinding<number>(0);

	if (props.frenzyTimeLeft <= 0) {
		setTransparency(1);
	} else {
		setTransparency(0);
	}

	// task.spawn(() => {
	// 	print("FRENZY: Spawned");
	// 	while (true) {
	// 		if (props.frenzyTimeLeft <= 0) {
	// 			setTransparency(1);
	// 			task.wait();
	// 			return;
	// 		}

	// 		if (transparency.getValue() === 1) {
	// 			setTransparency(0);
	// 		}

	// 		for (const i of $range(0, 1, 0.003)) {
	// 			// for (let i = 0; i < 1; i += 0.001 * this.attributes.Speed) {
	// 			print(i);
	// 			setBinding(Color3.fromHSV(i, 1, 1));
	// 			task.wait();
	// 		}
	// 	}
	// });

	return (
		<textlabel
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundTransparency={1}
			Font={Enum.Font.LuckiestGuy}
			Position={new UDim2(0.498, 0, 0.393, 0)}
			Size={new UDim2(1.004, 0, 0.145, 0)}
			Text={`FRENZY: ${TimeUtil.convertToTime(props.frenzyTimeLeft)}`}
			TextColor3={Color3.fromRGB(245, 75, 75)}
			TextScaled={true}
			TextSize={14}
			TextTransparency={transparency}
			TextStrokeTransparency={transparency}
			TextWrapped={true}
		/>
	);
};

export const Frenzy = new Hooks(Roact)(InnerFrenzy, {
	componentType: "PureComponent",
});
