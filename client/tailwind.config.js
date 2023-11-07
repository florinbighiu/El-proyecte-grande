/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./Layout/**/*.{html,jsx}",
  ],
  theme: {
    screens: {
      xsm: "250px",

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }
      
      // => @media (min-width: 1536px) { ... }
      xxl: "2500px",
    },
    extend: {
      spacing: {
        "6rem": "6rem",
      },
      zIndex: {
        0: 0,
        10: 10,
        20: 20,
        30: 30,
        40: 40,
        50: 50,
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui"],
        serif: ["Roboto"],
        mono: ["ui-monospace", "SFMono-Regular"],
        display: ["Oswald"],
        body: ["Bungee Spice"],
        helvetica: ["Helvetica"],
      },
    },
  },
  plugins: [],
};
