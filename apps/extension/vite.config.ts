import { crx } from '@crxjs/vite-plugin';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import { manifest } from './manifest';

const src = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');
const publicDir = resolve(__dirname, 'public');

export default defineConfig(({ command }) => {
  const commonConfig = {
    // This is added to fix issue with store.js, which is a dependency of ui-keyring.
    // Can be removed when we remove dependency to ui-keyring.
    optimizeDeps: {
      esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
          global: 'globalThis',
        },
      },
    },
  };
  if (command === 'serve') {
    return {
      ...commonConfig,
      server: {
        port: 8000,
        hmr: {
          host: 'localhost',
          port: 8000,
        },
      },
      plugins: [react(), crx({ manifest }), tsconfigPaths()],
    };
  } else {
    return {
      ...commonConfig,
      plugins: [react(), crx({ manifest }), tsconfigPaths()],
      publicDir,
      build: {
        outDir,
        sourcemap: true,
        rollupOptions: {
          input: {
            content: resolve(src, 'content', 'index.ts'),
            background: resolve(src, 'background', 'index.ts'),
            popup: resolve(src, 'popup', 'index.html'),
            newtab: resolve(src, 'newtab', 'index.html'),
            options: resolve(src, 'options', 'index.html'),
          },
          output: {
            entryFileNames: (chunk) => `src/${chunk.name}/index.js`,
          },
        },
      },
      define: {
        'import.meta.vitest': 'undefined',
      },
    };
  }
});
