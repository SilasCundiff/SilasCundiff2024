module.exports = {
  mode: 'jit',
  content: ['./app/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'], // remove unused styles in production
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        alagard: ['Alagard', 'sans-serif'],
        minecraft: ['Minecraftia-Regular', 'sans-serif'],
        pressStart: ['PressStart2P-Regular', 'sans-serif'],
      },
    },
    container: {
      screens: {
        lg: '1128px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
