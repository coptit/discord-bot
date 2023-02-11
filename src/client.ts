import { Client, Collection, GatewayIntentBits, Integration } from "discord.js";
import Command from "./command";
import path from "path";
import fs from "fs";

class DiscordClient extends Client {
  public commands!: Collection<string, Command>;
  //
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

  const commandsPath = path.join(__dirname, "commands");
  const commandFiles = fs.readdirSync(commandsPath);

  commandFiles.forEach((file) => {
    const commandFile = path.join(commandsPath, file);
    const command: Command = require(commandFile).default;
    commands.set(command.name, command);
  });

  return commands;
}

export { DiscordClient, NewDiscordClient };
