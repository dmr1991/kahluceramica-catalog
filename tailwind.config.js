/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{ts,tsx,js,jsx}",
    "./src/components/**/*.{ts,tsx,js,jsx}",
    "./src/app/**/*.{ts,tsx,js,jsx}",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // TUS COLORES DE MARCA KAHLU
        arcilla: "#C4B490",
        terracota: "#A0623A",
        oliva: "#7B7B3E",
        arena: "#EDE0D4",
        agua: "#7BA9A5",
        "agua-dark": "#5E8E8A",
        crema: "#F5F0EB",
        carbon: "#3D3428",
        "carbon-light": "#6B5E4F",

        // COLORES DE SISTEMA (ESTO QUITA EL ERROR DE BORDER-BORDER)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        // Conexión con las fuentes de layout.tsx
        serif: ["var(--font-heading)", "serif"],
        sans: ["var(--font-body)", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
