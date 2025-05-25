import { defineConfig } from 'vite';
import { federation } from '@module-federation/vite';
import react from '@vitejs/plugin-react'
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host',
      remotes: {
        products: {
          type: 'module',
          name: 'products',
          entry: 'http://localhost:3001/remoteEntry.js',
          entryGlobalName: 'products',
          shareScope: 'default',
        },
      },
      filename: 'remoteEntry.js',
      shared: ['react', 'react-dom'],
    }),
  ],
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
});
