import { Events, Interaction } from "discord.js";
import { DiscordClient } from "@src/client";
import { ClientEvent } from "@src/event";

const interactionEvent = new ClientEvent(Events.InteractionCreate, false);

interactionEvent.execute = async (inter: Interaction) => {
  if (!inter.isChatInputCommand()) return;

  const interClient = inter.client as DiscordClient;

  const command = interClient.commands.get(inter.commandName);

  if (!command) {
    console.error(`No command matching ${inter.commandName} was found.`);
    return;
  }

  try {
    command.execute(inter);
  } catch (error) {
    inter.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
};

export default interactionEvent;
