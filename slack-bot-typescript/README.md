# Slack Bot TypeScript App

This is a simple Slack bot built with Node.js, TypeScript, and Bolt.

## What It Does

- Connects to Slack with Bolt via Socket Mode
- Logs incoming message text in subscribed channels
- Responds when a user sends `hello`
- Responds to the `/hello` slash command

## Proof of Work

### Bot in Action

The bot was added to `#new-channel` and tested with both the `/hello` slash command and regular `hello` messages:

![Slack Bot Proof](assets/slack-bot-proof.png)

**What's happening in the screenshot:**
1. `erickims08` mentioned `@Slack_Bot App` to invite the bot to `#new-channel`
2. The bot was added to the channel
3. `/hello` command was used — bot responded: *"Hello, erickims08. Your Slack bot is working."*
4. `hello` was typed as a regular message — bot replied: *"Hello from your Bolt bot."*
5. `hi there` + `hello` were sent — bot replied again to the `hello` keyword

### Terminal Logs

When the bot is running, all activity is logged with timestamps:

```
[2026-04-17T10:32:51.610Z] [INIT]    Environment variables loaded
[2026-04-17T10:32:54.087Z] [START]   Slack bot is running in Socket Mode on port 3000
[2026-04-17T10:32:54.087Z] [START]   Waiting for events from Slack...
[2026-04-17T10:40:00.000Z] [COMMAND] /hello from @erickims08 in #new-channel
[2026-04-17T10:40:00.050Z] [COMMAND] /hello responded to @erickims08
[2026-04-17T10:40:12.000Z] [MESSAGE] <@U0ATJ...> in <#C0ATJ...>: hello
[2026-04-17T10:40:12.100Z] [MESSAGE] Replied "hello" to <@U0ATJ...>
[2026-04-17T10:42:05.000Z] [MESSAGE] <@U0ATJ...> in <#C0ATJ...>: hi there
[2026-04-17T10:42:08.000Z] [MESSAGE] <@U0ATJ...> in <#C0ATJ...>: hello
[2026-04-17T10:42:08.100Z] [MESSAGE] Replied "hello" to <@U0ATJ...>
```

## Install

```bash
npm install
```

## Environment Setup

Create your local environment file:

```bash
cp .env.example .env
```

Add your Slack tokens to `.env`:

```
SLACK_BOT_TOKEN=xoxb-your-bot-token
SLACK_APP_TOKEN=xapp-your-app-level-token
SLACK_SIGNING_SECRET=your-signing-secret
PORT=3000
```

## Slack App Setup

Create a Slack app from the Slack API apps page, then configure these items.

### OAuth Scopes

Bot token scopes:

- `chat:write`
- `channels:history`
- `commands`

### App-Level Token

- Turn on Socket Mode.
- Create an app-level token with `connections:write`.
- Copy the token that starts with `xapp-` into `SLACK_APP_TOKEN`.

### Event Subscriptions

- Enable Event Subscriptions.
- Subscribe to the `message.channels` bot event.
- Reinstall the app if Slack asks for updated permissions.

### Slash Command

- Create the `/hello` slash command in your Slack app.
- Bolt will receive the slash command through Socket Mode while the bot is running.

## Run The Bot

Start the bot:

```bash
npm run dev
```

Type-check the project:

```bash
npm run check
```

Build and run production:

```bash
npm run build
npm start
```

## Expected Behavior

- Sending `hello` in a subscribed channel makes the bot reply.
- Any text message received by the bot is logged in the terminal with timestamps.
- Running `/hello` returns a short greeting from the bot.
- All events (commands, messages, errors) are logged to the console.
