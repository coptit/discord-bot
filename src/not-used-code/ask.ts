import { ChatInputCommandInteraction } from "discord.js";
import Command from "../command";

const askCommand = new Command("ask", "Ask Programming Question");

askCommand.data.addStringOption((option) =>
  option
    .setName("question")
    .setDescription("What you want to ask")
    .setRequired(true)
);

askCommand.execute = async function (inter: ChatInputCommandInteraction) {
  const query = inter.options.getString("question", true);
  await inter.reply(`Question: **${query}**`);
};

export default askCommand;
