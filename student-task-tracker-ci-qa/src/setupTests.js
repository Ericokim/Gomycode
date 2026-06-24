import "@testing-library/jest-dom/vitest";

const storage = new Map();

Object.defineProperty(globalThis, "localStorage", {
  value: {
    clear: () => storage.clear(),
    getItem: (key) => storage.get(key) ?? null,
    removeItem: (key) => storage.delete(key),
    setItem: (key, value) => storage.set(key, String(value))
  },
  writable: true
});
