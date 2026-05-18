const express = require("express");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const verifyToken = require("../middleware/auth");
const { tasks } = require("../data");

const router = express.Router();

router.use(verifyToken);

router.post("/", catchAsync(async (req, res, next) => {
  const { title, description } = req.body;

  if (!title) {
    return next(new AppError("Task title is required.", 400));
  }

  const task = {
    id: String(tasks.length + 1),
    ownerId: req.user.id,
    title,
    description: description || "",
    createdAt: new Date().toISOString()
  };

  tasks.push(task);

  return res.status(201).json({
    status: "success",
    data: task
  });
}));

router.get("/", catchAsync(async (req, res) => {
  const userTasks = tasks.filter((task) => task.ownerId === req.user.id);

  return res.status(200).json({
    status: "success",
    results: userTasks.length,
    data: userTasks
  });
}));

router.delete("/:id", catchAsync(async (req, res, next) => {
  const taskIndex = tasks.findIndex((task) => task.id === req.params.id);

  if (taskIndex === -1) {
    return next(new AppError("Task not found.", 404));
  }

  if (tasks[taskIndex].ownerId !== req.user.id) {
    return next(new AppError("You can only delete your own tasks.", 403));
  }

  tasks.splice(taskIndex, 1);
  return res.status(204).send();
}));

module.exports = router;
