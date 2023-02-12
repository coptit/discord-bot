// To load the .env file

import dotenv from "dotenv";
dotenv.config();
import { NewDiscordClient } from "./client";
import loadEvents from "./event";
import registerCommands from "./registerCommands";

const BOT_TOKEN = process.env.BOT_TOKEN;

const client = NewDiscordClient();

(async () => {
  await registerCommands(client.commands);
})();

loadEvents(client);

client.login(BOT_TOKEN);
