/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      ...colors,
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'primary': '#00254C',
      'secondary': '#59C011',
      'muted': '#bdbdbd'
    },
    screens: {
      'sm': {'max': '640px'},

      'md': {'min': '768px', 'max': '1023px'},

      'lg': {'min': '1024px', 'max': '1279px'},

      'xl': {'min': '1280px', 'max': '1535px'},

      '2xl': {'min': '1536px'},

      'md-xl': {'min': '767px', 'max': '3000px'},
    },
  },
  plugins: [],
};
