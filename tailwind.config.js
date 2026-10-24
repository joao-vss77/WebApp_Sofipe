/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Instrument Sans"', '"Segoe UI"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      // Cores semânticas ligadas aos tokens CSS (src/styles/tokens.css),
      // assim o tema claro/escuro funciona também com utilitários Tailwind.
      colors: {
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        surface: 'var(--surface)',
        line: 'var(--line)',
        brand: 'var(--blue)',
        cta: 'var(--cta)',
        mint: 'var(--mint)',
        panel: 'var(--panel)',
      },
    },
  },
  plugins: [],
};
