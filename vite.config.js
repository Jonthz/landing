import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Configuración base
  base: './',
  
  // Una única configuración de build que combina todo
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        merge: resolve(__dirname, 'merge.html'),
      },
    },
  },
  
  // Configuración del servidor de desarrollo
  server: {
    open: true
  },
  
  // Directorio para archivos estáticos
  publicDir: 'public',
  
  // Aliases para importaciones
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});