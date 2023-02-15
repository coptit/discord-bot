import { Events } from "discord.js";
import { ClientEvent } from "@src/event";

const debug = new ClientEvent(Events.Debug, false);

debug.execute = function (x) {
  console.log(x);
};

export default debug;
