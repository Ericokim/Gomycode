import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addTask,
  cancelEditingTask,
  updateTask,
} from "../features/tasks/tasksSlice";

function Addtask({ taskBeingEdited }) {
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setDescription(taskBeingEdited ? taskBeingEdited.description : "");
    setError("");
  }, [taskBeingEdited]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedDescription = description.trim();

    if (!trimmedDescription) {
      setError("Task description is required.");
      return;
    }

    if (taskBeingEdited) {
      dispatch(
        updateTask({
          id: taskBeingEdited.id,
          description: trimmedDescription,
        })
      );
      return;
    }

    dispatch(addTask({ description: trimmedDescription }));
    setDescription("");
    setError("");
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          {taskBeingEdited ? "Edit task" : "Add a new task"}
        </h2>
        <p className={styles.text}>
          {taskBeingEdited
            ? "Update the task description and save your changes."
            : "Write a clear task description, then add it to the Redux store."}
        </p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <label className={styles.field}>
          <span className={styles.label}>Task description</span>
          <textarea
            className={`${styles.textarea} ${error ? styles.inputError : ""}`}
            name="description"
            placeholder="Build the Redux todo application."
            rows="6"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
              setError("");
            }}
          />
          {error ? <span className={styles.error}>{error}</span> : null}
        </label>

        <div className={styles.actions}>
          <button className={styles.primaryButton} type="submit">
            {taskBeingEdited ? "Save Changes" : "Add Task"}
          </button>
          {taskBeingEdited ? (
            <button
              className={styles.secondaryButton}
              type="button"
              onClick={() => dispatch(cancelEditingTask())}
            >
              Cancel
            </button>
          ) : null}
        </div>
      </form>
    </section>
  );
}

const styles = {
  wrapper: "rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-200",
  header: "mb-5",
  title: "text-2xl font-bold text-slate-900",
  text: "mt-1 text-sm text-slate-600",
  form: "space-y-4",
  field: "block",
  label: "mb-2 block text-sm font-semibold text-slate-700",
  textarea:
    "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white",
  inputError: "border-rose-400 bg-rose-50 focus:border-rose-500",
  error: "mt-2 block text-sm text-rose-600",
  actions: "flex flex-wrap gap-3 pt-2",
  primaryButton:
    "inline-flex items-center justify-center rounded-2xl bg-amber-400 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-amber-300",
  secondaryButton:
    "inline-flex items-center justify-center rounded-2xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100",
};

export default Addtask;
