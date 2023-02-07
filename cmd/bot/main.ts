import { Client, GatewayIntentBits, Events } from "discord.js"

/* Load bot's secret token from .env file */
import dotenv from "dotenv"
dotenv.config()

/* Bot secret login token */
const BOT_TOKEN = process.env.BOT_TOKEN

/*
[CLIENT INSTANCE]
The main client interface to interact with discord API
*/
const client = new Client({
    intents: [GatewayIntentBits.Guilds]
})

client.once(Events.ClientReady, (c) => {
    console.log(`[MAIN] Bot "${c.user.tag}" is now live`)
})

/* Logging in with Bot token */
client.login(BOT_TOKEN)