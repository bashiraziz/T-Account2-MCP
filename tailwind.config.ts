import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-bg-light)",
        textDark: "var(--color-text-light)",
        primary: "var(--color-primary)",
        primaryLight: "var(--color-primary-light)",
        secondary: "var(--color-secondary)",
        secondaryLight: "var(--color-secondary-light)",
      },
    },
  },
  plugins: [],
} satisfies Config;
