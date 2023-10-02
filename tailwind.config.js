/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'shoesbg': "url('./assets/ShoesBackGround.jpg')",
      }
    },
  },
  plugins: [
   
  ],
})

