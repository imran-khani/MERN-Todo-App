/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        Primary: "#FF4F5A",
      },
      fontSize: {
        "heading": "48px",
        "subheading": "36px",
      },
    },
  },
  plugins: [],
};
