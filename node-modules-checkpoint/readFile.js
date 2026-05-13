const fs = require("fs");
const path = require("path");

const messagePath = path.join(__dirname, "message.txt");
const message = fs.readFileSync(messagePath, "utf8");

console.log(message);
