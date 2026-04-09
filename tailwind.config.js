/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        arcilla: "#C4B490",
        terracota: "#A0623A",
        oliva: "#7B7B3E",
        arena: "#EDE0D4",
        agua: "#7BA9A5",
        "agua-dark": "#5E8E8A",
        crema: "#F5F0EB",
        carbon: "#3D3428",
        "carbon-light": "#6B5E4F",
      },
    },
  },
  plugins: [],
};