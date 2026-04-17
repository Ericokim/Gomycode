# Slack Bot TypeScript App

This is a simple Slack bot built with Node.js, TypeScript, and Bolt.

## What It Does

- Connects to Slack with Bolt
- Logs incoming message text in subscribed channels
- Responds when a user sends `hello`
- Responds to the `/hello` slash command

## Install

```bash
npm install
```

## Environment Setup

Create your local environment file:

```bash
cp .env.example .env
```

Add your Slack tokens to `.env`.

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

Build the project:

```bash
npm run build
```

## Expected Behavior

- Sending `hello` in a subscribed channel makes the bot reply.
- Any text message received by the bot is logged in the terminal.
- Running `/hello` returns a short greeting from the bot.
