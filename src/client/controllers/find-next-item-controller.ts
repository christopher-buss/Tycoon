import { Controller, OnStart } from "@flamework/core";
import { CollectionService, Players, Workspace } from "@rbxts/services";
import { ClientStore } from "client/rodux/rodux";
import { RobloxUtil } from "shared/util/roblox";
import { IPurchaseButtonModel } from "types/interfaces/buttons";

interface PossiblePart extends Model {
	TouchPart: BasePart;
}

@Controller({})
export class FindNextItemController implements OnStart {
	private lot?: string;
	private currentCheapestItem?: PossiblePart;

	constructor() {}

	public onStart(): void {
		this.lot = Players.LocalPlayer.GetAttribute("Lot") as string;

		if (this.lot !== undefined) {
			this.setupConnection();
			return;
		}

		Players.LocalPlayer.GetAttributeChangedSignal("Lot").Once(() => {
			this.lot = Players.LocalPlayer.GetAttribute("Lot") as string;
			this.setupConnection();
		});
	}

	private setupConnection(): void {
		Players.LocalPlayer.CharacterAdded.Connect(() => {
			const shouldDisplay = ClientStore.getState().playerData.settings.displayNextItem;
			if (shouldDisplay) {
				this.displayCheapestButton();
			}
		});
	}

	private getNextCheapestItem(): LuaTuple<[IPurchaseButtonModel | undefined, number]> {
		const purchaseItems = Workspace.Lots.FindFirstChild(this.lot!)?.FindFirstChild("Buttons")?.GetChildren();
		let lowestCost = math.huge;
		let cheapestItem: IPurchaseButtonModel | undefined;
		let itemsRemaining = 0;

		if (purchaseItems !== undefined) {
			for (const object of purchaseItems) {
				// purchaseItems?.forEach((object) => {
				if (!CollectionService.HasTag(object, "PurchaseButton")) {
					continue;
				}

				if (!(object.FindFirstChild("TouchPart") as BasePart)?.CanTouch) {
					continue;
				}

				const gamepassId = object.GetAttribute("GamepassId") as number;
				if (gamepassId !== undefined && gamepassId > 0) {
					continue;
				}

				const rebirths = object.GetAttribute("Rebirths") as number;
				if (rebirths !== undefined && rebirths > ClientStore.getState().playerData.rebirths) {
					continue;
				}

				const cost = object.GetAttribute("Price") as number;
				if (cost !== undefined && cost < lowestCost) {
					lowestCost = cost;
					cheapestItem = object as IPurchaseButtonModel;
				}

				itemsRemaining += 1;
			}
		}

		return $tuple(cheapestItem, itemsRemaining);
	}

	private displayCheapestButton(): void {
		const [cheapestItem, itemsRemaining] = this.getNextCheapestItem();
		this.currentCheapestItem = cheapestItem;

		if (itemsRemaining > 0) {
			cheapestItem?.TouchPart.GetPropertyChangedSignal("CanTouch").Once(() => {
				task.defer(() => {
					this.displayCheapestButton();
				});
			});
		} else {
			this.currentCheapestItem = Workspace.Rebirth;
		}

		if (this.currentCheapestItem === undefined) {
			return;
		}

		const humanoidRootPart = Players.LocalPlayer.Character?.WaitForChild("HumanoidRootPart", 3) as BasePart;
		if (humanoidRootPart === undefined) {
			return;
		}

		let attachment0 = this.currentCheapestItem.TouchPart.FindFirstChild("Attachment0") as Attachment;
		if (attachment0 === undefined) {
			attachment0 = new Instance("Attachment");
			attachment0.Name = "Attachment0";
			attachment0.Parent = humanoidRootPart;
		}

		let attachment1 = this.currentCheapestItem.TouchPart.FindFirstChild("Attachment1") as Attachment;
		if (attachment1 === undefined) {
			attachment1 = new Instance("Attachment");
			attachment1.Name = "Attachment1";
			attachment1.Parent = this.currentCheapestItem.TouchPart;
		}

		const oldBeam = humanoidRootPart.FindFirstChild("Beam") as Beam;
		if (oldBeam !== undefined) {
			oldBeam.Destroy();
		}

		const beam = new Instance("Beam");
		beam.Texture = RobloxUtil.assetUrlWithId(29563831);
		beam.Attachment0 = attachment0;
		beam.Attachment1 = attachment1;
		beam.TextureLength = 5;
		beam.TextureMode = Enum.TextureMode.Static;
		beam.TextureSpeed = 1.2;
		beam.ZOffset = 0.2;
		beam.FaceCamera = true;
		beam.Width0 = 3;
		beam.Parent = humanoidRootPart;
	}
}
