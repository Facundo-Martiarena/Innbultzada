import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Rutas relativas solo en el build estático; en desarrollo se sirve desde "/".
  base: command === 'build' ? './' : '/',
  server: {
    port: 5173,
    open: true, // abre el navegador en la URL correcta aunque el puerto cambie
  },
}));
