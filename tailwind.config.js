/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'hind': ['"Hind Siliguri"', 'sans-serif'],
      },
      colors: {
        'fifa-gold': '#C9A84C',
        'fifa-gold-light': '#F0C040',
        'fifa-dark': '#0A0E1A',
        'fifa-darker': '#060911',
        'fifa-card': '#0F1628',
        'fifa-card-hover': '#141C35',
        'fifa-border': '#1E2D4A',
        'fifa-blue': '#1A3A6E',
        'fifa-blue-light': '#2A5298',
        'fifa-accent': '#00D4FF',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A84C, #F0C040, #C9A84C)',
        'card-gradient': 'linear-gradient(135deg, rgba(15,22,40,0.9), rgba(20,28,53,0.9))',
        'hero-gradient': 'linear-gradient(135deg, #060911 0%, #0A1628 50%, #0A0E1A 100%)',
      },
    },
  },
  plugins: [],
}
