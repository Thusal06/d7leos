/***** Tailwind config with maroon/gold theme and dark mode *****/
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          100: '#F7B1C8',
          300: '#EC69A2',
          500: '#EA0880',
          600: '#C41D66',
          800: '#710F38'
        },
        gold: {
          100: '#F7EAC1',
          400: '#E1AD36',
          600: '#B2722A'
        }
      },
      backdropBlur: {
        xs: '2px'
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.15)'
      }
    }
  },
  plugins: []
};