import { useDispatch } from "react-redux";
import { setFilter } from "../features/tasks/tasksSlice";
import Task from "./Task";

const filterOptions = [
  { label: "All", value: "all" },
  { label: "Done", value: "done" },
  { label: "Not Done", value: "notDone" },
];

function ListTask({ tasks, filter }) {
  const dispatch = useDispatch();

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Your tasks</h2>
          <p className={styles.text}>
            Filter by status, mark tasks done, or open a task to edit it.
          </p>
        </div>

        <div className={styles.filters}>
          {filterOptions.map((option) => (
            <button
              key={option.value}
              className={`${styles.filterButton} ${
                filter === option.value ? styles.activeFilterButton : ""
              }`}
              type="button"
              onClick={() => dispatch(setFilter(option.value))}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyTitle}>No tasks in this view</p>
          <p className={styles.emptyText}>
            Change the filter or add a new task to keep working.
          </p>
        </div>
      ) : (
        <div className={styles.list}>
          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </div>
      )}
    </section>
  );
}

const styles = {
  wrapper: "rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-200",
  header: "mb-5 flex flex-col gap-4",
  title: "text-2xl font-bold text-slate-900",
  text: "mt-1 text-sm text-slate-600",
  filters: "flex flex-wrap gap-2",
  filterButton:
    "inline-flex items-center justify-center rounded-2xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100",
  activeFilterButton: "border-slate-900 bg-slate-900 text-white hover:bg-slate-900",
  emptyState:
    "rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center",
  emptyTitle: "text-lg font-semibold text-slate-900",
  emptyText: "mt-2 text-sm text-slate-600",
  list: "space-y-4",
};

export default ListTask;
