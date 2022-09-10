/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      padding: {
        5.6: "0.35rem",
      },
      gridTemplateColumns: {
        "auto-1fr": "auto 1fr",
        "n-2auto": "repeat(2,auto)",
        "n-5fr": "1fr 1fr 1fr 1fr 1fr",
      },
      colors: {
        "n-white-sec": "rgb(212,209,209)",
        "n-black": "#1b1c1e",
        "n-bg": "#141625",
        "n-bg-sec": "#1f213a",
        "n-purple": "#7b5dfa",
        "n-gray": "#a2a6be",
        "n-bg-green": "#1f2b3f",
      },
    },
  },
  plugins: [],
};
