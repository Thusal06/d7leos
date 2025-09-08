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
        maroon: {
          DEFAULT: '#7A1C1C',
          600: '#651717',
          700: '#511313'
        },
        gold: {
          DEFAULT: '#D4AF37',
          600: '#BD9D30',
          700: '#A38A29'
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