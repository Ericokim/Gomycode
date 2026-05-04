let tasks = [];
let nextId = 1;

function getAllTasks() {
  return tasks;
}

function getTaskById(id) {
  return tasks.find((task) => task.id === id) || null;
}

function createTask({ title, completed = false }) {
  const task = {
    id: nextId,
    title: title.trim(),
    completed,
  };

  nextId += 1;
  tasks.push(task);
  return task;
}

function updateTask(id, updates) {
  const task = getTaskById(id);
  if (!task) return null;

  if (updates.title !== undefined) task.title = updates.title.trim();
  if (updates.completed !== undefined) task.completed = updates.completed;

  return task;
}

function deleteTask(id) {
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) return false;

  tasks.splice(index, 1);
  return true;
}

function deleteAllTasks() {
  tasks = [];
  nextId = 1;
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  deleteAllTasks,
};
