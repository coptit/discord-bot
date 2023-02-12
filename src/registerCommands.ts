/*
Registering Commands Script
    Done only once
*/
import { Collection, REST, Routes } from "discord.js";
import Command from "./command";

const BOT_TOKEN = process.env.BOT_TOKEN as string;
const CLIENT_ID = process.env.CLIENT_ID as string;

async function registerCommands(
  commandsCollection: Collection<string, Command>
) {
  const commands: any[] = [];

  commandsCollection.forEach((value) => {
    commands.push(value.data.toJSON());
  });

  const rest = new REST({ version: "10" }).setToken(BOT_TOKEN);

  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(Routes.applicationCommands(CLIENT_ID), {
      body: commands,
    });

    console.log(
      // @ts-ignore
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    console.log(error);
  }
}

export default registerCommands;
