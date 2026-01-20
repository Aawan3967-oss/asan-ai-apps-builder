/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          50: '#f3f0ff',
          600: '#7c3aed',
          900: '#4c1d95',
        },
      },
    },
  },
  plugins: [],
}
