import { Client, Collection, GatewayIntentBits } from "discord.js";
import path from "path";
import fs from "fs";
import Command from "./command";

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

  commandFiles.forEach(async (file) => {
    const commandFile = path.join(commandsPath, file);
    let command = await import(commandFile);
    command = command.default;
    commands.set(command.name, command);
  });

  return commands;
}

export { DiscordClient, NewDiscordClient };
