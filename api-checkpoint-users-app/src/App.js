import UserList from "./UserList";

function App() {
  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>API Checkpoint</p>
          <h1 className={styles.title}>JSONPlaceholder Users</h1>
          <p className={styles.subtitle}>
            A simple React app that uses axios, useEffect, and useState to load
            and display users from a public API.
          </p>
        </header>

        <UserList />
      </section>
    </main>
  );
}

const styles = {
  page: "min-h-screen bg-[#f5efe6] px-4 py-10 text-slate-900",
  container: "mx-auto flex w-full max-w-6xl flex-col gap-8",
  hero: "rounded-3xl bg-slate-900 px-6 py-8 text-white shadow-xl sm:px-8",
  eyebrow:
    "mb-3 inline-flex w-fit rounded-full bg-amber-300 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-900",
  title: "text-4xl font-bold sm:text-5xl",
  subtitle: "mt-3 max-w-3xl text-sm text-slate-200 sm:text-base",
};

export default App;
