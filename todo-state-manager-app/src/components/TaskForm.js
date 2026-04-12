import { useState } from "react";

const emptyForm = {
  name: "",
  description: "",
};

function getInitialFormValues(initialValues) {
  if (!initialValues) {
    return emptyForm;
  }

  return {
    name: initialValues.name,
    description: initialValues.description,
  };
}

function TaskForm({
  initialValues,
  onSubmit,
  onCancel,
  submitLabel,
  title,
  description,
  isEditing,
}) {
  // Keep add and edit field handling in one small reusable form component.
  const [formValues, setFormValues] = useState(getInitialFormValues(initialValues));
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedValues = {
      name: formValues.name.trim(),
      description: formValues.description.trim(),
    };
    const nextErrors = {};

    if (!trimmedValues.name) {
      nextErrors.name = "Task name is required.";
    }

    if (!trimmedValues.description) {
      nextErrors.description = "Task description is required.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    onSubmit(
      initialValues
        ? { ...initialValues, ...trimmedValues }
        : trimmedValues
    );

    if (!initialValues) {
      setFormValues(emptyForm);
    }

    setErrors({});
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.text}>{description}</p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <label className={styles.field}>
          <span className={styles.label}>Task name</span>
          <input
            className={`${styles.input} ${
              errors.name ? styles.inputError : ""
            }`}
            type="text"
            name="name"
            placeholder="Plan project setup"
            value={formValues.name}
            onChange={handleChange}
          />
          {errors.name ? <span className={styles.error}>{errors.name}</span> : null}
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Description</span>
          <textarea
            className={`${styles.textarea} ${
              errors.description ? styles.inputError : ""
            }`}
            name="description"
            placeholder="Write the smallest possible next step."
            rows="5"
            value={formValues.description}
            onChange={handleChange}
          />
          {errors.description ? (
            <span className={styles.error}>{errors.description}</span>
          ) : null}
        </label>

        <div className={styles.actions}>
          <button className={styles.primaryButton} type="submit">
            {submitLabel}
          </button>
          {isEditing ? (
            <button
              className={styles.secondaryButton}
              type="button"
              onClick={onCancel}
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
  input:
    "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white",
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

export default TaskForm;
