import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react' // Replace with your framework plugin
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',

    globals: true,

    setupFiles: ['./src/test/setup.ts'],

    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },

    pool: 'threads',
  },
})
