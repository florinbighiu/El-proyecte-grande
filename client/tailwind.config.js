/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './components/**/*.{js,jsx,ts,tsx}',
    './Layout/**/*.{html,jsx}',


  ],
  theme: {
    extend: {
      spacing: {
        '6rem': '6rem',
      },
      zIndex: {
        '0': 0,
        '10': 10,
        '20': 20,
        '30': 30,
        '40': 40,
        '50': 50,
      },
      fontFamily: {
        'sans': ['ui-sans-serif', 'system-ui'],
        'serif': ['ui-segoe', 'GT Walsheim Regular'],
        'mono': ['ui-monospace', 'SFMono-Regular'],
        'display': ['Oswald'],
        'body': ['"Open Sans"'],
      }
    },
  },
  plugins: [],
}