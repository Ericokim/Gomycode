import { useState } from "react";
import Filter from "./components/Filter";
import MovieList from "./components/MovieList";

const initialMovies = [
  {
    title: "Inception",
    description:
      "A skilled thief enters dreams to steal secrets and plant an idea.",
    posterURL:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=900&q=80",
    rating: 5,
  },
  {
    title: "Breaking Bad",
    description:
      "A chemistry teacher turns to crime after a life-changing diagnosis.",
    posterURL:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80",
    rating: 4,
  },
  {
    title: "Interstellar",
    description:
      "A team of explorers travels through a wormhole to save humanity.",
    posterURL:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=900&q=80",
    rating: 5,
  },
];

function App() {
  const [movies, setMovies] = useState(initialMovies);
  const [filters, setFilters] = useState({ title: "", rating: "" });
  const [newMovie, setNewMovie] = useState({
    title: "",
    description: "",
    posterURL: "",
    rating: "",
  });

  const filteredMovies = movies.filter((movie) => {
    const matchesTitle = movie.title
      .toLowerCase()
      .includes(filters.title.trim().toLowerCase());
    const minimumRating = Number(filters.rating || 0);

    return matchesTitle && Number(movie.rating) >= minimumRating;
  });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;

    setFilters((currentFilters) => ({
      ...currentFilters,
      [name]: value,
    }));
  };

  const handleNewMovieChange = (event) => {
    const { name, value } = event.target;

    setNewMovie((currentMovie) => ({
      ...currentMovie,
      [name]: value,
    }));
  };

  const handleAddMovie = (event) => {
    event.preventDefault();

    if (
      !newMovie.title.trim() ||
      !newMovie.description.trim() ||
      !newMovie.posterURL.trim() ||
      !newMovie.rating
    ) {
      return;
    }

    setMovies((currentMovies) => [
      {
        ...newMovie,
        title: newMovie.title.trim(),
        description: newMovie.description.trim(),
        posterURL: newMovie.posterURL.trim(),
        rating: Number(newMovie.rating),
      },
      ...currentMovies,
    ]);

    setNewMovie({
      title: "",
      description: "",
      posterURL: "",
      rating: "",
    });
  };

  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <div className={styles.hero}>
          <p className={styles.eyebrow}>React Hooks Checkpoint</p>
          <h1 className={styles.title}>Movie Hub</h1>
          <p className={styles.subtitle}>
            Add your favorite movies or shows and filter them by title or
            rating.
          </p>
        </div>

        <Filter filters={filters} onFilterChange={handleFilterChange} />

        <section className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Add a new movie</h2>
            <p className={styles.sectionText}>
              Fill in all fields to add a movie card to the list.
            </p>
          </div>

          <form className={styles.form} onSubmit={handleAddMovie}>
            <input
              className={styles.input}
              type="text"
              name="title"
              placeholder="Movie title"
              value={newMovie.title}
              onChange={handleNewMovieChange}
            />
            <input
              className={styles.input}
              type="text"
              name="posterURL"
              placeholder="Poster URL"
              value={newMovie.posterURL}
              onChange={handleNewMovieChange}
            />
            <input
              className={styles.input}
              type="number"
              name="rating"
              min="0"
              max="5"
              placeholder="Rating"
              value={newMovie.rating}
              onChange={handleNewMovieChange}
            />
            <textarea
              className={styles.textarea}
              name="description"
              placeholder="Movie description"
              value={newMovie.description}
              onChange={handleNewMovieChange}
              rows="4"
            />
            <button className={styles.button} type="submit">
              Add Movie
            </button>
          </form>
        </section>

        <MovieList movies={filteredMovies} />
      </section>
    </main>
  );
}

export default App;

const styles = {
  page: "min-h-screen bg-[#f5efe6] px-4 py-10 text-slate-900",
  container: "mx-auto flex w-full max-w-6xl flex-col gap-8",
  hero: "rounded-3xl bg-slate-900 px-6 py-8 text-white sm:px-8",
  eyebrow:
    "mb-3 inline-flex w-fit rounded-full bg-amber-300 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-900",
  title: "text-4xl font-bold sm:text-5xl",
  subtitle: "mt-3 max-w-2xl text-sm text-slate-200 sm:text-base",
  formSection: "rounded-3xl bg-white p-6 ring-1 ring-slate-200",
  sectionHeader: "mb-4",
  sectionTitle: "text-2xl font-bold text-slate-900",
  sectionText: "mt-1 text-sm text-slate-600",
  form: "grid gap-4 md:grid-cols-2",
  input:
    "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-900 focus:bg-white",
  textarea:
    "md:col-span-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-900 focus:bg-white",
  button:
    "md:col-span-2 inline-flex items-center justify-center rounded-2xl bg-amber-400 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-amber-300",
};
