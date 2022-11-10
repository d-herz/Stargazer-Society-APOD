/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["corporate", "forest", "synthwave", "aqua", "garden", "cupcake", "luxury"],
    darkTheme: "forest",
  }
}






