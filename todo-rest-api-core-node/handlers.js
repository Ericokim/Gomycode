const tasks = require("./tasks");

function sendJSON(res, statusCode, data, headers = {}) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    ...headers,
  });
  res.end(JSON.stringify(data));
}

function parseBody(req) {
  return new Promise((resolve) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        resolve(null);
      }
    });
  });
}

function validateTitle(title, required = false) {
  if (title === undefined) return required ? "Title is required" : null;
  if (typeof title !== "string" || title.trim() === "") return "Title must be a non-empty string";
  return null;
}

function validateCompleted(completed) {
  if (completed === undefined) return null;
  if (typeof completed !== "boolean") return "Completed must be a boolean";
  return null;
}

function sendMethodNotAllowed(res, allowedMethods) {
  sendJSON(
    res,
    405,
    { success: false, message: "Method not allowed" },
    { Allow: allowedMethods.join(", ") }
  );
}

function getTasks(req, res) {
  sendJSON(res, 200, { success: true, data: tasks.getAllTasks() });
}

function getTask(req, res, id) {
  const task = tasks.getTaskById(Number(id));
  if (!task) {
    sendJSON(res, 404, { success: false, message: "Task not found" });
    return;
  }

  sendJSON(res, 200, { success: true, data: task });
}

async function createTaskHandler(req, res) {
  const body = await parseBody(req);
  if (!body) {
    sendJSON(res, 400, { success: false, message: "Invalid JSON" });
    return;
  }

  const titleError = validateTitle(body.title, true);
  const completedError = validateCompleted(body.completed);
  if (titleError || completedError) {
    sendJSON(res, 400, { success: false, message: titleError || completedError });
    return;
  }

  const task = tasks.createTask({
    title: body.title,
    completed: body.completed ?? false,
  });
  sendJSON(res, 201, { success: true, data: task });
}

async function updateTaskHandler(req, res, id) {
  const body = await parseBody(req);
  if (!body) {
    sendJSON(res, 400, { success: false, message: "Invalid JSON" });
    return;
  }

  const titleError = validateTitle(body.title);
  const completedError = validateCompleted(body.completed);
  if (titleError || completedError) {
    sendJSON(res, 400, { success: false, message: titleError || completedError });
    return;
  }

  const task = tasks.updateTask(Number(id), body);
  if (!task) {
    sendJSON(res, 404, { success: false, message: "Task not found" });
    return;
  }

  sendJSON(res, 200, { success: true, data: task });
}

function deleteTaskHandler(req, res, id) {
  const deleted = tasks.deleteTask(Number(id));
  if (!deleted) {
    sendJSON(res, 404, { success: false, message: "Task not found" });
    return;
  }

  sendJSON(res, 200, { success: true, message: "Task deleted" });
}

function deleteAllHandler(req, res) {
  tasks.deleteAllTasks();
  sendJSON(res, 200, { success: true, message: "All tasks deleted" });
}

module.exports = {
  sendJSON,
  sendMethodNotAllowed,
  getTasks,
  getTask,
  createTaskHandler,
  updateTaskHandler,
  deleteTaskHandler,
  deleteAllHandler,
};
