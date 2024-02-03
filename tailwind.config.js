/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      animation: {
        shimmer: "shimmer 2s infinite linear",
      },
      backgroundImage: (theme) => ({
        shimmer:
          "linear-gradient(to right, #f8f8f8 40%, #ededed 50%, #f8f8f8 60%)",
      }),
      backgroundSize: {
        "200%": "200%",
      },
    },
  },
  plugins: [],
};
