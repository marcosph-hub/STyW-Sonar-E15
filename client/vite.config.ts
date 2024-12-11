import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: ['.js', '.ts', '.vue'],
  },
  test: {
    coverage: {
      reporter: ["text", "lcov"], // Habilita el reporte lcov
      reportsDirectory: "./coverage", // Carpeta de salida
    },
  },
})
