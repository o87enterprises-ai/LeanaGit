/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'playfair': ['"Playfair Display"', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        'oakland-terracotta': '#C26A4B',
        'sierra-sage': '#5A6E5A',
        'warm-ivory': '#F8F5EF',
        'california-gold': '#E4B47C',
        'rooted-black': '#242424',
        'deep-navy': '#1a1a2e',
        'campaign-bg': '#1a1a1a',     // dark background
        'campaign-text': '#ffffff',   // white text
      },
    },
  },
  plugins: [],
}
