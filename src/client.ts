import { Client, Collection, GatewayIntentBits } from "discord.js";
import path from "path";
import fs from "fs";
import Command from "@src/command";

class DiscordClient extends Client {
  public commands!: Collection<string, Command>;
}

async function NewDiscordClient(): Promise<DiscordClient> {
  const client = new DiscordClient({
    intents: [
      GatewayIntentBits.Guilds /* Access Server Info  */,
      GatewayIntentBits.GuildMessages /* Access Server Messages But not content */,
      GatewayIntentBits.GuildMembers /* Access Server Members */,
      GatewayIntentBits.GuildIntegrations /* Access Server Interactions (Slash commands)  */,
    ],
  });

  client.commands = await setCommands();

  return client;
}

async function setCommands(): Promise<Collection<string, Command>> {
  const commands = new Collection<string, Command>();

  const commandsPath = path.join(__dirname, "commands");
  const commandFiles = fs.readdirSync(commandsPath);

  await Promise.all(
    commandFiles.map(async (file) => {
      const commandFile = path.join(commandsPath, file);
      let command = await import(commandFile);
      command = command.default;
      commands.set(command.name, command);
    })
  );

  return commands;
}

export { DiscordClient, NewDiscordClient };
