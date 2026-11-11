import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // En dev, /api est redirigé vers Express : front et API sont sur la même
  // origine, donc le cookie d'auth fonctionne sans config CORS (comme Nginx en prod).
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
})