import Roact from "@rbxts/roact";

interface IProps {
	Adornee: BasePart;
	Color: Color3;
	DisplayName?: string;
}

function GamepassBillboard({ Adornee, Color, DisplayName }: IProps): Roact.Element {
	return (
		<billboardgui
			Key="Mirror"
			Adornee={Adornee}
			MaxDistance={95}
			ResetOnSpawn={false}
			Size={new UDim2(8, 0, 1, 0)}
			StudsOffset={new Vector3(0, 2.25, 0)}
		>
			<textlabel
				Key="1"
				BackgroundTransparency={1}
				Font={Enum.Font.SourceSansBold}
				Size={new UDim2(1, 0, 1, 0)}
				Text={DisplayName}
				TextColor3={Color3.fromRGB(0, 0, 0)}
				TextScaled={true}
				TextWrapped={true}
			>
				<textlabel
					Key="1"
					BackgroundTransparency={1}
					Font={Enum.Font.SourceSansBold}
					Position={new UDim2(0, -1, 0, -2)}
					Size={new UDim2(1, 0, 1, 0)}
					Text={DisplayName}
					TextColor3={Color}
					TextScaled={true}
					TextStrokeTransparency={0.9}
					TextWrapped={true}
				/>
				<uitextsizeconstraint Key="2" />
			</textlabel>
		</billboardgui>
	);
}

export = GamepassBillboard;
