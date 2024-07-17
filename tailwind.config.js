/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],  theme: {
    extend: {
      fontFamily:{
        padauk: ['Marvel', 'sans-serif'],
        padauk: ['Honk', 'sans-serif'],
      },
      backgroundImage: {
        'background': "url(./img/235121.jpg)",
        'herobackground': "url(img/cityscape-3995532_1280.webp)"
      }
    },
  },
  plugins: [],
}

