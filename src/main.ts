import dotenv from "dotenv";
dotenv.config();
import { NewDiscordClient } from "@src/client";
import loadEvents from "@src/event";
import registerCommands from "@src/registerCommands";

const BOT_TOKEN = process.env.BOT_TOKEN;

const client = NewDiscordClient();

(async () => {
  await registerCommands(client.commands);
  await loadEvents(client);
  client.login(BOT_TOKEN);
})();
