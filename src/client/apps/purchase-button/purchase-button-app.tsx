import Roact from "@rbxts/roact";
import { App } from "client/controllers/ui";

export type IProps = {
	// Adornee: BasePart;
	DisplayName?: string;
	Price?: number;
	// Janitor: Janitor;
};

@App({
	name: "PurchaseButtonApp",
	tag: "PurchaseButton",
	type: "billboardgui",
})
export class PurchaseButtonApp extends Roact.PureComponent<IProps> {
	// transparency = Value<number>(0);
	// props.Janitor.Add(
	// 	props.Adornee.GetPropertyChangedSignal("Transparency").Connect(() => {
	// 		transparency.set(props.Adornee.Transparency);
	// 	}),
	// );
	public render() {
		return undefined;
	}
}
