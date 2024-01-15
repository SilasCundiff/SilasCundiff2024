/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // columns: {
      //   12: "repeat(12, minmax(0, 72px))",
      // },
    },
    container: {
      screens: {
        lg: "1128px",
      },
    },
  },
  plugins: [],
};
