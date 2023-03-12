import Roact from "@rbxts/roact";
import Hooks from "@rbxts/roact-hooks";
import { easings, useSpring } from "@rbxts/roact-spring";
import { RunService } from "@rbxts/services";
import Oklab from "shared/modules/oklab";
import { TimeUtil } from "shared/util/time-util";

interface IFrenzyProps {
	frenzyTimeLeft: number;
}

const InnerFrenzy: Hooks.FC<IFrenzyProps> = (props, hooks) => {
	const [transparency, setTransparency] = hooks.useBinding<number>(0);
	const [countdown, setCountdown] = hooks.useBinding(0);

	setTransparency(0);

	const styles = useSpring(hooks, {
		reset: true,
		from: { alpha: 0 },
		to: { alpha: 1 },
		loop: () => {
			return countdown.getValue() > 0;
		},
		config: {
			duration: 5,
			clamp: true,
			easing: easings.linear,
		},
	});

	hooks.useEffect(() => {
		const startedAt = os.clock() + props.frenzyTimeLeft;
		const connection = RunService.Heartbeat.Connect(() => {
			const timeLeft = startedAt - os.clock();
			if (timeLeft > 0) {
				setCountdown(timeLeft);
				return;
			}

			setCountdown(0);
			setTransparency(1);
			connection.Disconnect();
		});

		return () => connection.Disconnect();
	}, [props.frenzyTimeLeft]);

	return (
		<textlabel
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundTransparency={1}
			Font={Enum.Font.LuckiestGuy}
			Position={new UDim2(0.498, 0, 0.393, 0)}
			Size={new UDim2(1.004, 0, 0.145, 0)}
			Text={countdown.map((value) => {
				return `FRENZY: ${TimeUtil.convertToTime(value)}`;
			})}
			TextColor3={styles.alpha.map((alpha) => Oklab.from(Oklab.to(Color3.fromHSV(alpha, 0.1, 1)), false))}
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
