/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          black: "#000409",
          "light-gray": "#1a222b",
          green: "#d0ff15",
          white: "#f0f5fa",
        },
      },
    },
  },
  plugins: [],
}
