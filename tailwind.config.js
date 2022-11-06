/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}




// module.exports = {
//   content: ["./src/**/*.{html,js}", "./public/*.html"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }