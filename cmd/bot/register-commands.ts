/*
Registering Commands Script
    Done only once
*/
import { REST, Routes } from "discord.js";
import pingCommand from "./commands/ping";

const BOT_TOKEN = process.env.BOT_TOKEN || "";
const CLIENT_ID = process.env.CLIENT_ID || "";
const GUILD_ID = process.env.GUILD_ID || "";

console.log(BOT_TOKEN)

const commands = [pingCommand.data.toJSON()];

const rest = new REST({ version: "10" }).setToken(BOT_TOKEN);

(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands }
    );

    console.log(
      // @ts-ignore
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    console.log(error);
  }
})();
