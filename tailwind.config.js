/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        stone: {
          950: '#0c0a09',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#fff',
            a: {
              color: '#10b981',
              '&:hover': {
                color: '#34d399',
              },
            },
            h1: {
              color: '#fff',
            },
            h2: {
              color: '#fff',
            },
            h3: {
              color: '#fff',
            },
            strong: {
              color: '#fff',
            },
            code: {
              color: '#fff',
            },
            blockquote: {
              color: '#d1d5db',
            },
          },
        },
      },
      fontFamily: {
        handwriting: ['Indie Flower', 'cursive'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
