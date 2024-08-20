import {nextui} from '@nextui-org/theme';
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/[object Object].js"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily:{
        'epilogue': ['Epilogue', 'sans-serif'],
        "Poppins":["Poppins","sans-serif"]
      },
      colors:{
        "purposeBg":"#56CDAD1A",
        "pupose":"#56CDAD",
        "education":"#FFB836",
        "IT":"#4640DE",
        "manga":"#25324B"
       

      }
    }
  },
  plugins: [nextui()],
};
export default config;
