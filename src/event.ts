import path from "path";
import fs from "fs";
import { DiscordClient } from "@src/client";

class ClientEvent {
  public eventName: string;
  public once: boolean;
  constructor(eventName: string, once: boolean) {
    this.eventName = eventName;
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

async function loadEvents(client: DiscordClient) {
  const eventsPath = path.join(__dirname, "events");
  const eventsFiles = fs.readdirSync(eventsPath);

  await Promise.all(
    eventsFiles.map(async (file: string) => {
      const eventFile = path.join(eventsPath, file);
      let event = await import(eventFile);
      event = event.default;
      if (event.once) {
        client.once(event.name, event.execute);
      } else {
        client.on(event.name, event.execute);
      }
    })
  );
}

export { ClientEvent };
export default loadEvents;
