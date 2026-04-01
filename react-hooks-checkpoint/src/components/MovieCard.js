function MovieCard({ movie }) {
  return (
    <article className={styles.card}>
      <img className={styles.poster} src={movie.posterURL} alt={movie.title} />
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{movie.title}</h3>
          <span className={styles.rating}>Rating: {movie.rating}</span>
        </div>
        <p className={styles.description}>{movie.description}</p>
      </div>
    </article>
  );
}

export default MovieCard;

const styles = {
  card: "overflow-hidden rounded-3xl bg-white ring-1 ring-slate-200",
  poster: "h-72 w-full object-cover",
  content: "flex flex-col gap-3 p-5",
  header: "flex items-start justify-between gap-3",
  title: "text-xl font-bold text-slate-900",
  rating:
    "rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900",
  description: "text-sm leading-6 text-slate-600",
};
