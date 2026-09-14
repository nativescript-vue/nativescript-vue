import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  define: {
    __DEV__: true,
  },
  resolve: {
    alias: {
      '@nativescript/core': fileURLToPath(
        new URL('./test/stubs/nativescript-core.ts', import.meta.url),
      ),
    },
  },
  test: {
    include: ['test/**/*.test.ts'],
  },
});
