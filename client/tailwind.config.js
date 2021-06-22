module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        amazon_blue: {
          light: "#232F3E",
          DEFAULT: "#131921",
          form_inp: "orange",
        },
      },
    },
    container: {
      center: true,
    },
  },
  variants: {
    extend: {
      padding: ["hover"],
      borderStyle: ["hover"],
      borderCollapse: ["hover", "focus"],
    },
  },
  plugins: [],
};
