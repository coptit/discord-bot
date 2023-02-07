import { Client, GatewayIntentBits, Events, Collection } from "discord.js"

/* Load bot's secret token from .env file */
import dotenv from "dotenv"
dotenv.config()

/* Bot secret login token */
const BOT_TOKEN = process.env.BOT_TOKEN

/*
Extending Client class to add a new property called commands
*/
class client extends Client {
    public commands: Collection<unknown, unknown>
}

/*
Instance of client class
*/
const c = new client({
    intents: [GatewayIntentBits.Guilds]
})

c.commands = new Collection()

/*
When the bot successfully connected to discord api
*/
c.once(Events.ClientReady, (c) => {
    console.log(`[MAIN] Bot "${c.user.tag}" is now live`)
})

/*
Every slash command is an interaction, so to respond to a command...
*/
c.on(Events.InteractionCreate, (interaction) => {
    console.log(interaction)
})

c.on(Events.ChannelCreate, (m) => {
    console.log("hello")
    console.log(m)
})

/* Logging in with Bot token */
c.login(BOT_TOKEN)