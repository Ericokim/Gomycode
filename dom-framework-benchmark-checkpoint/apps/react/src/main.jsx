import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "../../../shared/styles.css";
import {
  afterPaint,
  createTask,
  createTasks,
  mutateFirstTasks,
  priorities,
  readMemoryMB,
  removeFirstTasks
} from "../../../shared/tasks.js";

function ReactBenchmarkApp() {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [metrics, setMetrics] = useState({
    render: "-",
    update: "-",
    deletion: "-",
    memory: readMemoryMB()
  });

  async function measure(label, operation) {
    const start = performance.now();
    operation();
    await afterPaint();
    const duration = Number((performance.now() - start).toFixed(2));
    setMetrics((current) => ({
      ...current,
      [label]: duration,
      memory: readMemoryMB()
    }));
    return duration;
  }

  function addTask(event) {
    event.preventDefault();
    const trimmedName = name.trim();

    if (!trimmedName) {
      return;
    }

    setTasks((current) => [
      ...current,
      {
        id: Date.now(),
        name: trimmedName,
        priority
      }
    ]);
    setName("");
  }

  function editTask(id, patch) {
    setTasks((current) => current.map((task) => (task.id === id ? { ...task, ...patch } : task)));
  }

  function removeTask(id) {
    setTasks((current) => current.filter((task) => task.id !== id));
  }

  async function renderTasks(count) {
    await measure("render", () => setTasks(createTasks(count)));
  }

  async function updateFifty() {
    await measure("update", () => setTasks((current) => mutateFirstTasks(current, 50)));
  }

  async function deleteFifty() {
    await measure("deletion", () => setTasks((current) => removeFirstTasks(current, 50)));
  }

  return (
    <main className="app-shell">
      <section className="workspace">
        <header className="header">
          <div>
            <h1>React DOM Benchmark</h1>
            <p>Todo list using React components, state, keyed rows, and immutable updates.</p>
          </div>
          <button onClick={() => setTasks([])} className="secondary">Clear</button>
        </header>

        <form className="panel controls" onSubmit={addTask}>
          <label>
            Task name
            <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Add a task" />
          </label>
          <label>
            Priority
            <select value={priority} onChange={(event) => setPriority(event.target.value)}>
              {priorities.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <button>Add task</button>
        </form>

        <section className="panel bench-controls">
          {[100, 500, 1000].map((count) => (
            <button key={count} className="secondary" onClick={() => renderTasks(count)}>
              Render {count}
            </button>
          ))}
          <button className="secondary" onClick={updateFifty} disabled={tasks.length < 50}>Update 50</button>
          <button className="danger" onClick={deleteFifty} disabled={tasks.length < 50}>Delete 50</button>
        </section>

        <section className="panel metrics">
          <div className="metric"><span>Tasks</span><strong>{tasks.length}</strong></div>
          <div className="metric"><span>Render ms</span><strong>{metrics.render}</strong></div>
          <div className="metric"><span>Update ms</span><strong>{metrics.update}</strong></div>
          <div className="metric"><span>Delete ms</span><strong>{metrics.deletion}</strong></div>
        </section>

        <section className="panel">
          <div className="task-list">
            {tasks.length === 0 && <p className="empty">No tasks yet.</p>}
            {tasks.map((task) => (
              <article className="task-row" key={task.id}>
                <input value={task.name} onChange={(event) => editTask(task.id, { name: event.target.value })} />
                <select value={task.priority} onChange={(event) => editTask(task.id, { priority: event.target.value })}>
                  {priorities.map((item) => <option key={item}>{item}</option>)}
                </select>
                <button className="danger" onClick={() => removeTask(task.id)}>Remove</button>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<ReactBenchmarkApp />);
