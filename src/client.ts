import { Client, Collection, GatewayIntentBits, Channel } from "discord.js";
import path from "path";
import fs from "fs";
import Command from "@src/command";

class DiscordClient extends Client {
  public commands!: Collection<string, Command>;
}

let GlobalClient: DiscordClient;

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

  GlobalClient = client;

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

function getChannel(channelId: string): Channel | undefined {
  const channel = GlobalClient.channels.cache.get(channelId);
  return channel;
}

export { DiscordClient, NewDiscordClient, getChannel };
