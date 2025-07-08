import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,           // ← Porta padrão
    open: true,           // ← Abre ao executar o RUN
    proxy: {
      '/api': {
        target: 'http://10.0.3.2:5678',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
});
