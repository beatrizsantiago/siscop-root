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
        farms: {
          type: 'module',
          name: 'farms',
          entry: 'http://localhost:3002/remoteEntry.js',
          entryGlobalName: 'farms',
          shareScope: 'default',
        },
        inventory: {
          type: 'module',
          name: 'inventory',
          entry: 'http://localhost:3003/remoteEntry.js',
          entryGlobalName: 'inventory',
          shareScope: 'default',
        },
        sales: {
          type: 'module',
          name: 'sales',
          entry: 'http://localhost:3004/remoteEntry.js',
          entryGlobalName: 'sales',
          shareScope: 'default',
        },
        production: {
          type: 'module',
          name: 'production',
          entry: 'http://localhost:3005/remoteEntry.js',
          entryGlobalName: 'production',
          shareScope: 'default',
        },
        goals: {
          type: 'module',
          name: 'goals',
          entry: 'http://localhost:3006/remoteEntry.js',
          entryGlobalName: 'goals',
          shareScope: 'default',
        },
      },
      filename: 'remoteEntry.js',
      shared: [
        'react',
        'react-dom',
        '@mui/material',
        '@emotion/react',
        '@emotion/styled',
      ],
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
