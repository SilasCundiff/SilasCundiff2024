/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        alagard: ["Alagard", "sans-serif"],
        minecraft: ["Minecraftia-Regular", "sans-serif"],
        pressStart: ["PressStart2P-Regular", "sans-serif"],
      },
    },
    container: {
      screens: {
        lg: "1128px",
      },
    },
  },
  plugins: [],
};
