/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue-dark': '#0d1117',
        'blue-mid': '#1a1f2b',
        'blue-accent': '#60a5fa',
        'blue-soft': '#c9dfff',
        'blue-button': '#1e293b',
        'green-profit': '#22c55e',
        'pink-discount': '#f472b6',
        'yellow-discount': '#facc15',
        'green-discount': '#86efac', 
      },
      fontFamily: {
        primary: ['"Supreme"', 'sans-serif'],
        secondary: ['"BrownSugar"', 'cursive'],
      },
    },
  },
  plugins: [],
}
