import { Client, Collection, GatewayIntentBits, Integration } from "discord.js";
import Command from "./command";
import pingCommand from "./commands/ping";

class DiscordClient extends Client {
  public commands: Collection<string, Command>;
}

function NewDiscordClient(): DiscordClient {
  const client = new DiscordClient({
    intents: [
      GatewayIntentBits.Guilds /* Access Server Info  */,
      GatewayIntentBits.GuildMessages /* Access Server Messages But not content */,
      GatewayIntentBits.GuildMembers /* Access Server Members */,
      GatewayIntentBits.GuildIntegrations /* Access Server Interactions (Slash commands)  */,
    ],
  });

  client.commands = setCommands();

  return client;
}

function setCommands(): Collection<string, Command> {
  const commands = new Collection<string, Command>();
  commands.set(pingCommand.name, pingCommand);
  return commands;
}

export { DiscordClient, NewDiscordClient };
