import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

export default class Command {
  public name: string;
  public desc: string;
  public data: SlashCommandBuilder;
  constructor(name: string, desc: string) {
    this.name = name;
    this.desc = desc;
    this.data = new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.desc);
  }
  public execute(inter: ChatInputCommandInteraction) {}
}
