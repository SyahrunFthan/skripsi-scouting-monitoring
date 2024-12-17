/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "15px",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "960px",
      xl: "1200px",
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#007aff",
        },
        accent: "rgb(28 36 52 )",
      },
    },
  },
  plugins: [require("flowbite/plugin"), require("daisyui")],
};
