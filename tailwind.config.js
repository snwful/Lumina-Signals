/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#edf0f7',
          100: '#d0d7e8',
          200: '#b0bdd8',
          300: '#8fa3c8',
          400: '#6f8ab8',
          500: '#4e70a8',
          600: '#3e5986',
          700: '#2f4265',
          800: '#1f2c43',
          900: '#101622',
        },
        accent: {
          50: '#fff9e6',
          100: '#ffefb8',
          200: '#ffe58a',
          300: '#ffdb5c',
          400: '#ffd12e',
          500: '#ffc700',
          600: '#cc9f00',
          700: '#997700',
          800: '#664f00',
          900: '#332800',
        },
        surface: {
          50: '#f9fafb',
          100: '#f1f3f5',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#ced4da',
          500: '#adb5bd',
          600: '#868e96',
          700: '#495057',
          800: '#343a40',
          900: '#212529',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': {
            opacity: '1',
            filter: 'brightness(1)',
          },
          '50%': {
            opacity: '0.85',
            filter: 'brightness(1.2)',
          },
        },
      },
    },
  },
  plugins: [],
}
