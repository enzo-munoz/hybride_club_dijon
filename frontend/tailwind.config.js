/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff4500', // Orange Hyrox
        secondary: '#1a1a1a', // Dark Grey
        background: '#0f0f0f', // Black
        text: '#f0f0f0',
        success: '#28a745',
        danger: '#dc3545',
      },
    },
  },
  plugins: [],
}
