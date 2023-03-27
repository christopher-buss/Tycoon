import Roact from "@rbxts/roact";
import Hooks from "@rbxts/roact-hooks";

interface IStateProps {
	AnchorPoint: Vector2;
	HoverImage: string;
	Image: string;
	Position: UDim2;
}

const InnerSideBarButton: Hooks.FC<IStateProps> = (props) => {
	return (
		<imagebutton
			AnchorPoint={props.AnchorPoint}
			BackgroundTransparency={1}
			HoverImage={props.HoverImage}
			Image={props.Image}
			Position={props.Position}
			Size={new UDim2(0.8, 0, 0.406, 0)}
		/>
	);
};

export const SideBarButton = new Hooks(Roact)(InnerSideBarButton, {
	componentType: "PureComponent",
});
