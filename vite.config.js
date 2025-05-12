import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  base: '/bunch-pay-front/', // esto es clave
  plugins: [react()],
});

