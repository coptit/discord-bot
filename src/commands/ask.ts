import { ChatInputCommandInteraction } from "discord.js";
import { Configuration, OpenAIApi } from "openai";
import Command from "@src/command";

const askCommand = new Command(
  "ask",
  "Ask any doubt or query, powered by ChatGPT"
);

askCommand.data.addStringOption((option) =>
  option
    .setName("question")
    .setRequired(true)
    .setDescription("Prompt (Query / Question) you want to ask!")
);

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

askCommand.execute = async function (inter: ChatInputCommandInteraction) {
  inter.deferReply();

  const question = inter.options.getString("question", true);

  const res = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: question }],
  });

  const resData = res.data;
  let answerData = resData.choices[0].message?.content;

  if (answerData === undefined) {
    inter.editReply("Application does not respond. Something went wrong!");
    return;
  }

  answerData = answerData.trim();

  const answer = `<@${inter.member?.user.id}>: **${question}**\n\n**AI**:  ${answerData}`;
  inter.editReply(answer);
};

export default askCommand;
