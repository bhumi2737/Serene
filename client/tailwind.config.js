/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        serene: {
          bg:      '#FAFAF8',
          surface: '#F5F0EB',
          border:  '#E8E4DF',
          muted:   '#B0A99F',
          brown:   '#5C4F3D',
          sand:    '#E8E0D5',
          primary: '#1C1917',
        }
      }
    },
  },
  plugins: [],
}
