import { OnStart, Service } from "@flamework/core";
import { Logger } from "@rbxts/log";
import { HttpService } from "@rbxts/services";
import PlayerEntity from "server/modules/classes/player-entity";
import { CodeMessage } from "types/interfaces/network-types";

type CodeCache = {
	[key: string]: {
		valid: boolean;
	};
};

/**
 *
 */
@Service({})
export class CodeService implements OnStart {
	private cache: CodeCache = {};

	constructor(private readonly logger: Logger) {}

	public onStart(): void {
		this.logger.Verbose(`CodeService not implemented.`);

		while (true) {
			this.updateCodeCache().catch((err) => {
				this.logger.Error(err);
			});

			task.wait(300);
		}
	}

	public redeemCode(playerEntity: PlayerEntity, code: string): CodeMessage {
		const hasCode = playerEntity.data.codes.has(code);
		if (hasCode) {
			return CodeMessage.AlreadyRedeemed;
		}

		if (!this.checkCodeIsValid(code)) {
			return CodeMessage.InvalidCode;
		}

		return CodeMessage.Success;
	}

	private checkCodeIsValid(code: string): boolean {
		return this.cache[code] !== undefined && this.cache[code].valid;
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

	private async updateCodeCache(): Promise<void> {}
}

// display discord link if over 13+ years old

/**
 *
 *
 */
