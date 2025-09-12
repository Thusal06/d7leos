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
        petal: { // #F7B1C8
          DEFAULT: '#F7B1C8'
        },
        rose: { // #EC69A2
          DEFAULT: '#EC69A2'
        },
        fuchsia: { // #EA0880
          DEFAULT: '#EA0880'
        },
        crimson: { // #C41D66
          DEFAULT: '#C41D66'
        },
        burgundy: { // #710F38
          DEFAULT: '#710F38'
        },
        sand: { // #F7EAC1
          DEFAULT: '#F7EAC1'
        },
        amberD7: { // #E1AD36
          DEFAULT: '#E1AD36'
        },
        bronze: { // #B2722A
          DEFAULT: '#B2722A'
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