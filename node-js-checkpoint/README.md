# Node.js Checkpoint

This project is a simple Node.js checkpoint that contains one file for each required exercise. It uses plain Node.js, the built-in `http` and `fs` modules, plus the required npm packages for password generation and email sending.

## Project Files

| File | Purpose |
| --- | --- |
| `hello-world.js` | Prints `HELLO WORLD` to the console. |
| `server.js` | Creates a local server on port `3000`. |
| `file-system.js` | Creates `welcome.txt`, then reads and prints data from `hello.txt`. |
| `password-generator.js` | Generates and prints a random password using `generate-password`. |
| `email-sender.js` | Sends an email using `nodemailer` after email credentials are added to `.env`. |
| `hello.txt` | Sample file read by the file-system exercise. |
| `.env.example` | Shows the required email environment variables without exposing private data. |

## Requirements

- Node.js installed
- npm installed

## Installation

Install the project packages:

```bash
npm install
```

Installed packages:

- `generate-password`
- `nodemailer`
- `dotenv`

## How To Run

Run the hello world exercise:

```bash
npm run hello
```

Run the server exercise:

```bash
npm run server
```

Then open this URL in your browser:

```text
http://localhost:3000
```

Expected page response:

```html
<h1>Hello Node!!!!</h1>
```

Run the file-system exercise:

```bash
npm run files
```

Run the password generator exercise:

```bash
npm run password
```

Run the email sender exercise:

```bash
npm run email
```

## Email Setup

Create or update your local `.env` file with your own values:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=your-gmail-app-password
EMAIL_TO=receiver@example.com
```

For Gmail, use an app password instead of your normal Gmail password.

## Security Note

Do not upload personal email credentials to GitHub. The `.env` and `.env.development` files are ignored by Git, and `.env.example` is safe to share because it only contains placeholder values.
