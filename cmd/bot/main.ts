import dotenv from "dotenv";
dotenv.config();

import { NewDiscordClient } from "./client";
import { loadEvents } from "./event";

const BOT_TOKEN = process.env.BOT_TOKEN;

const client = NewDiscordClient();

loadEvents(client);

client.login(BOT_TOKEN);
