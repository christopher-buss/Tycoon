import Roact from "@rbxts/roact";
import { App } from "client/controllers/ui";
import { IClientStore } from "client/rodux/rodux";
import { calculateMultiplier } from "shared/functions/calculate-multiplier";

import { EarningsBar } from "./components/earning";
import { Frenzy } from "./components/frenzy";

interface ITopbarProps {
	frenzyTimeLeft: number;
	multiplier: number;
}

@App({
	name: "TopbarApp",
	ignoreGuiInset: true,
	displayOnStart: true,
	mapStateToProps: (state: IClientStore) => {
		return identity<ITopbarProps>({
			frenzyTimeLeft: state.playerData.frenzyTimeLeft,
			multiplier: calculateMultiplier(state.playerData),
		});
	},
})
class TopbarApp extends Roact.PureComponent<ITopbarProps> {
	public render(): Roact.Element {
		return (
			<frame
				BackgroundColor3={Color3.fromRGB(255, 255, 255)}
				BackgroundTransparency={1}
				BorderSizePixel={0}
				Position={new UDim2(0.425, 0, 0.023, 0)}
				Size={new UDim2(0.15, 0, 0.272, 0)}
				SizeConstraint={Enum.SizeConstraint.RelativeXX}
			>
				<uiaspectratioconstraint AspectRatio={1.347} />
				<Frenzy frenzyTimeLeft={this.props.frenzyTimeLeft} />
				<EarningsBar multiplier={this.props.multiplier} />
			</frame>
		);
	}
}

export = TopbarApp;
