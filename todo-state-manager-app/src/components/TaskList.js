import TaskItem from "./TaskItem";

function TaskList({ tasks, onDeleteTask, onEditTask, onToggleTask }) {
  // Render the list state and fallback message in one place.
  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>Your tasks</h2>
        <p className={styles.text}>
          Click a task card to edit it, use the checkbox to mark it complete,
          or remove it when it is no longer needed.
        </p>
      </div>

      {tasks.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyTitle}>No tasks yet</p>
          <p className={styles.emptyText}>
            Add your first task using the form to start building the list.
          </p>
        </div>
      ) : (
        <div className={styles.list}>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDeleteTask={onDeleteTask}
              onEditTask={onEditTask}
              onToggleTask={onToggleTask}
            />
          ))}
        </div>
      )}
    </section>
  );
}

const styles = {
  wrapper: "rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-200",
  header: "mb-5",
  title: "text-2xl font-bold text-slate-900",
  text: "mt-1 text-sm text-slate-600",
  emptyState:
    "rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center",
  emptyTitle: "text-lg font-semibold text-slate-900",
  emptyText: "mt-2 text-sm text-slate-600",
  list: "space-y-4",
};

export default TaskList;
