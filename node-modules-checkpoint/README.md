# Node.js Modules Checkpoint

This project demonstrates built-in, local, and third-party modules in Node.js.

## Setup

Install dependencies:

```bash
npm install
```

## Task 1: Built-in Module

`readFile.js` uses Node's built-in `fs` module to read `message.txt`.

Run:

```bash
node readFile.js
```

Expected output:

```text
Hello from the file system module!
```

## Task 2: Local Module

`reportGenerator.js` exports `generateReport(name, scores)`.

`main.js` imports it with `require("./reportGenerator")`, calls it with example data, and prints the formatted report.

Run:

```bash
node main.js
```

## Task 3: Third-Party Module

`emailSender.js` uses `nodemailer` to send an email with Gmail SMTP.

Add your Gmail settings to `.env.development`:

```env
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-gmail-app-password
MAIL_TO=recipient@example.com
```

Then run:

```bash
node emailSender.js
```

If any value is missing, the script prints a setup error and stops without sending.
