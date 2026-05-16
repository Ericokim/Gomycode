require("dotenv").config({ quiet: true });

const nodemailer = require("nodemailer");

const { EMAIL_USER, EMAIL_APP_PASSWORD, EMAIL_TO } = process.env;

if (!EMAIL_USER || !EMAIL_APP_PASSWORD || !EMAIL_TO) {
  console.log("Please fill EMAIL_USER, EMAIL_APP_PASSWORD, and EMAIL_TO in your .env file.");
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_APP_PASSWORD,
  },
});

const mailOptions = {
  from: EMAIL_USER,
  to: EMAIL_TO,
  subject: "Node.js Checkpoint Email",
  text: "Hello from the Node.js checkpoint email sender.",
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error(error.message);
    process.exit(1);
  }

  console.log(`Email sent: ${info.response}`);
});
