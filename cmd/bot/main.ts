import dotenv from "dotenv";
dotenv.config();

import { NewDiscordClient, DiscordClient } from "./client";
import { Events } from "discord.js";

const BOT_TOKEN = process.env.BOT_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

const client = NewDiscordClient();

client.once(Events.ClientReady, (c) => {
  console.log(`[MAIN] ${c.user.tag} is now live!`);
});

client.on(Events.InteractionCreate, async (inter) => {
  if (!inter.isChatInputCommand()) return; // Only Input command here not interaction like messages

  const interClient = inter.client as DiscordClient;

  const command = interClient.commands.get(inter.commandName);

  if (!command) {
    console.error(`No command matching ${inter.commandName} was found.`);
    return;
  }

  try {
    command.execute(inter)
  } catch(error) {
    console.log(error);
    inter.reply({ content: 'There was an error while executing this command!', ephemeral: true })
  }

});

client.login(BOT_TOKEN);
