const fs = require("fs");
const path = require("path");

const welcomePath = path.join(__dirname, "welcome.txt");
const helloPath = path.join(__dirname, "hello.txt");

fs.writeFileSync(welcomePath, "Hello Node\n");

const data = fs.readFileSync(helloPath, "utf8");
console.log(data);
