import { Events, ChatInputCommandInteraction } from "discord.js";
import { DiscordClient } from "../client";
import { ClientEvent } from "../event";

const interactionEvent = new ClientEvent(Events.InteractionCreate, false);

interactionEvent.execute = async (inter: ChatInputCommandInteraction) => {
  if (!inter.isChatInputCommand) return;

  const interClient = inter.client as DiscordClient;

  const command = interClient.commands.get(inter.commandName);

  if (!command) {
    console.error(`No command matching ${inter.commandName} was found.`);
    return;
  }

  try {
    command.execute(inter);
  } catch (error) {
    console.log(error);
    inter.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
};

export default interactionEvent;
