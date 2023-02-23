import { Events, GuildMember, Role, EmbedBuilder } from "discord.js";
import { ClientEvent } from "@src/event";
import { getChannel } from "@src/client";

const memberJoin = new ClientEvent(Events.GuildMemberAdd, false);

memberJoin.execute = async function (member: GuildMember) {
  const welcomeMessageChannelId = process.env.WELCOME;

  if (welcomeMessageChannelId === undefined) {
    console.log("[EVENTS/MEMBER-JOIN] missing welcome channel id");
    process.exit(1);
  }

  const channel = getChannel(welcomeMessageChannelId);

  if (channel === undefined) {
    console.log("[EVENTS/MEMBER-JOIN] missing welcome channel id");
    process.exit(1);
  }

  const embedMessageToSendWhenUserJoinServer = new EmbedBuilder()
    .setColor("Green")
    .setTitle(`Hey! ${member.displayName}, welcome to **COPTIT**!`)
    .setURL("https://coptit.web.app")
    .setThumbnail(member.displayAvatarURL())
    .setTimestamp()
    .setDescription(
      `<@${member.id}> here what you can do **next**!\n\n➜ Pick you <#981589280923209868>\n➜ Introduce you self at <#981574102018035724>\n➜ Write any suggestions in <#1019673354334109767> if you have any`
    );

  const roleToAdd: Role | undefined = member.guild.roles.cache.find(
    (value: Role) => {
      return value.name === "member";
    }
  );

  if (roleToAdd === undefined) {
    console.log(
      "[EVENTS/MEMBER-JOIN] missing role to add user when join server"
    );
    process.exit(1);
  }

  member.roles.add(roleToAdd);

  if (channel.isTextBased()) {
    channel.send({
      embeds: [embedMessageToSendWhenUserJoinServer],
    });
  }
};

export default memberJoin;
