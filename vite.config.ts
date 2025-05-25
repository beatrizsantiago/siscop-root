import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@domain': path.resolve(__dirname, 'src/domain'),
      '@infrastructure': path.resolve(__dirname, 'src/infrastructure'),
      '@usecases': path.resolve(__dirname, 'src/usecases'),
      '@generalTypes': path.resolve(__dirname, 'src/types'),
    },
  },
  optimizeDeps: {
    exclude: ['@phosphor-icons/react'],
  },
})
