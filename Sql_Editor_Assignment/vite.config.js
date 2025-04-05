// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('monaco-editor')) return 'monaco';
          if (id.includes('react-window')) return 'virtual-table';
          if (id.includes('react')) return 'react';
        }
      }
    }
  }
})
