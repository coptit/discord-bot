import { Events, GuildMember, AttachmentBuilder } from "discord.js";
import { ClientEvent } from "@src/event";
import { getChannel } from "@src/client";

const memberJoin = new ClientEvent(Events.GuildMemberAdd, false);

memberJoin.execute = async function (member: GuildMember) {
  const welcomeMessageChannelId = process.env.WELCOME;

  if (welcomeMessageChannelId == undefined) {
    console.log("[EVENTS/MEMBER-JOIN] missing welcome channel id");
    process.exit(1);
  }

  const channel = getChannel(welcomeMessageChannelId);

  if (channel == undefined) {
    console.log("[EVENTS/MEMBER-JOIN] missing welcome channel id");
    process.exit(1);
  }

  const message = `Hey, <@${member.id}> welcome to **COPTIT!**, pick your <#981589280923209868> and do write suggestion in <#1019673354334109767> if you have any!`;
  const avatar = new AttachmentBuilder(member.displayAvatarURL(), {
    name: "avatar.png",
  });

  if (channel.isTextBased()) {
    channel.send({
      content: message,
      files: [avatar],
    });
  }
};

export default memberJoin;
