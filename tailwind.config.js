/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
darkMode: 'selector',
  theme: {
    extend: {
      spacing: {
        100: '400px',
        112: '448px',
        128: '512px',
        144: '576px',
        160: '640px',
        192: '768px',
        224: '896px',
        256: '1024px',
      },
    },
  },
  plugins: [],
}

