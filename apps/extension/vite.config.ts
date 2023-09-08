import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { crx } from "@crxjs/vite-plugin";
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "path";
import { manifest } from "./manifest";

const src = resolve(__dirname, "src");
const outDir = resolve(__dirname, "dist");
const publicDir = resolve(__dirname, "public");

export default defineConfig(({ command }) => {
  if (command === "serve") {
    return {
      server: {
        port: 8000,
        hmr: {
          host: "localhost",
          port: 8000,
        },
      },
      plugins: [react(), crx({ manifest }), tsconfigPaths()],
    };
  } else {
    return {
      plugins: [react(), crx({ manifest }), tsconfigPaths()],
      publicDir,
      build: {
        outDir,
        sourcemap: true,
        rollupOptions: {
          input: {
            content: resolve(src, "content", "index.ts"),
            background: resolve(src, "background", "index.ts"),
            popup: resolve(src, "popup", "index.html"),
            newtab: resolve(src, "newtab", "index.html"),
            options: resolve(src, "options", "index.html"),
          },
          output: {
            entryFileNames: (chunk) => `src/${chunk.name}/index.js`,
          },
        },
      },
      define: {
        "import.meta.vitest": "undefined",
      },
    };
  }
});
