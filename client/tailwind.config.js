/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Outline: ["Outline", "italic"]
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
