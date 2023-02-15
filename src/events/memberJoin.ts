import { Events, GuildMember } from "discord.js";
import { ClientEvent } from "@src/event";

const memberJoin = new ClientEvent(Events.GuildMemberAdd, false);

memberJoin.execute = async function (member: GuildMember) {
  console.log("new member join", member.id);
};

export default memberJoin;
