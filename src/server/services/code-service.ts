import { OnStart, Service } from "@flamework/core";
import { Logger } from "@rbxts/log";
import { HttpService } from "@rbxts/services";

/**
 *
 */
@Service({})
export class CodeService implements OnStart {
	constructor(private readonly logger: Logger) {}

	public onStart() {
		this.logger.Verbose("CodeService not implemented.");
	}

	private async getCurrentLikes(): Promise<number> {
		return new Promise((resolve, reject) => {
			const response = HttpService.RequestAsync({
				Url: "https://games.roproxy.com/v1/games/votes?universeIds=" + game.GameId,
				Method: "GET",
			});

			if (!response.Success) {
				reject();
			}
		});
	}
}
