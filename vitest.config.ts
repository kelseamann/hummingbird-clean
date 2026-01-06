/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
    css: true,
  },
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, './src/app'),
      // Mock monaco-editor to avoid bundling it in tests
      'monaco-editor': path.resolve(__dirname, './src/test/mocks/monaco-editor.ts'),
    },
  },
  ssr: {
    noExternal: [/@patternfly\/.*/],
  },
});
