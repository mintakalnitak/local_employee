/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Outfit"', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
      },
      boxShadow: {
        'glass-sm': '0 4px 6px -1px rgba(15, 23, 42, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
        'glass': '0 10px 15px -3px rgba(15, 23, 42, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
        'glass-lg': '0 20px 25px -5px rgba(15, 23, 42, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
        'glass-glow': '0 0 20px rgba(99, 102, 241, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
