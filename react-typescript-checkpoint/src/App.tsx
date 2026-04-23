import "./App.css";
import Counter from "./components/Counter";
import Greeting from "./components/Greeting";

function App() {
  return (
    <main className="app-shell">
      <section className="hero">
        <p className="eyebrow">Checkpoint</p>
        <h1>Building React Apps with TypeScript</h1>
        <p className="subtitle">
          This project converts a functional component and a class component
          from JavaScript to TypeScript.
        </p>
      </section>

      <section className="examples-grid">
        <article className="example-card">
          <h2>Code 01: Greeting</h2>
          <p className="card-text">
            The `name` prop is typed with an interface so the component only
            accepts the expected data shape.
          </p>
          <Greeting name="Eric" />
        </article>

        <article className="example-card">
          <h2>Code 02: Counter</h2>
          <p className="card-text">
            The class component uses a typed state object and a safe increment
            update.
          </p>
          <Counter />
        </article>
      </section>
    </main>
  );
}

export default App;
