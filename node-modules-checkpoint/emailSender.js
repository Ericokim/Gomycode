const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env"), quiet: true });
require("dotenv").config({
  path: path.join(__dirname, ".env.development"),
  override: true,
  quiet: true,
});

const nodemailer = require("nodemailer");

if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD || !process.env.MAIL_TO) {
  console.error("Missing email settings in .env.development");
  console.error("Update .env.development, then run: node emailSender.js");
  process.exit(1);
}

const { GMAIL_USER, GMAIL_APP_PASSWORD, MAIL_TO } = process.env;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_APP_PASSWORD,
  },
});

const mailOptions = {
  from: GMAIL_USER,
  to: MAIL_TO,
  subject: "Node.js Modules Checkpoint",
  text: "Hello from nodemailer in the Node.js modules checkpoint!",
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("Email failed:", error.message);
    return;
  }

  console.log("Email sent successfully:", info.response);
});
