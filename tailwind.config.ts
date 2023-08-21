import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      xs: "550px",
      sm: "640px",
      md: "768px",
      mobileMenu: "1000px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1900px",
    },
  },
  plugins: [],
} satisfies Config;
