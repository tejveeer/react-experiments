/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["Outfit"],
        redhat: ["Red Hat Text"],
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
