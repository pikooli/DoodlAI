/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        text: '2px 2px 4px rgba(255, 255, 255, 0.8)',
      },
      fontFamily: {
        'fredericka': ['Fredericka the Great', 'sans-serif'],
        'cabin': ['Cabin Sketch', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

