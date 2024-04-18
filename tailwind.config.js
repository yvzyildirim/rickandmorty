/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3AB549',
      },
      backgroundImage: {
        'background-1': "url('/src/assets/images/background1.png')",
        'background-2': "url('/src/assets/images/background2.png')",
        'background-3': "url('/src/assets/images/background3.png')",
      },
    },
  },
  plugins: [],
}
