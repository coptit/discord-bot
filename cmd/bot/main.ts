import { Client, GatewayIntentBits, Events, Collection } from "discord.js";
import x from "./commands/ping";

/* Load bot's secret token from .env file */
import dotenv from "dotenv";
dotenv.config();

/* Bot secret login token */
const BOT_TOKEN = process.env.BOT_TOKEN;

/*
Extending Client class to add a new property called commands
*/
class client extends Client {
  public commands: Collection<unknown, unknown>;
}

/*
Instance of client class
Intents -> access
*/
const c = new client({
  intents: [
    GatewayIntentBits.Guilds /* Access Server Info  */,
    GatewayIntentBits.GuildMessages /* Access Server Messages But not content */,
    GatewayIntentBits.GuildIntegrations /* Access Server Interactions (Slash commands)  */,
  ],
});

c.commands = new Collection();
c.commands.set(x.data.name, x);

/*
When the bot successfully connected to discord api
*/
c.once(Events.ClientReady, (c) => {
  console.log(`[MAIN] Bot "${c.user.tag}" is now live`);
});

/*
On every message created
*/
c.on(Events.MessageCreate, (m) => {
  console.log("-----------------MESSAGE-------------------");
  console.log(m);
});

/*
On every interaction created
*/
c.on(Events.InteractionCreate, async (e) => {
  console.log("-------------INTERACTION-------------------");
  console.log(e);
});

/* Logging in with Bot token */
c.login(BOT_TOKEN);
