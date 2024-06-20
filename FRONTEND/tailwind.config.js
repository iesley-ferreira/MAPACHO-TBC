/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#f3af16',
          secondary: '#0d5e53',
        },
        yellowGreen: {
          600: '#9acd32', // Defina o valor da cor para 600
          700: '#6b8e23', // Defina o valor da cor para 700
        },
        success: '#34d399',
        warning: '#fbbf24',
        error: '#f87171',
      },
      text: {
        title: '#4B5563',
        body: '#9CA3AF',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      maxWidth: {
        'product-card': '244px',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.3)' },
        },
      },
      animation: {
        wiggle: 'wiggle 0.3s ease-in-out',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
