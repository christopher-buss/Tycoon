export interface INotificationEntry {
	Title: string;
	Text: string;
	Icon: string;
	Duration: number;
}

const NotificationData: Array<INotificationEntry> = [
	{
		Title: "Want more updates?",
		Text: "Join the Paradise Prime group to keep up to date with new features",
		Icon: "rbxassetid://7329674470",
		Duration: 6,
	},
	{
		Title: "Enjoying our game?",
		Text: "Make sure you hit the LIKE button to help us out!",
		Icon: "rbxassetid://1797313563",
		Duration: 6,
	},
	{
		Title: "Enjoying our game?",
		Text: "Give the game a star if you want to come back later! You'll be able to find it easier!",
		Icon: "rbxassetid://1797313563",
		Duration: 6,
	},
	{
		Title: "Time to Rebirth?",
		Text: "Head to the Temple in the centre of the map to rebirth!",
		Icon: "rbxassetid://1797313563",
		Duration: 6,
	},
	{
		Title: "Want something new?",
		Text: "The Temple in the centre of the map has some cool things! Check it out!",
		Icon: "rbxassetid://1797313563",
		Duration: 6,
	},
	{
		Title: "Want something new?",
		Text: "The Temple in the centre of the map has some cool things! Check it out!",
		Icon: "rbxassetid://1797313563",
		Duration: 6,
	},
	{
		Title: "Want something new?",
		Text: "At the Temple you can unlock exclusive items with your rebirths!",
		Icon: "rbxassetid://1797313563",
		Duration: 6,
	},
	{
		Title: "Want something new?",
		Text: "Head down the stairs to the docks at your Tycoon! There's even a small Fishery!",
		Icon: "rbxassetid://1797313563",
		Duration: 6,
	},
	{
		Title: "Found a bug?",
		Text: "Report it on the Paradise Prime group wall!",
		Icon: "rbxassetid://1797313563",
		Duration: 6,
	},
];

export type AllNotificationData = typeof NotificationData;

export default NotificationData;
