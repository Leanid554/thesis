/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1D4ED8",
        secondary: "#2563EB",
        darkBlue: "#1E3A8A",
      },
    },
  },
  plugins: [],
};
