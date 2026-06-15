import { defineConfig } from 'vite'

// Ensure the dev server always uses the configured port and fails if it's unavailable
export default defineConfig({
  server: {
    port: 3000,
    strictPort: true,
    host: '0.0.0.0',
  },
})
