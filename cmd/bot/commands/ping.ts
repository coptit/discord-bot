import { CacheType, Interaction } from "discord.js";
import Command from "../command";

const pingCommand = new Command("ping", "ping to get pong");
pingCommand.execute = async function (inter: Interaction<CacheType>) {
  // @ts-ignore
  await inter.reply("pong!");
};

export default pingCommand;
