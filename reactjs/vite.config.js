import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@redux': path.resolve(__dirname, './src/redux'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@config': path.resolve(__dirname, './src/config')
    }
  },
  plugins: [react()]
})
