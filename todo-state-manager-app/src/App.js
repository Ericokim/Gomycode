import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const STORAGE_KEY = "todo-state-manager-app.tasks";

function loadTasks() {
  // Read saved tasks once when the app starts.
  try {
    const savedTasks = window.localStorage.getItem(STORAGE_KEY);

    if (!savedTasks) {
      return [];
    }

    const parsedTasks = JSON.parse(savedTasks);

    return Array.isArray(parsedTasks) ? parsedTasks : [];
  } catch (error) {
    return [];
  }
}

function App() {
  const [tasks, setTasks] = useState(loadTasks);
  const [taskBeingEdited, setTaskBeingEdited] = useState(null);

  useEffect(() => {
    // Keep browser storage in sync with the latest task list.
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (taskData) => {
    // Add the new task at the top so recent work stays visible.
    setTasks((currentTasks) => [
      {
        id: Date.now(),
        name: taskData.name,
        description: taskData.description,
        completed: false,
      },
      ...currentTasks,
    ]);
  };

  const handleStartEditing = (taskId) => {
    const selectedTask = tasks.find((task) => task.id === taskId) || null;

    setTaskBeingEdited(selectedTask);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
      )
    );
    setTaskBeingEdited(null);
  };

  const handleToggleTask = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    const taskToDelete = tasks.find((task) => task.id === taskId);

    if (!taskToDelete) {
      return;
    }

    const confirmed = window.confirm(
      `Delete "${taskToDelete.name}" from your task list?`
    );

    if (!confirmed) {
      return;
    }

    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));

    if (taskBeingEdited?.id === taskId) {
      setTaskBeingEdited(null);
    }
  };

  const completedTasks = tasks.filter((task) => task.completed).length;
  const activeTasks = tasks.length - completedTasks;

  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>Checkpoint Managing State In React</p>
          <h1 className={styles.title}>Task Flow</h1>
          <p className={styles.subtitle}>
            A simple to-do list app with validation, editing, completion
            tracking, delete confirmation, and local storage persistence.
          </p>
          <div className={styles.statsGrid}>
            <article className={styles.statCard}>
              <span className={styles.statLabel}>Total Tasks</span>
              <strong className={styles.statValue}>{tasks.length}</strong>
            </article>
            <article className={styles.statCard}>
              <span className={styles.statLabel}>Active</span>
              <strong className={styles.statValue}>{activeTasks}</strong>
            </article>
            <article className={styles.statCard}>
              <span className={styles.statLabel}>Completed</span>
              <strong className={styles.statValue}>{completedTasks}</strong>
            </article>
          </div>
        </header>

        <section className={styles.contentGrid}>
          <TaskForm
            key={taskBeingEdited ? taskBeingEdited.id : "new-task"}
            initialValues={taskBeingEdited}
            onSubmit={taskBeingEdited ? handleUpdateTask : handleAddTask}
            onCancel={() => setTaskBeingEdited(null)}
            submitLabel={taskBeingEdited ? "Update Task" : "Add Task"}
            title={taskBeingEdited ? "Edit task" : "Add a new task"}
            description={
              taskBeingEdited
                ? "Update the task name and description, then save your changes."
                : "Fill in both fields before adding a task to the list."
            }
            isEditing={Boolean(taskBeingEdited)}
          />

          <TaskList
            tasks={tasks}
            onDeleteTask={handleDeleteTask}
            onEditTask={handleStartEditing}
            onToggleTask={handleToggleTask}
          />
        </section>
      </section>
    </main>
  );
}

const styles = {
  page: "min-h-screen bg-[#f5efe6] px-4 py-10 text-slate-900",
  container: "mx-auto flex w-full max-w-6xl flex-col gap-8",
  hero: "rounded-3xl bg-slate-900 px-6 py-8 text-white shadow-xl sm:px-8",
  eyebrow:
    "mb-3 inline-flex w-fit rounded-full bg-amber-300 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-900",
  title: "text-4xl font-bold sm:text-5xl",
  subtitle: "mt-3 max-w-3xl text-sm text-slate-200 sm:text-base",
  statsGrid: "mt-6 grid gap-4 sm:grid-cols-3",
  statCard:
    "rounded-2xl bg-white/10 px-4 py-4 ring-1 ring-white/10 backdrop-blur",
  statLabel: "text-xs uppercase tracking-[0.18em] text-slate-200",
  statValue: "mt-2 block text-3xl font-bold text-white",
  contentGrid: "grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]",
};

export default App;
