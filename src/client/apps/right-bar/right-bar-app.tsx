import Roact from "@rbxts/roact";
import { MarketplaceService, Players } from "@rbxts/services";
import { App } from "client/controllers/ui";
import { Events } from "client/network";
import { IClientStore } from "client/rodux/rodux";
import { EnableEffectButton, EnableEffectButtonProps } from "./components/enable-effect";

export interface IRightBarStateProps {
	OwnsSparkles?: boolean;
	OwnsFire?: boolean;
	SparklesActivated?: boolean;
	FireActivated?: boolean;
}

@App({
	name: "right-bar",
	displayOnStart: true,
	mapStateToProps: (state: IClientStore) => {
		return identity<IRightBarStateProps>({
			OwnsSparkles: state.playerData.gamePasses.sparkleEffectGamepass,
			OwnsFire: state.playerData.gamePasses.fireEffectGamepass,
			SparklesActivated: state.playerData.effectsActivated.sparkle,
			FireActivated: state.playerData.effectsActivated.fire,
		});
	},
})
export class RightBarApp extends Roact.PureComponent<EnableEffectButtonProps> {
	public render() {
		return (
			<frame
				Key="RightBar"
				AnchorPoint={new Vector2(1, 0.5)}
				BackgroundTransparency={1}
				Position={new UDim2(0.972, 0, 0.45, 0)}
				Size={new UDim2(0.18, 0, 0.215, 0)}
			>
				<uiaspectratioconstraint AspectRatio={1.079} />
				<uisizeconstraint MinSize={new Vector2(400, 125)} />
				<EnableEffectButton
					Key={"SparklesButton"}
					Effect={this.props.SparklesActivated!}
					Position={new UDim2(0.096, 0, 0.686, 0)}
					Text={"Sparkles"}
					Color={Color3.fromRGB(248, 163, 59)}
					Event={{
						MouseButton1Down: () => {
							if (this.props.OwnsSparkles && this.props.SparklesActivated) {
								Events.modifyEffect(false, "sparkleEffectGamepass");
							} else if (this.props.OwnsSparkles && !this.props.SparklesActivated) {
								print("SPARKLES ACTIVATED");
								Events.modifyEffect(true, "sparkleEffectGamepass");
							} else {
								MarketplaceService.PromptGamePassPurchase(Players.LocalPlayer, 71225919);
							}
						},
					}}
				/>

				<EnableEffectButton
					Key={"FireButton"}
					Effect={this.props.FireActivated!}
					Position={new UDim2(0.514, 0, 0.686, 0)}
					Text={"Fire"}
					Color={Color3.fromRGB(217, 142, 248)}
					Event={{
						MouseButton1Down: () => {
							if (this.props.OwnsFire && this.props.FireActivated) {
								Events.modifyEffect(false, "fireEffectGamepass");
							} else if (this.props.OwnsFire && !this.props.FireActivated) {
								Events.modifyEffect(true, "fireEffectGamepass");
							} else {
								MarketplaceService.PromptGamePassPurchase(Players.LocalPlayer, 71225950);
							}
						},
					}}
				/>
			</frame>
		);
	}
}
