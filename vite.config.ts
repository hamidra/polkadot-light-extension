// https://vitejs.dev/config/
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path';

const src = resolve(__dirname, 'src');
const assetsDir = resolve(src, 'assets');
const outDir = resolve(__dirname, 'dist');
const publicDir = resolve(__dirname, 'public');

export default defineConfig({
  resolve: {
    alias: {
      '@src': src,
      '@assets': assetsDir,
    },
  },
  plugins: [react()],
  publicDir,
  build: {
    outDir,
    rollupOptions: {
      input: {
        content: resolve(src, 'content', 'index.ts'),
        background: resolve(src, 'background', 'index.ts'),
        popup: resolve(src, 'popup', 'index.html'),
        newtab: resolve(src, 'newtab', 'index.html'),
        options: resolve(src, 'options', 'index.html'),
      },
      output: {
        entryFileNames: chunk => `src/${chunk.name}/index.js`,
      },
    },
  },
});

