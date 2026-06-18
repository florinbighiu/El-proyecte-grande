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
      colors: {
        cream: {
          DEFAULT: "#f9f6f0",
          deep: "#f1ebe0",
        },
        ink: {
          DEFAULT: "#26221c",
          soft: "#6b6358",
        },
        clay: {
          DEFAULT: "#c0603a",
          dark: "#a44f2d",
          soft: "#efe1d6",
        },
      },
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui"],
        mono: ["ui-monospace", "SFMono-Regular"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        marquee: "marquee 34s linear infinite",
        floaty: "floaty 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
