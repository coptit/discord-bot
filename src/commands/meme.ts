import { ChatInputCommandInteraction, AttachmentBuilder } from "discord.js";
import Command from "@src/command";
import NRLog from "@src/utils/newRelicLog";

// url: https://github.com/D3vd/Meme_Api
type MemeApiResponse = {
  postLink: string;
  subreddit: string;
  title: string;
  url: string;
  nsfw: boolean;
  spoiler: boolean;
  author: string;
  ups: number;
  preview: string[];
};

const memeApiURL = "https://meme-api.com/gimme/ProgrammerHumor";

const memeCommand = new Command("meme", "Get a programming meme from reddit");

memeCommand.execute = async function (inter: ChatInputCommandInteraction) {
  await inter.deferReply();

  try {
    const resRaw = await fetch(memeApiURL);
    const data: MemeApiResponse = await resRaw.json();
    const responseImage = new AttachmentBuilder(data.preview.at(-1) as string, {
      name: "meme.png",
    });

    await inter.editReply({
      content: data.title,
      files: [responseImage],
    });
  } catch (error) {
    inter.editReply("Something went wrong");
    await NRLog({
      message: "Failed to fetch meme",
      level: "ERROR",
      meta: "at src/commands/meme",
    });
  }
};

export default memeCommand;
