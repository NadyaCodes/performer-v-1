import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
        spacing: {
          '18': '4.5rem',
          '86': '22rem',
          '128': '32rem',
          '136': '34rem',
          '160': '40rem',
          '200': '50rem'
        }
    },
    screens: {
      xxs: "350px",
      xs: "550px",
      sm: "640px",
      md: "768px",
      mobileMenu: "1000px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1900px",
      "4xl": "2560px"
    },
  },
  plugins: [],
} satisfies Config;
