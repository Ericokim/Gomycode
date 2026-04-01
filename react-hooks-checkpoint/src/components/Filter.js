function Filter({ filters, onFilterChange }) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Filter Movies</h2>
        <p className={styles.text}>Search by title or minimum rating.</p>
      </div>

      <div className={styles.fields}>
        <input
          className={styles.input}
          type="text"
          name="title"
          placeholder="Search by title"
          value={filters.title}
          onChange={onFilterChange}
        />
        <input
          className={styles.input}
          type="number"
          name="rating"
          min="0"
          max="5"
          placeholder="Minimum rating"
          value={filters.rating}
          onChange={onFilterChange}
        />
      </div>
    </section>
  );
}

export default Filter;

const styles = {
  section:
    'rounded-3xl bg-white p-6  ring-1 ring-slate-200',
  header: 'mb-4',
  title: 'text-2xl font-bold text-slate-900',
  text: 'mt-1 text-sm text-slate-600',
  fields: 'grid gap-4 md:grid-cols-2',
  input:
    'w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-900 focus:bg-white',
};
