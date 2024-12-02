/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/preline/dist/*.js" 
  ],
  theme: {
    extend: {
      screens: {
        'media424px': '424px',
        'media375': '375px',
        'media320': '320px'
      },
    },
  },
  plugins: [
    require('preline/plugin'),
  ],
}