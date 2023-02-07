// import { SlashCommandBuilder } from "discord.js";

// /* Command Setup */
// const command = new SlashCommandBuilder()
//   .setName("ping")
//   .setDescription("Replies with pong");

// /* Command Executer */
// async function execute(interaction: any) {
//   await interaction.reply("pong!");
// }

// export { command, execute };

import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async execute(interaction: any) {
    await interaction.reply("Pong!");
  },
};
