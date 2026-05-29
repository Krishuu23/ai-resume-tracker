/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rose: '#FFB5C8',
        'rose-dark': '#ff8fab',
        lavender: '#D4B8F0',
        'lavender-dark': '#b794e8',
        sky: '#B5D8FF',
        'sky-dark': '#82bfff',
        mint: '#B8F0D4',
        'mint-dark': '#82e8b5',
        peach: '#FFD4B5',
        'peach-dark': '#ffb882',
        cream: '#FFF8F0',
        soft: '#F5F0FF',
        'text-dark': '#4a4063',
        'text-mid': '#7a6a9a',
        'text-light': '#a89cc0',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}