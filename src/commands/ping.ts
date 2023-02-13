import { ChatInputCommandInteraction } from "discord.js";
import Command from "@src/command";

const pingCommand = new Command("ping", "Ping the bot");

pingCommand.execute = async function (inter: ChatInputCommandInteraction) {
  await inter.reply({
    content: "Pong!, I'm alive!",
    ephemeral: true,
  });
};

export default pingCommand;
