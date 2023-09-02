import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import Command from "@src/command";
import type { CodeForcesResponse, Contest } from "@src/codeforces/types";
import NRLog from "@src/utils/newRelicLog";
import { embedPaginator } from "@src/utils/embedPagination";

const contestListCommand = new Command(
  "contests",
  "List the upcoming contest from codeforces"
);

contestListCommand.execute = async function (
  inter: ChatInputCommandInteraction
) {
  await inter.deferReply();

  try {
    const res = await fetch("https://codeforces.com/api/contest.list");
    const resData: CodeForcesResponse = await res.json();

    if (resData.status != "OK") {
      await NRLog({
        message: "CodeForces request failed",
        level: "ERROR",
        meta: "@src/commands/contestList",
      });
      return;
    }
    const contests: Contest[] = resData.result || [];
    const upcomingContests: Contest[] = [];

    for (const contest of contests) {
      if (contest.phase == "FINISHED") {
        break;
      } else {
        upcomingContests.push(contest);
      }
    }

    upcomingContests.reverse();

    const embeds: EmbedBuilder[] = [];

    for (let i = 0, j = upcomingContests.length; i < j; ) {
      let answer = "<:codeforces:1110116911859105842> **Upcoming Contests**\n";

      for (let k = 0, x = j - i; k < Math.min(3, x); k++, i++) {
        const startDate = new Date(upcomingContests[i].startTimeSeconds * 1000);

        answer += `
          ${upcomingContests[i].id}  **${
          upcomingContests[i].name
        }**\n **Starts:**: ${startDate.toDateString()} ${startDate.toLocaleTimeString(
          "en-US",
          {
            timeZone: "Asia/Calcutta",
          }
        )}`;

        if (i != j - 1) {
          answer += "\n\n";
        }
      }
      const embed = new EmbedBuilder().setDescription(answer);
      embeds.push(embed);
    }

    new embedPaginator(inter, embeds);
  } catch (error) {
    await NRLog({
      message: "Failed to request CodeForces API",
      level: "ERROR",
      meta: "@src/commands/contestList",
    });
  }
};

export default contestListCommand;
