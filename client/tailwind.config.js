/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/screens/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      brandGreen: "#CBFB5E",
      brandBlue: "#0E0B1F",
      neutralLightGray: "#EEEEEE",
      neutralDarkGray: "#71737B",
      neutralMarineBlue: "#20242F",
    },
    extend: {
    }
  },
  plugins: [],
};
