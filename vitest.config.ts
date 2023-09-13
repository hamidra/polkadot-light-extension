// vite.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // specifying any .ts file enables in-source testing
    // https://vitest.dev/guide/in-source.html
    includeSource: ['packages/**/*.ts', 'apps/**/*.ts'],
  },
});
