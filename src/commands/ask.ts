import { ChatInputCommandInteraction } from "discord.js";
import { Configuration, OpenAIApi } from "openai";
import Command from "@src/command";
import NRLog from "@src/utils/newRelicLog";

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

askCommand.data.addStringOption((option) =>
  option
    .setName("message_ids")
    .setRequired(false)
    .setDescription(
      "All the previous message ids separated by , to uses as a context in this prompt"
    )
);

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const background = `
  You are being used as a bot in "COPTIT" Discord Server, COPTIT stand for
  Club of Programmers, Technocrats Institute of Technology.
  This i collage programming club founded by "Kunal Singh", "Srijan Sony",
  "Siddhu", "Ashutosh Sahu" and other students of Technocrats Institute.
  About COPTIT, Club of Programmers, Technocrats Institute of Technology is a programming club
  that aims to create a place to learn and enjoy programming together.
  Our sole purpose is to increase the interaction and collaboration between students
  studying or interested in programming.
  Club member can use you by typing "/ask" command. Some other commands are also available.
  Such as "/meme", "ping" which are used to get memes and check bot's status respectively.
`;

const systemInstructions = `

  Some background: ${background}.

  Some Instruction you have to follow are as follows:

  You are a good AI Model you are very much suppose to follow these instructions

  1. As you are being used in a Programming Club, you are expected to answer
  programming related queries with more accuracy.

  4. Unless you are asked to answer in long paragraph, you are expected to answer
  in short paragraph.

  5. Always use highlighting for code snippets or code block or any code related block. It is well supported by Discord.

  6. user markdown as mush as possible. Because it is easy to read.
`;

askCommand.execute = async function (inter: ChatInputCommandInteraction) {
  inter.deferReply();

  const question = inter.options.getString("question", true);

  const previousMessageIDsString = inter.options.getString(
    "message_ids",
    false
  );

  let previousMessages = "";

  if (previousMessageIDsString != null) {
    const allMessagesIDs = previousMessageIDsString.split(",");
    for (const messageID of allMessagesIDs) {
      if (messageID.length == 0) {
        continue;
      }
      try {
        const message = await inter.channel?.messages.fetch(messageID);
        previousMessages += message?.content;
        previousMessages += ". ";
      } catch (error) {
        NRLog({
          message: "Failed to get message using message ID",
          level: "ERROR",
          meta: "at src/commands/ask",
        });
      }
    }
    previousMessages +=
      " .Use the above message as context, answer the following question: ";
  }

  try {
    const res = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemInstructions },
        {
          role: "user",
          content: previousMessages + question,
        },
      ],
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
  } catch (error) {
    inter.editReply("Something went wrong.");
    NRLog({
      message: "Could not send request to openai api",
      level: "ERROR",
      meta: "st src/commands/ask",
    });
  }
};

export default askCommand;
