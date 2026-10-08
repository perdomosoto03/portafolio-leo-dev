/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Archivo Variable"', '"Arial Narrow"', 'Arial', 'sans-serif'],
        sans: ['"Instrument Sans Variable"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      // Colores = variables CSS (ver index.css). Hueso, tinta y una sola señal.
      colors: {
        paper: 'rgb(var(--paper) / <alpha-value>)',
        'paper-2': 'rgb(var(--paper-2) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        'ink-soft': 'rgb(var(--ink-soft) / <alpha-value>)',
        rule: 'rgb(var(--rule) / <alpha-value>)',
        signal: 'rgb(var(--signal) / <alpha-value>)',
      },
      keyframes: {
        rise: { '0%': { opacity: '0.001', transform: 'translateY(18%)' }, '100%': { opacity: '1', transform: 'none' } },
      },
      animation: { rise: 'rise .9s cubic-bezier(.16,1,.3,1) both' },
    },
  },
  plugins: [],
}
