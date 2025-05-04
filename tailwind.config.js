/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        geist: ["Geist", "sans-serif"],
      },
      colors: {
        grey: "#bdbdbd",
        "main-blue": "#105afa",
        "hover-main-blue": "#003cbd",
        "border-grey": "#d5d5d5",
      },
      screens: {
        s: "375px",
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        "3.5xl": "1602px",
        "3xl": "1920px",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1.5rem",
          md: "2rem",
          lg: "3rem",
          xl: "4rem",
          "2xl": "4rem",
          "3xl": "0rem",
        },
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1280px",
          "3xl": "1280px",
        },
      },
    },
  },
  plugins: [],
};
