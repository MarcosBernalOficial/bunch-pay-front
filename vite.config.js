import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 👇 este polyfill es clave
export default defineConfig({
  plugins: [react()],
  define: {
    global: {},
  },
});
