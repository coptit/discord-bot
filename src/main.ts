import dotenv from "dotenv";
dotenv.config();
import { NewDiscordClient } from "@src/client";
import loadEvents from "@src/event";
import registerCommands from "@src/registerCommands";
import NRLog from "./utils/newRelicLog";

const BOT_TOKEN = process.env.BOT_TOKEN;

(async () => {
  const client = await NewDiscordClient();
  await registerCommands(client.commands);
  await loadEvents(client);
  await client.login(BOT_TOKEN);
  await NRLog({
    message: "Started COPTIT Discord Bot Server",
    level: "INFO",
    meta: "at @src/main.ts",
  });
})();
