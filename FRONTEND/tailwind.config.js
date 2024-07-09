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
          600: '#9acd32',
          700: '#6b8e23',
        },
        cyanGreen: {
          800: '#98fc03',
        },
        cyan: {
          800: '#0A74DA',
        },
        yellowGreen: {
          500: '#9ACD32',
          600: '#6B8E23',
        },
        greenButton: {
          500: '#11ab6b',
        },
        fluorescenGreen: {
          100: '#f5fecd',
          200: '#ebfe9c',
          300: '#e0fd6a',
          400: '#d6fd39',
          500: '#ccfc07',
          600: '#a3ca06',
          700: '#7a9704',
          800: '#526503',
          900: '#293201',
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
        // sans: ['Montserrat', 'sans-serif'],
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
      boxShadow: {
        custom: '0 3px 14px rgba(0, 0, 0, 0.08)',
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
