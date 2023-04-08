export default async function NRLog(logPayload: {
  message: string;
  level: string;
  meta: string;
  client?: string;
}) {
  const logURL = process.env.NR_API_URL;
  const nrKEY = process.env.NR_LICENSE_KEY;

  if (logURL === undefined || nrKEY === undefined) {
    return;
  }

  logPayload.client = "COPTIT_DISCORD_BOT";

  try {
    await fetch(logURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Api-Key": nrKEY,
      },
      body: JSON.stringify(logPayload),
    });
  } catch (error) {
    console.log("Failed to send log to NEW RELIC @src/utils/newRelicLog.ts");
    console.error(error);
  }
}
