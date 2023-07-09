import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@pages': path.resolve(__dirname, './src/pages'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@entity': path.resolve(__dirname, './src/entity'),
      '@feature': path.resolve(__dirname, './src/feature'),
      '@app': path.resolve(__dirname, './src/app'),
    },
  },
});
