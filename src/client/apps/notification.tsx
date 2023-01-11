import Roact from "@rbxts/roact";
import { App, StoreDispatch } from "client/controllers/ui";
import { IClientStore } from "client/rodux/rodux";

interface IStateProps {
	message: string;
	showNotification: boolean;
}

interface IDispatchProps {
	onCloseButtonSelected: () => void;
}

interface IProps extends IStateProps, IDispatchProps {}

@App({
	name: "Notification",
	displayOnStart: true,
	mapStateToProps: (state: IClientStore) => {
		return identity<IStateProps>({
			message: state.notificationData.message,
			showNotification: state.notificationData.showNotification,
		});
	},
	mapDispatchToProps: (dispatch: StoreDispatch) => {
		return identity<IDispatchProps>({
			onCloseButtonSelected: () => {
				dispatch({ type: "ShowNotificationWindow", showNotification: false });
			},
		});
	},
})
class Notification extends Roact.PureComponent<IProps> {
	public render(): Roact.Element {
		return (
			<frame
				Key="NotificationProvider"
				BackgroundTransparency={1}
				Size={new UDim2(1, 0, 1, 0)}
				ZIndex={2}
				Visible={this.props.showNotification}
			>
				<frame
					Key="Notification"
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundTransparency={1}
					Position={new UDim2(0.5, 0, 0.5, 0)}
					Size={new UDim2(0.32, 0, 0.32, 0)}
				>
					<uisizeconstraint MinSize={new Vector2(320, 240)} />
					<frame
						AnchorPoint={new Vector2(0.5, 0.5)}
						BackgroundColor3={Color3.fromRGB(50, 50, 44)}
						BackgroundTransparency={0.7}
						BorderSizePixel={0}
						Position={new UDim2(0.5, 0, 0.5, 0)}
						Rotation={-5}
						Size={new UDim2(0.8, 0, 0.8, 0)}
						ZIndex={2}
					>
						<uicorner CornerRadius={new UDim(0.05, 0)} />
						<frame
							AnchorPoint={new Vector2(0.5, 0.5)}
							BackgroundColor3={Color3.fromRGB(209, 110, 23)}
							BorderSizePixel={0}
							Position={new UDim2(0.5, -3, 0.5, -2)}
							Size={new UDim2(1, 0, 1, 0)}
						>
							<uicorner CornerRadius={new UDim(0.05, 0)} />
						</frame>
					</frame>
					<frame
						AnchorPoint={new Vector2(0.5, 0.5)}
						BackgroundColor3={Color3.fromRGB(50, 50, 44)}
						BackgroundTransparency={0.7}
						BorderSizePixel={0}
						Position={new UDim2(0.5, 0, 0.5, 0)}
						Size={new UDim2(0.8, 0, 0.8, 0)}
						ZIndex={2}
					>
						<uicorner CornerRadius={new UDim(0.05, 0)} />
						<textbutton
							AnchorPoint={new Vector2(0.5, 0.5)}
							AutoButtonColor={false}
							BackgroundColor3={Color3.fromRGB(193, 110, 112)}
							BorderSizePixel={0}
							Font={Enum.Font.SourceSans}
							Position={new UDim2(0.5, -3, 0.5, -2)}
							Selectable={false}
							Size={new UDim2(1, 0, 1, 0)}
							Text={""}
							TextColor3={Color3.fromRGB(0, 0, 0)}
							TextScaled={true}
							TextSize={14}
							TextWrapped={true}
							Event={{
								Activated: () => this.props.onCloseButtonSelected(),
							}}
						>
							<uicorner CornerRadius={new UDim(0.05, 0)} />
							<textlabel
								Key="DropShadow"
								AnchorPoint={new Vector2(0.5, 0.5)}
								BackgroundTransparency={1}
								Font={Enum.Font.FredokaOne}
								Position={new UDim2(0.5, 0, 0.5, 0)}
								Size={new UDim2(0.8, 0, 0.8, 0)}
								Text={this.props.message}
								TextColor3={Color3.fromRGB(50, 50, 44)}
								TextScaled={true}
								TextSize={14}
								TextStrokeTransparency={10}
								TextWrapped={true}
							>
								<textlabel
									Key="MainLabel"
									BackgroundTransparency={1}
									Font={Enum.Font.FredokaOne}
									Position={new UDim2(0, -2, 0, -3)}
									Size={new UDim2(1, 0, 1, 0)}
									Text={this.props.message}
									TextColor3={Color3.fromRGB(255, 255, 240)}
									TextScaled={true}
									TextSize={14}
									TextStrokeTransparency={10}
									TextWrapped={true}
									ZIndex={0}
								>
									<uitextsizeconstraint MinTextSize={8} />
								</textlabel>
								<uitextsizeconstraint MinTextSize={8} />
							</textlabel>
						</textbutton>
						<textbutton
							AutoButtonColor={false}
							BackgroundTransparency={1}
							Font={Enum.Font.FredokaOne}
							Position={new UDim2(0.908, 0, 0.01, 0)}
							Size={new UDim2(0.08, 0, 0.14, 0)}
							Text="X"
							TextColor3={Color3.fromRGB(0, 0, 0)}
							TextScaled={true}
							TextSize={14}
							TextTransparency={0.7}
							TextWrapped={true}
							Event={{
								Activated: () => this.props.onCloseButtonSelected(),
							}}
						>
							<uicorner CornerRadius={new UDim(1, 0)} />
						</textbutton>
					</frame>
					<uiaspectratioconstraint AspectRatio={1.778} />
				</frame>
			</frame>
		);
	}
}

export = Notification;
