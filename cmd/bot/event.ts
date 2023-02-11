import path from "path";
import fs from "fs";
import { DiscordClient } from "./client";

class ClientEvent {
  public name: string;
  public once: boolean;
  constructor(name: string, once: boolean) {
    this.name = name;
    this.once = once;
  }
  public execute(v: any) {}
}

function loadEvents(client: DiscordClient) {
  const eventsPath = path.join(__dirname, "events");

  const eventsFiles = fs.readdirSync(eventsPath);

  eventsFiles.forEach((file: string) => {
    const eventFile = path.join(eventsPath, file);
    const event: ClientEvent = require(eventFile).default;
    if (event.once) {
      client.once(event.name, (agrs) => event.execute(agrs));
    } else {
      client.on(event.name, (args) => event.execute(args));
    }
  });
}

export { ClientEvent };
export default loadEvents;
