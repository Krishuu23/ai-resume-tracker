/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark background scale
        'dark': '#0a0612',
        'dark-2': '#120d20',
        'dark-3': '#1a1230',
        'dark-4': '#221840',

        // Pastel accents — same colors, now used as glows
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

        // Text scale for dark background
        'text-primary': '#f0eaff',
        'text-secondary': '#a89cc0',
        'text-muted': '#6b5f8a',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}