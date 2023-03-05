interface ServerStorage extends Instance {
	Upgraders: Folder & {
		["Red Salon"]: Folder;
		["Green Salon"]: Folder;
		["Blue Salon"]: Folder;
		["Pink Salon"]: Folder;
		["Orange Salon"]: Folder;
		["Yellow Salon"]: Folder;
	};
	RebirthItems: Folder;
	Gamepasses: Folder;
	TagList: Folder & {
		BuyAllPets: Configuration;
		Animate: Configuration;
		TimerButton: Configuration;
		SlidingDoor: Configuration;
		PurchaseButton: Configuration;
		Friend: Configuration;
		Dropper: Configuration;
		GamepassPrompt: Configuration;
		Item: Configuration;
		Float: Configuration;
		Debug: Configuration;
		Lot: Configuration;
		Rainbow: Configuration;
		SwingingDoor: Configuration;
		Pet: Configuration;
		Jellyfish: Configuration;
		Upgrader: Configuration;
		RebirthButton: Configuration;
		Remover: Configuration;
		Spinner: Configuration;
		LotSign: Configuration;
		Teleport: Configuration;
		ConveyorBelt: Configuration;
		Catalogue: Configuration;
	};
}
