/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      },
      colors: {
        anthropic: {
          bg: '#FDFCFB',
          sidebar: '#F2EEE8',
          card: '#FFFFFF',
          text: '#101010',
          muted: '#6B6965',
          border: '#E6E4DF',
          accent: '#D05A42',
          accentHover: '#B94B34',
          peach: '#D97757',
          peachLight: '#E8E4DD'
        }
      },
      boxShadow: {
        'claude': '0 4px 12px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.02)',
      }
    },
  },
  plugins: [],
}
