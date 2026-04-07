import { Link, useParams } from "react-router-dom";

function MovieDetails({ movies }) {
  const { movieId } = useParams();
  const movie = movies.find((currentMovie) => String(currentMovie.id) === movieId);

  if (!movie) {
    return (
      <main className={styles.page}>
        <section className={styles.container}>
          <Link className={styles.backButton} to="/">
            Back to home
          </Link>
          <section className={styles.card}>
            <h1 className={styles.title}>Movie not found</h1>
            <p className={styles.description}>
              The selected movie does not exist in the current list.
            </p>
          </section>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <Link className={styles.backButton} to="/">
          Back to home
        </Link>

        <section className={styles.card}>
          <img className={styles.poster} src={movie.posterURL} alt={movie.title} />

          <div className={styles.content}>
            <div className={styles.header}>
              <h1 className={styles.title}>{movie.title}</h1>
              <span className={styles.rating}>Rating: {movie.rating}</span>
            </div>

            <p className={styles.description}>{movie.description}</p>

            <div className={styles.trailerSection}>
              <h2 className={styles.trailerTitle}>Trailer</h2>
              <div className={styles.videoWrapper}>
                <iframe
                  className={styles.video}
                  src={movie.trailerLink}
                  title={`${movie.title} trailer`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

export default MovieDetails;

const styles = {
  page: "min-h-screen bg-[#f5efe6] px-4 py-10 text-slate-900",
  container: "mx-auto flex w-full max-w-5xl flex-col gap-6",
  backButton:
    "inline-flex w-fit items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700",
  card: "grid gap-6 rounded-3xl bg-white p-6 ring-1 ring-slate-200 md:grid-cols-[280px_1fr]",
  poster: "h-full w-full rounded-3xl object-cover",
  content: "flex flex-col gap-5",
  header: "flex flex-wrap items-start justify-between gap-3",
  title: "text-3xl font-bold text-slate-900",
  rating:
    "rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900",
  description: "text-base leading-7 text-slate-600",
  trailerSection: "flex flex-col gap-3",
  trailerTitle: "text-xl font-bold text-slate-900",
  videoWrapper: "overflow-hidden rounded-3xl bg-slate-950",
  video: "aspect-video w-full border-0",
};
