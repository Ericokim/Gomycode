export const priorities = ["Low", "Medium", "High", "Critical"];

export function createTask(id) {
  return {
    id,
    name: `Task ${id}`,
    priority: priorities[id % priorities.length]
  };
}

export function createTasks(count) {
  return Array.from({ length: count }, (_, index) => createTask(index + 1));
}

export function mutateFirstTasks(tasks, count = 50) {
  return tasks.map((task, index) => {
    if (index >= count) {
      return task;
    }

    return {
      ...task,
      name: `${task.name} - updated`,
      priority: priorities[(priorities.indexOf(task.priority) + 1) % priorities.length]
    };
  });
}

export function removeFirstTasks(tasks, count = 50) {
  return tasks.slice(count);
}

export function readMemoryMB() {
  if (performance.memory?.usedJSHeapSize) {
    return Number((performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(2));
  }

  return "N/A";
}

export function afterPaint() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(resolve);
    });
  });
}
