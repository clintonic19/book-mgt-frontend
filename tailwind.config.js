/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
          "primary":"#0D0842",
          "secondary":"#F3F3F3",
          "blackBG":"#F3F3F3",
          "Favorite" : "#FF5841",
      },
      fontFamily:{
        "primary": ["Montserrat", "serif"],
        "secondary": ["Nunito Sans", "serif"],
      }, 
    },
  },
  plugins: [],
}



