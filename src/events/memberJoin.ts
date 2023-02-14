import { Events, GuildMember } from "discord.js";
import { ClientEvent } from "@src/event";

const memberJoinEvent = new ClientEvent(Events.GuildMemberAdd, false);

memberJoinEvent.execute = function (x: GuildMember) {
  console.log("Member Joined");
  const memberName = x.nickname;
  const memberAvatar = x.avatar;
  console.log(memberName, memberAvatar);
};

export default memberJoinEvent;
