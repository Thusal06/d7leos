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
        district: {
          pink1: '#F7B1C8', // light pink
          pink2: '#EC69A2', // vibrant pink
          pink3: '#EA0880', // fuchsia/magenta
          crimson: '#C41D66',
          maroon: '#710F38',
          gold1: '#F7EAC1', // light gold
          gold2: '#E1AD36', // gold
          bronze: '#B2722A'  // bronze
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