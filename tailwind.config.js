/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue-dark': '#0d1117',     // fondo principal
        'blue-mid': '#1a1f2b',      // contenedores
        'blue-accent': '#60a5fa',   // detalles tipo bordes
        'blue-soft': '#c9dfff',     // encabezado/logo
        'blue-button': '#1e293b',   // botones oscuros
        'green-profit': '#22c55e',  // rendimientos
        'pink-discount': '#f472b6', // descuentos Día
        'yellow-discount': '#facc15', // descuentos Amazon
        'green-discount': '#86efac', // Starbucks
      },
      fontFamily: {
        primary: ['"Supreme"', 'sans-serif'],
        secondary: ['"BrownSugar"', 'cursive'],
      },
    },
  },
  plugins: [],
}
