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
        success: '#34d399',
        warning: '#fbbf24',
        error: '#f87171',
      },

      maxWidth: {
        'product-card': '244px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
