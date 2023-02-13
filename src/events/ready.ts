import { Events } from "discord.js";
import { DiscordClient } from "@src/client";
import { ClientEvent } from "@src/event";

const readyEvent = new ClientEvent(Events.ClientReady, true);

readyEvent.execute = function (client: DiscordClient) {
  console.log(`Bot "${client.user?.tag}" is now live!`);
};

export default readyEvent;
