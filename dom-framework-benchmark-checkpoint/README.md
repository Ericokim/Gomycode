# DOM Benchmark Comparison: React, Angular, Vue, and Svelte

## Objective

This checkpoint compares how React, Angular, Vue, and Svelte handle common DOM operations in a todo list application. Each implementation supports adding tasks, viewing tasks with priority levels, editing task names and priorities, removing tasks, and measuring render/update/delete performance.

## Project Structure

```text
dom-framework-benchmark-checkpoint/
  apps/
    react/
    angular/
    vue/
    svelte/
  shared/
    styles.css
    tasks.js
  benchmark-results.md
  package.json
```

## How to Run

Install dependencies from this project folder:

```bash
npm install
```

Use an Angular-supported LTS Node version, such as Node 20 or Node 22. Node 25 is not supported by Angular CLI and can abort during `ng build`.

Run each implementation:

```bash
npm run dev:react
npm run dev:vue
npm run dev:svelte
npm run dev:angular
```

Default local ports:

| Framework | URL |
| --- | --- |
| React | `http://localhost:5173` |
| Vue | `http://localhost:5174` |
| Svelte | `http://localhost:5175` |
| Angular | `http://localhost:5176` |

## Benchmark Methodology

Each app uses the same todo data shape and performs the same operations:

- Initial render for 100, 500, and 1000 tasks.
- Update the first 50 tasks.
- Delete the first 50 tasks.
- Measure elapsed time with `performance.now()`.
- Wait for two `requestAnimationFrame` cycles before recording the result so the DOM has time to paint.
- Report memory with `performance.memory.usedJSHeapSize` when the browser exposes it.

For the fairest comparison, benchmarks should be run in the same browser, with production builds, after a browser refresh, and with DevTools closed unless memory profiling is required.

## Benchmark Results

Sample benchmark results are documented in [benchmark-results.md](./benchmark-results.md).

| Framework | Render 100 | Render 500 | Render 1000 | Update 50 | Delete 50 | Notes |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| Svelte | 5.8 ms | 18.9 ms | 34.6 ms | 4.2 ms | 3.7 ms | Fastest overall due to compiled DOM updates. |
| Vue | 7.1 ms | 23.4 ms | 42.8 ms | 5.6 ms | 4.8 ms | Strong reactivity and efficient keyed rendering. |
| React | 8.4 ms | 29.7 ms | 55.2 ms | 7.3 ms | 6.2 ms | Predictable with keyed lists and immutable state updates. |
| Angular | 10.6 ms | 35.8 ms | 68.5 ms | 8.9 ms | 7.4 ms | Improved by `trackBy`; heavier runtime than the others. |

## Reflection

The biggest challenge was keeping the benchmark fair across the four frameworks. Each framework has its own preferred style, so I had to avoid comparing different application designs instead of comparing DOM behavior. I used the same task shape, keyed list rendering, and the same number of operations for every app. React required careful immutable state updates so changes would be predictable. Angular needed `trackBy` in `ngFor` to avoid unnecessary DOM work when updating or deleting rows. Vue was straightforward because its reactive model and `v-model` made editing tasks simple. Svelte required less runtime code because many DOM updates are prepared during compilation.

The frameworks handled DOM updates differently. React updates through state changes and reconciliation, which is reliable but adds runtime work. Angular uses change detection and templates, so performance depends strongly on tracking list items correctly. Vue's reactive system was efficient and easy to reason about for this type of list. Svelte performed best in most scenarios because it compiles updates into direct DOM operations instead of doing as much work in the browser at runtime.

In these results, Svelte performed best for initial rendering, updates, and deletion. Vue was close behind and had a good balance between performance and developer experience. React remained predictable and maintainable, while Angular was more verbose but still effective when optimized with `trackBy`.

## Conclusion

All four frameworks can handle large todo lists efficiently when keyed rendering is used correctly. For raw DOM update performance in this benchmark, Svelte was the strongest. For a larger real-world application, the final choice should also consider ecosystem, team experience, routing, testing, maintainability, and long-term project requirements.
