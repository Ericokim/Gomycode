function TaskItem({ task, onDeleteTask, onEditTask, onToggleTask }) {
  // Keep task-level actions isolated so the list stays simple.
  return (
    <article
      className={`${styles.card} ${
        task.completed ? styles.completedCard : styles.activeCard
      }`}
    >
      <div className={styles.topRow}>
        <label className={styles.checkboxLabel}>
          <input
            className={styles.checkbox}
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleTask(task.id)}
          />
          <span className={styles.checkboxText}>
            {task.completed ? "Completed" : "Active"}
          </span>
        </label>

        <span
          className={`${styles.badge} ${
            task.completed ? styles.completedBadge : styles.activeBadge
          }`}
        >
          {task.completed ? "Done" : "In Progress"}
        </span>
      </div>

      <button
        className={styles.contentButton}
        type="button"
        onClick={() => onEditTask(task.id)}
      >
        <h3
          className={`${styles.name} ${
            task.completed ? styles.completedText : ""
          }`}
        >
          {task.name}
        </h3>
        <p
          className={`${styles.description} ${
            task.completed ? styles.completedText : ""
          }`}
        >
          {task.description}
        </p>
      </button>

      <div className={styles.actions}>
        <button
          className={styles.editButton}
          type="button"
          onClick={() => onEditTask(task.id)}
        >
          Edit
        </button>
        <button
          className={styles.deleteButton}
          type="button"
          onClick={() => onDeleteTask(task.id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

const styles = {
  card:
    "rounded-3xl border px-5 py-5 transition-shadow hover:shadow-md",
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
  contentButton: "mt-4 block w-full text-left",
  name: "text-xl font-bold text-slate-900",
  description: "mt-2 text-sm leading-6 text-slate-700",
  completedText: "text-slate-500 line-through",
  actions: "mt-5 flex flex-wrap gap-3",
  editButton:
    "inline-flex items-center justify-center rounded-2xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white",
  deleteButton:
    "inline-flex items-center justify-center rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700",
};

export default TaskItem;
