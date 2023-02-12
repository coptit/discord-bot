import { SlashCommandBuilder } from "discord.js";

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
  // Every command is going to replace this function
  // ex. goto @src/commands/ping.ts
  public execute(...args: unknown[]) {
    throw new Error(
      `Execute method not implemented by command (${args.length} argument given)`
    );
  }
}
