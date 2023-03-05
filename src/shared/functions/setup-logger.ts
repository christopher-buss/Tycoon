import Log, { Logger, LogLevel } from "@rbxts/log";
import { ILogEventSink, LogEvent } from "@rbxts/log/out/Core";
import { MessageTemplateParser, PlainTextMessageTemplateRenderer } from "@rbxts/message-templates";
import { RunService } from "@rbxts/services";
import { $package } from "rbxts-transform-debug";

const IsClient = RunService.IsClient() ? "Client" : "Server";

class LogEventSFTOutputSink implements ILogEventSink {
	constructor() {}

	public Emit(message: LogEvent): void {
		const template = new PlainTextMessageTemplateRenderer(MessageTemplateParser.GetTokens(message.Template));
		const context = message.SourceContext ?? "Game";
		let tag: string;

		switch (message.Level) {
			case LogLevel.Verbose:
				tag = "VERBOSE";
				break;
			case LogLevel.Debugging:
				tag = "DEBUG";
				break;
			case LogLevel.Information:
				tag = "INFO";
				break;
			case LogLevel.Warning:
				tag = "WARN";
				break;
			case LogLevel.Error:
				tag = "ERROR";
				break;
			case LogLevel.Fatal:
				tag = "FATAL";
				break;
		}

		const message_result = template.Render(message);
		const formatted_message = `[${tag}] ${context} (${IsClient}) - ${message_result}`;

		if (message.Level >= LogLevel.Warning) {
			warn(formatted_message);
		} else {
			print(formatted_message);
		}
	}
}

export function setupLogger(): void {
	Log.SetLogger(
		Logger.configure()
			.SetMinLogLevel(RunService.IsStudio() ? LogLevel.Debugging : LogLevel.Information)
			.EnrichWithProperty("Version", $package.version)
			// .WriteTo(Log.RobloxOutput({ TagFormat: "full" }))
			.WriteTo(new LogEventSFTOutputSink())
			.Create(),
	);
}
