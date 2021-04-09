module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
        'login-img': "url('/src/Styles/Login Page.png')",
      }),
      backgroundColor: theme => ({
        'purple': '#8435E9',
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
