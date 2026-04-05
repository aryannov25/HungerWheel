/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./index.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        shimmer: "shimmer 2s infinite linear",
      },
      backgroundImage: {
        shimmer: "linear-gradient(to right, #f1f5f9 40%, #e2e8f0 50%, #f1f5f9 60%)",
      },
      backgroundSize: {
        "200%": "200%",
      },
    },
  },
  plugins: [],
};
