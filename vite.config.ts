import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

const isProd = process.env.BUILD_MODE === 'prod'

export default defineConfig({
  base: '/mana-kz-website/', // GitHub Pages repository path
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Оптимизация для production
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: isProd,
        drop_debugger: isProd,
      },
    },
    // Разделение кода для лучшей производительности
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          icons: ['lucide-react'],
          ui: ['@radix-ui/react-accordion', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu']
        }
      }
    },
    // Оптимизация размера чанков
    chunkSizeWarningLimit: 500,
    // Включаем source maps только для dev
    sourcemap: !isProd,
  },
  // Оптимизация для разработки
  server: {
    hmr: {
      overlay: false
    }
  },
  // Оптимизация CSS
  css: {
    devSourcemap: !isProd
  }
})

