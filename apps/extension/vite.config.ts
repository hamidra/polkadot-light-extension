import { crx } from '@crxjs/vite-plugin';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import { manifest } from './manifest';

const src = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');
const publicDir = resolve(__dirname, 'public');

export default defineConfig(() => {
  return {
    root: 'src',
    server: {
      port: 8000,
      hmr: {
        host: 'localhost',
        port: 8000,
      },
    },
    plugins: [react(), crx({ manifest }), tsconfigPaths()],
    publicDir,
    build: {
      outDir,
      sourcemap: true,
      rollupOptions: {
        input: {
          tab: resolve(src, 'index.html'),
        },
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        // This is added to fix issue with store.js, which is a dependency of ui-keyring.
        // Can be removed when we remove dependency to ui-keyring.
        define: {
          global: 'globalThis',
        },
      },
    },
    define: {
      'import.meta.vitest': 'undefined',
    },
  };
});
