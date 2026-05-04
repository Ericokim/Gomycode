const http = require("http");
const url = require("url");
const handlers = require("./handlers");

const PORT = 3000;

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  if (path === "/tasks") {
    if (method === "GET") return handlers.getTasks(req, res);
    if (method === "POST") return handlers.createTaskHandler(req, res);
    if (method === "DELETE") return handlers.deleteAllHandler(req, res);
    return handlers.sendMethodNotAllowed(res, ["GET", "POST", "DELETE"]);
  }

  if (/^\/tasks\/\d+$/.test(path)) {
    const id = path.split("/")[2];

    if (method === "GET") return handlers.getTask(req, res, id);
    if (method === "PUT") return handlers.updateTaskHandler(req, res, id);
    if (method === "DELETE") return handlers.deleteTaskHandler(req, res, id);
    return handlers.sendMethodNotAllowed(res, ["GET", "PUT", "DELETE"]);
  }

  return handlers.sendJSON(res, 404, {
    success: false,
    message: "Route not found",
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log("Available routes:");
  console.log("  GET    /tasks");
  console.log("  POST   /tasks");
  console.log("  GET    /tasks/:id");
  console.log("  PUT    /tasks/:id");
  console.log("  DELETE /tasks/:id");
  console.log("  DELETE /tasks");
});
