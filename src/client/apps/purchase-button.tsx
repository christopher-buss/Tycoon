import Roact from "@rbxts/roact";
import { IPassedProps } from "client/controllers/ui";

interface IStateProps extends IPassedProps {}

interface IState {
	binding: Roact.Binding<number>;
	head: BasePart;
}

class PurchaseButton extends Roact.PureComponent<IStateProps, IState> {
	constructor(props: IStateProps) {
		super(props);

		const head = props.instance!.FindFirstChild("Head") as Part;
		if (head) {
			const [binding, setBinding] = Roact.createBinding<number>(head.Transparency);
			print("Head: set state");
			this.setState({
				binding: binding,
				head: head,
			});

			head.GetPropertyChangedSignal("Transparency").Connect(() => {
				return setBinding(head.Transparency as number);
			});
		}
	}

	public render() {
		return (
			<billboardgui
				AlwaysOnTop={true}
				Adornee={this.state.head}
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
					// TextStrokeTransparency={this.state.binding.map((v) => lerpNumber(0.7, 1, v))}
					// Text={this.props.instance!.GetAttribute("DisplayName") as string}
					TextColor3={new Color3(1, 1, 1)}
					// TextTransparency={this.state.binding}
				/>
				<textlabel
					AnchorPoint={new Vector2(0.5, 0)}
					BackgroundColor3={new Color3(1, 1, 1)}
					// BackgroundTransparency={this.state.binding}
					Key="Price"
					Position={UDim2.fromScale(0.5, 0.6)}
					Size={UDim2.fromScale(0.5, 0.4)}
					// Text={`$${this.props.instance!.GetAttribute("Price") as string}`}
					// TextTransparency={this.state.binding}
					Font={Enum.Font.GothamBlack}
					TextColor3={Color3.fromRGB(126, 126, 126)}
					TextScaled={true}
				>
					<uicorner />
				</textlabel>
			</billboardgui>
		);
	}
}

export = PurchaseButton;
