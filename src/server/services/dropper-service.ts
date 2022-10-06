import { OnInit, OnStart, Service } from "@flamework/core";

@Service({})
export class DropperService implements OnStart, OnInit {
	// private ownedDroppers: Array<Player<string>>;

	constructor() {
		// this.ownedDroppers = [[]];
	}

	public onInit() {}

	public onStart() {}

	public addOwnedDropper(name: string, pathType: string) {}
}
