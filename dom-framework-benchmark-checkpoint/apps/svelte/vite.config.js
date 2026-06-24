import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { fileURLToPath, URL } from "node:url";

const projectRoot = fileURLToPath(new URL("../..", import.meta.url));

export default defineConfig({
  root: fileURLToPath(new URL(".", import.meta.url)),
  plugins: [svelte()],
  server: {
    port: 5175,
    fs: {
      allow: [projectRoot]
    }
  },
  build: {
    outDir: "../../dist/svelte",
    emptyOutDir: true
  }
});
