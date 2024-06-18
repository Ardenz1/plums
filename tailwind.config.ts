import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        customSpinAnimation: {
          '0%, 100%': {
            transform: 'rotateY(0deg)',
          },
          '50%': {
            transform: 'rotateY(180deg)',
          },
        },
      },
      animation: {
        customSpinAnimation: 'customSpinAnimation 1s ease-in-out',
      },
      colors: {
        "plum-300": '#3E0B5E',
        "plum-200": '#AF95E2',
        "plum-100": '#E3D9F6',
        "leaf-300": '#224C25',
        "leaf-200": '#CAE894',
        "leaf-100": '#F2FBF2',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
