import { App, LogLevel } from "@slack/bolt";
import dotenv from "dotenv";

dotenv.config();

// --- Helper: timestamped log ---
function log(label: string, msg: string) {
  const ts = new Date().toISOString();
  console.log(`[${ts}] [${label}] ${msg}`);
}

// --- Load & validate env ---
const botToken = process.env.SLACK_BOT_TOKEN;
const appToken = process.env.SLACK_APP_TOKEN;
const signingSecret = process.env.SLACK_SIGNING_SECRET;
const port = Number(process.env.PORT || 3000);

if (!botToken) throw new Error("Missing SLACK_BOT_TOKEN in the environment.");
if (!appToken) throw new Error("Missing SLACK_APP_TOKEN in the environment.");
if (!signingSecret) throw new Error("Missing SLACK_SIGNING_SECRET in the environment.");

log("INIT", "Environment variables loaded");

// --- Create Bolt app ---
const app = new App({
  token: botToken,
  appToken,
  signingSecret,
  socketMode: true,
  logLevel: LogLevel.DEBUG,
});

// --- /hello slash command ---
app.command("/hello", async ({ ack, respond, command }) => {
  log("COMMAND", `/hello from @${command.user_name} in #${command.channel_name}`);
  await ack();

  const name = command.user_name || "there";
  await respond(`Hello, ${name}. Your Slack bot is working.`);
  log("COMMAND", `/hello responded to @${name}`);
});

// --- Listen to all channel messages ---
app.message(async ({ message, say }) => {
  if (!("text" in message) || !message.text) {
    log("MESSAGE", "Received message with no text (file, image, etc.) — skipping");
    return;
  }

  const user = "user" in message && message.user ? message.user : "unknown";
  const channel = "channel" in message ? message.channel : "unknown";
  log("MESSAGE", `<@${user}> in <#${channel}>: ${message.text}`);

  if (message.text.trim().toLowerCase() === "hello") {
    await say("Hello from your Bolt bot.");
    log("MESSAGE", `Replied "hello" to <@${user}>`);
  }
});

// --- Error handler ---
app.error(async (error) => {
  log("ERROR", `${error.message}`);
});

// --- Start the bot ---
async function startBot() {
  await app.start(port);
  log("START", `Slack bot is running in Socket Mode on port ${port}`);
  log("START", "Waiting for events from Slack...");
}

void startBot();
