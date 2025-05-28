// client-app/tailwind.config.js (Versi Diperbaiki untuk folder 'src')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Tambahkan 'src/' di awal path
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};