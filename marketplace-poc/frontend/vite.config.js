import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// =============================================================
// Configuracion de Vite (Bundler/Dev Server del Frontend)
//
// FUNCION ARQUITECTONICA:
// Vite sirve como servidor de desarrollo para la Capa de
// Presentacion. El `proxy` es clave para la PoC: redirige
// las llamadas a /api/* al backend en el puerto 3001.
// Esto evita problemas de CORS en desarrollo al hacer que
// AMBAS capas aparezcan en el mismo origen desde la perspectiva
// del navegador durante el desarrollo local.
// (En produccion, el proxy lo maneja un servidor Nginx/CDN)
// =============================================================

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      // Cualquier peticion a /api desde el frontend sera
      // redirigida transparentemente al backend en :3001
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
});
