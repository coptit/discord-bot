import { ChatInputCommandInteraction } from "discord.js";
import Command from "@src/command";

const clearCommand = new Command("clear", "purge messages from channel");

clearCommand.data.addNumberOption((option) =>
  option
    .setName("amount")
    .setRequired(true)
    .setMinValue(1)
    .setMaxValue(10)
    .setDescription("how many messages to purge (1 - 10)")
);

clearCommand.execute = async function (inter: ChatInputCommandInteraction) {
  const numberOfMessageToPurge = inter.options.getNumber("amount", true);
  if (inter.inCachedGuild()) {
    inter.channel?.bulkDelete(numberOfMessageToPurge);
  }
  inter.reply({
    content: `Deleted ${numberOfMessageToPurge} messages.`,
    ephemeral: true,
  });
};

export default clearCommand;
