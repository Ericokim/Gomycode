import { useSelector } from "react-redux";
import Addtask from "./components/Addtask";
import ListTask from "./components/ListTask";

function App() {
  const tasks = useSelector((state) => state.tasks.items);
  const filter = useSelector((state) => state.tasks.filter);
  const editingTaskId = useSelector((state) => state.tasks.editingTaskId);
  const editingTask = tasks.find((task) => task.id === editingTaskId) || null;
  const completedTasks = tasks.filter((task) => task.isDone).length;
  const activeTasks = tasks.length - completedTasks;
  const filteredTasks = tasks.filter((task) => {
    if (filter === "done") {
      return task.isDone;
    }

    if (filter === "notDone") {
      return !task.isDone;
    }

    return true;
  });

  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>Front End Development Redux</p>
          <h1 className={styles.title}>Redux Task Flow</h1>
          <p className={styles.subtitle}>
            A simple Redux checkpoint app with global task state, filtering,
            and editing while keeping the same visual direction as the
            reference project.
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
          <Addtask taskBeingEdited={editingTask} />
          <ListTask tasks={filteredTasks} filter={filter} />
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
