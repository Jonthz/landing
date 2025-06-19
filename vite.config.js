import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Asegurarse de que merge.html y welcome.js sean incluidos
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        merge: resolve(__dirname, 'merge.html'),
      },
    },
  },
  // Configuración básica para tu proyecto
  base: './',
  server: {
    open: true
  },
  build: {
    outDir: 'dist'
  },
  // Asegurar que todos los recursos sean copiados correctamente
  publicDir: 'public',
  // Resolver problemas de rutas
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});