import { Events } from "discord.js";
import { ClientEvent } from "@src/event";

const warn = new ClientEvent(Events.Warn, false);

warn.execute = function (x) {
  console.log(x);
};

export default warn;
