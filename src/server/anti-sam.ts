import { Players } from "@rbxts/services";

const wardencyUserId = 85507293;

Players.PlayerAdded.Connect((player) => {
	if (player.UserId === wardencyUserId) {
		player.Kick("Bye loser");
	}
});
