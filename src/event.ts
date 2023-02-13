import path from "path";
import fs from "fs";
import { DiscordClient } from "@src/client";

class ClientEvent {
  public name: string;
  public once: boolean;
  constructor(name: string, once: boolean) {
    this.name = name;
    this.once = once;
  }
  // Every event is going to replace the function
  // ex. goto @src/events/ready.ts
  public execute(...args: unknown[]) {
    throw new Error(
      `Execute method not implemented by event (${args.length} arguments given)`
    );
  }
}

function loadEvents(client: DiscordClient) {
  const eventsPath = path.join(__dirname, "events");

  const eventsFiles = fs.readdirSync(eventsPath);

  eventsFiles.forEach(async (file: string) => {
    const eventFile = path.join(eventsPath, file);
    let event = await import(eventFile);
    event = event.default;
    if (event.once) {
      client.once(event.name, event.execute);
    } else {
      client.on(event.name, event.execute);
    }
  });
}

export { ClientEvent };
export default loadEvents;
