/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wordpress: {
          blue: '#21759b',
          darkblue: '#1e1e1e',
          lightblue: '#0073aa',
          grey: '#f1f1f1',
          darkgrey: '#32373c',
        }
      }
    },
  },
  plugins: [],
}
