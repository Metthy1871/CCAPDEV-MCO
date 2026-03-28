import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["quill"],
  },
  build: {
    commonjsOptions: {
      include: [/quill/, /node_modules/],
      transformMixedEsModules: true,
    },
  },
});