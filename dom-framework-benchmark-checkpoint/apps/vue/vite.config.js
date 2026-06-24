import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";

const projectRoot = fileURLToPath(new URL("../..", import.meta.url));

export default defineConfig({
  root: fileURLToPath(new URL(".", import.meta.url)),
  plugins: [vue()],
  server: {
    port: 5174,
    fs: {
      allow: [projectRoot]
    }
  },
  build: {
    outDir: "../../dist/vue",
    emptyOutDir: true
  }
});
