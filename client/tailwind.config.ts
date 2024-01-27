import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "mild-red": "#EFBFB1",
      },
      fontFamily: {
        Limelight: ["Limelight", "cursive"],
      },
      screens: {
        phone: "200px",
        // => @media (min-width: 640px) { ... }
      },
    },
  },
  plugins: [],
};
export default config;
