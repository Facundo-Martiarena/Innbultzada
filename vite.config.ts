import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig(({ command, mode }) => ({
  // mode 'offline' (build:offline) → todo el JS/CSS inline en un solo index.html,
  // abrible con doble-click desde file:// para presentar sin internet. Las slides y
  // el video quedan como archivos externos en brand/ (no se inlinean).
  plugins: [react(), ...(mode === 'offline' ? [viteSingleFile()] : [])],
  // Rutas relativas solo en el build estático; en desarrollo se sirve desde "/".
  base: command === 'build' ? './' : '/',
  server: {
    port: 5173,
    open: true, // abre el navegador en la URL correcta aunque el puerto cambie
  },
}));
