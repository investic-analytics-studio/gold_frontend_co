import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'charting_library': path.resolve(__dirname, './public/static/charting_library')
    },
  },
  server: {
    port: 5173,
    // proxy: {
    //   '/tradingview': {
    //     target: 'http://localhost:8080',
    //     changeOrigin: true
    //   }
    // }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      }
    }
  },
  publicDir: 'public'
})
