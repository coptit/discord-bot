import { Events, GuildMember, Role, EmbedBuilder } from "discord.js";
import { ClientEvent } from "@src/event";
import { getChannel } from "@src/client";
import NRLog from "@src/utils/newRelicLog";

const memberJoin = new ClientEvent(Events.GuildMemberAdd, false);

memberJoin.execute = async function (member: GuildMember) {
  const welcomeMessageChannelId = process.env.WELCOME;

  if (welcomeMessageChannelId === undefined) {
    NRLog({
      message: "missing welcome channel id",
      level: "ERROR",
      meta: "@ src/events/memberJoin.ts",
    });
    return;
  }

  const channel = getChannel(welcomeMessageChannelId);

  if (channel === undefined) {
    NRLog({
      message: "Could not get channel form id",
      level: "ERROR",
      meta: "@ src/events/memberJoin.ts",
    });
    return;
  }

  const embedMessageToSendWhenUserJoinServer = new EmbedBuilder()
    .setColor("Green")
    .setTitle(`Hey! ${member.displayName}, welcome to **COPTIT**!`)
    .setURL("https://coptit.web.app")
    .setThumbnail(member.displayAvatarURL())
    .setTimestamp()
    .setDescription(
      `<@${member.id}> here's what you can do **next**!\n\n➜ Pick your <#981589280923209868>\n➜ Introduce yourself at <#981574102018035724>\n➜ Write suggestions in <#1019673354334109767> if you have any`
    );

  const roleToAdd: Role | undefined = member.guild.roles.cache.find(
    (value: Role) => {
      return value.name === "member";
    }
  );

  if (roleToAdd === undefined) {
    NRLog({
      message: "missing role to add user when join server",
      level: "ERROR",
      meta: "@ src/events/memberJoin.ts",
    });
    return;
  }

  member.roles.add(roleToAdd);

  if (channel.isTextBased()) {
    channel.send({
      embeds: [embedMessageToSendWhenUserJoinServer],
    });
  }
};

export default memberJoin;
