import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        editor: {
          bg: '#1E1E1E',
          text: '#D4D4D4',
          keyword: '#FF79C6',
          string: '#9ECE6A',
          comment: '#6272A4',
          variable: '#BD93F9',
          function: '#50FA7B',
          operator: '#FF79C6',
          accent: '#FF79C6',
        },
        stone: {
          50: '#FAFAF9',
          100: '#F5F5F4',
          200: '#E7E5E4',
          300: '#D6D3D1',
          400: '#A8A29E',
          500: '#78716C',
          600: '#57534E',
          700: '#44403C',
          800: '#292524',
          900: '#1C1917',
          950: '#0C0A09',
        },
      },
      backgroundColor: {
        primary: '#1E1E1E',
        secondary: '#252526',
        accent: '#FF79C6',
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          "primary": "#FF79C6",
          "secondary": "#9ECE6A",
          "accent": "#BD93F9",
          "neutral": "#1E1E1E",
          "base-100": "#252526",
          "base-200": "#2D2D2D",
          "base-300": "#373737",
        }
      }
    ],
    darkTheme: "dark",
  }
}

export default config;
