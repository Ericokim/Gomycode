import MovieCard from './MovieCard';

function MovieList({ movies }) {
  if (movies.length === 0) {
    return (
      <section className={styles.emptyState}>
        <h2 className={styles.emptyTitle}>No movies found</h2>
        <p className={styles.emptyText}>
          Try a different title or rating filter, or add a new movie.
        </p>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Movie List</h2>
        <p className={styles.text}>{movies.length} result(s)</p>
      </div>

      <div className={styles.grid}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}

export default MovieList;

const styles = {
  section: 'flex flex-col gap-4',
  header: 'flex items-center justify-between gap-3',
  title: 'text-2xl font-bold text-slate-900',
  text: 'text-sm text-slate-600',
  grid: 'grid gap-6 md:grid-cols-2 xl:grid-cols-3',
  emptyState:
    'rounded-3xl border border-dashed border-slate-300 bg-white/80 p-8 text-center',
  emptyTitle: 'text-2xl font-bold text-slate-900',
  emptyText: 'mt-2 text-sm text-slate-600',
};
