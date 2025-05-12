/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#93C5FD',       // Azul eléctrico moderno → acción clara, elegante
        primaryLight: '#93C5FD',  // Azul claro → hover, fondos sutiles
        background: '#0F172A',    // Azul negro profundo → fondo general
        surface: '#1E293B',       // Gris azul oscuro → tarjetas, paneles
        textPrimary: '#F1F5F9',   // Gris casi blanco → excelente legibilidad
        textSecondary: '#94A3B8', // Gris azulado medio → jerarquía suave
        accent: '#10B981',        // Verde esmeralda → transacciones seguras, highlights
      },
      fontFamily: {
        titulo: ['"chillax"', 'sans-serif'],
        texto: ['"supreme"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
