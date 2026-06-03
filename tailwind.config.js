/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'barlow': ['"Barlow Condensed"', 'sans-serif'],
        'inter':  ['"Inter"', 'sans-serif'],
      },
      colors: {
        'fifa-green':  '#16A34A',
        'fifa-bright': '#22C55E',
        'fifa-dim':    '#15803D',
        'fifa-blue':   '#1E3A8A',
        'fifa-gold':   '#F4C542',
        'fifa-gold-d': '#D4A017',
        'fifa-dark':   '#001B2A',
        'fifa-card':   '#08263D',
        'fifa-card-hi':'#0E3554',
      },
    },
  },
  plugins: [],
}
