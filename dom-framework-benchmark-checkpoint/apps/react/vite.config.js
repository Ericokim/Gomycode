import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

const projectRoot = fileURLToPath(new URL("../..", import.meta.url));

export default defineConfig({
  root: fileURLToPath(new URL(".", import.meta.url)),
  plugins: [react()],
  server: {
    port: 5173,
    fs: {
      allow: [projectRoot]
    }
  },
  build: {
    outDir: "../../dist/react",
    emptyOutDir: true
  }
});
