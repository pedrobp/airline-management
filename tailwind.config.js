/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#414141',
        secondary: '#808080',
        accent: '#4287f5',
        border: '#D0D0D0',
        background: '#D0D0D0',
        hover: 'rgba(0, 0, 0, 0.04)',
        'border-light': '#e7e7e7',
      },
    },
  },
  plugins: [],
};
