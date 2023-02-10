import dotenv from "dotenv";
dotenv.config();

import { NewDiscordClient } from "./client";
import { loadEvents } from "./event";
import registerCommands from "./register-commands";

const BOT_TOKEN = process.env.BOT_TOKEN;

const client = NewDiscordClient();

registerCommands(client.commands);
loadEvents(client);

client.login(BOT_TOKEN);
