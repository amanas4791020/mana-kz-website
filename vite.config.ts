import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

const isProd = process.env.BUILD_MODE === 'prod'

export default defineConfig({
  base: '/', // Custom domain GitHub Pages base path
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Базовая минификация без дополнительных настроек
    minify: 'esbuild',
    // Убираем source maps для production
    sourcemap: false,
  }
})

