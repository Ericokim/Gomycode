import { useDispatch } from "react-redux";
import {
  startEditingTask,
  toggleTaskStatus,
} from "../features/tasks/tasksSlice";

function Task({ task }) {
  const dispatch = useDispatch();

  return (
    <article
      className={`${styles.card} ${
        task.isDone ? styles.completedCard : styles.activeCard
      }`}
    >
      <div className={styles.topRow}>
        <label className={styles.checkboxLabel}>
          <input
            className={styles.checkbox}
            type="checkbox"
            checked={task.isDone}
            onChange={() => dispatch(toggleTaskStatus(task.id))}
          />
          <span className={styles.checkboxText}>
            {task.isDone ? "Completed" : "Active"}
          </span>
        </label>

        <span
          className={`${styles.badge} ${
            task.isDone ? styles.completedBadge : styles.activeBadge
          }`}
        >
          {task.isDone ? "Done" : "Not Done"}
        </span>
      </div>

      <div className={styles.content}>
        <p className={styles.idLabel}>Task ID: {task.id}</p>
        <p
          className={`${styles.description} ${
            task.isDone ? styles.completedText : ""
          }`}
        >
          {task.description}
        </p>
      </div>

      <div className={styles.actions}>
        <button
          className={styles.editButton}
          type="button"
          onClick={() => dispatch(startEditingTask(task.id))}
        >
          Edit
        </button>
      </div>
    </article>
  );
}

const styles = {
  card: "rounded-3xl border px-5 py-5 transition-shadow hover:shadow-md",
  activeCard: "border-slate-200 bg-slate-50",
  completedCard: "border-emerald-200 bg-emerald-50/70",
  topRow: "flex flex-wrap items-center justify-between gap-3",
  checkboxLabel: "inline-flex items-center gap-3",
  checkbox: "h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900",
  checkboxText: "text-sm font-medium text-slate-700",
  badge:
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]",
  activeBadge: "bg-amber-200 text-amber-950",
  completedBadge: "bg-emerald-200 text-emerald-900",
  content: "mt-4",
  idLabel: "text-xs font-semibold uppercase tracking-[0.16em] text-slate-500",
  description: "mt-2 text-sm leading-6 text-slate-700",
  completedText: "text-slate-500 line-through",
  actions: "mt-5 flex flex-wrap gap-3",
  editButton:
    "inline-flex items-center justify-center rounded-2xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white",
};

export default Task;
