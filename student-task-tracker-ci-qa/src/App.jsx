import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "student-task-tracker.tasks";
const filters = ["All", "Active", "Completed"];

function loadTasks() {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    return savedTasks ? JSON.parse(savedTasks) : [];
  } catch {
    return [];
  }
}

function createTask(title) {
  return {
    id: crypto.randomUUID(),
    title,
    completed: false
  };
}

export default function App() {
  const [tasks, setTasks] = useState(loadTasks);
  const [taskTitle, setTaskTitle] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const summary = useMemo(() => {
    const completed = tasks.filter((task) => task.completed).length;
    return {
      total: tasks.length,
      completed,
      active: tasks.length - completed
    };
  }, [tasks]);

  const visibleTasks = tasks.filter((task) => {
    if (filter === "Active") {
      return !task.completed;
    }

    if (filter === "Completed") {
      return task.completed;
    }

    return true;
  });

  function addTask(event) {
    event.preventDefault();
    const title = taskTitle.trim();

    if (!title) {
      return;
    }

    setTasks((currentTasks) => [...currentTasks, createTask(title)]);
    setTaskTitle("");
  }

  function toggleTask(id) {
    setTasks((currentTasks) =>
      currentTasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    );
  }

  function deleteTask(id) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
  }

  return (
    <main className="app-shell">
      <section className="tracker" aria-labelledby="app-title">
        <header className="hero">
          <p className="eyebrow">Git + CI + QA Practice</p>
          <h1 id="app-title">Student Task Tracker</h1>
          <p>
            Track study tasks while practicing branches, pull requests, automated tests, and linting.
          </p>
        </header>

        <form className="task-form" onSubmit={addTask}>
          <label htmlFor="task-input">New study task</label>
          <div className="task-entry">
            <input
              id="task-input"
              value={taskTitle}
              onChange={(event) => setTaskTitle(event.target.value)}
              placeholder="Example: Revise biology notes"
            />
            <button type="submit">Add task</button>
          </div>
        </form>

        <section className="summary" aria-label="Task summary">
          <article>
            <span>Total</span>
            <strong>{summary.total}</strong>
          </article>
          <article>
            <span>Active</span>
            <strong>{summary.active}</strong>
          </article>
          <article>
            <span>Completed</span>
            <strong>{summary.completed}</strong>
          </article>
        </section>

        <nav className="filters" aria-label="Task filters">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              className={filter === item ? "active" : ""}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </nav>

        <section className="task-panel" aria-live="polite">
          {visibleTasks.length === 0 ? (
            <p className="empty-state">No tasks to show. Add a study task to get started.</p>
          ) : (
            <ul className="task-list">
              {visibleTasks.map((task) => (
                <li key={task.id} className={task.completed ? "completed" : ""}>
                  <label>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                    />
                    <span>{task.title}</span>
                  </label>
                  <button type="button" className="delete-button" onClick={() => deleteTask(task.id)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </section>
    </main>
  );
}
