/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./js/*.js"],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        secondary: '#ec4899',
        accent: '#f59e0b',
        success: '#10b981',
        dark: '#1f2937',
        // Your custom color variables
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
        }
      }
    },
  },
  plugins: [],
}