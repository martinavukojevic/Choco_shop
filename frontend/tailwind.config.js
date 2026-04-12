/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
      },
      keyframes: {
        fadeInScale: {
          '0%': { opacity: 0, transform: 'scale(0.95)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
      },
      animation: {
        fadeInScale: 'fadeInScale 0.8s ease-out',
      },
      colors: {
        gold: '#FFD700',
        'dark-red': '#8B0000',
        burgundy: '#7e2325',
        'custom-gold': '#bfa980',
        cocoa: '#9e7160',
        choc: '#452212'
      },
    },
  },
  plugins: [],
};
