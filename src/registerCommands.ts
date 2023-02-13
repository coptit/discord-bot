/*
Registering Commands Script
    Done only once
*/
import { Collection, REST, Routes } from "discord.js";
import Command from "@src/command";

const BOT_TOKEN = process.env.BOT_TOKEN || "";
const CLIENT_ID = process.env.CLIENT_ID || "";
const GUILD_ID = process.env.GUILD_ID || "";

async function registerCommands(
  commandsCollection: Collection<string, Command>
) {
  await deleteAllCommands();

  const commands: unknown[] = [];

  commandsCollection.forEach((value) => {
    commands.push(value.data.toJSON());
  });

  const rest = new REST({ version: "10" }).setToken(BOT_TOKEN);

  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    const data = await rest.put(Routes.applicationCommands(CLIENT_ID), {
      body: commands,
    });

    const dataLength = data as unknown[];

    console.log(
      `Successfully reloaded ${dataLength.length} application (/) commands.`
    );
  } catch (error) {
    console.log(error);
  }
}

async function deleteAllCommands() {
  const rest = new REST({ version: "10" }).setToken(BOT_TOKEN);

  if (GUILD_ID != "") {
    try {
      console.log(`Deleting all slash command from guild: ${GUILD_ID}`);
      await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
        body: [],
      });
      console.log("Done");
    } catch (error) {
      console.log(error);
    }
  }

  try {
    console.log("Deleting all global slash commands");
    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: [] });
    console.log("Done");
  } catch (error) {
    console.log(error);
  }
}

export default registerCommands;
