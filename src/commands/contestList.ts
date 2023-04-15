import { ChatInputCommandInteraction } from "discord.js";
import Command from "@src/command";
import type { CodeForcesResponse, Contest } from "@src/codeforces/types";
import NRLog from "@src/utils/newRelicLog";

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
    inter.editReply({
      content: JSON.stringify(upcomingContests),
    });
  } catch (error) {
    await NRLog({
      message: "Failed to request CodeForces API",
      level: "ERROR",
      meta: "@src/commands/contestList",
    });
  }
};

export default contestListCommand;
