const http = require("http");

const PORT = 3000;

const server = http.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "text/html" });
  response.end("<h1>Hello Node!!!!</h1>\n");
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
