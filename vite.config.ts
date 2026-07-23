import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

const repositoryBasePath = '/its-react-portfolio-web/'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: command === 'build' ? repositoryBasePath : '/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    // MUI portals and shared document state are not isolated reliably across
    // concurrent JSDOM workers. A single worker keeps the quality gate deterministic.
    maxWorkers: 1,
    pool: 'threads',
    setupFiles: ['./src/tests/setup.ts'],
    css: true,
  },
}))
