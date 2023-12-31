/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
const { nextui } = require("@nextui-org/react");
module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'shoesbg': "url('./assets/ShoesBackGround.jpg')",
      }
    },
  },
  darkMode: "class",
  plugins: [
    nextui(
      {
        theme:{
          light:{
            colors:{
              amber:"#ffbf00",
            },
          }
        }
      }
    )
  ],
})

