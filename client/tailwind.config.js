/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        serene: {
          bg: 'var(--bg)',
          surface: 'var(--surface)',
          primary: 'var(--primary)',
          primarySoft: 'var(--primary-soft)',
          secondary: 'var(--secondary)',
          accent: 'var(--accent)',
          text: 'var(--text)',
          muted: 'var(--muted)',
          border: 'var(--border)',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        serif: ['Lora', 'serif'],
      },
      fontSize: {
        xs: ['0.9375rem', { lineHeight: '1.35rem' }],   // 15px
        sm: ['1.0625rem', { lineHeight: '1.5rem' }],    // 17px
        base: ['1.1875rem', { lineHeight: '1.75rem' }], // 19px
        lg: ['1.3125rem', { lineHeight: '1.875rem' }], // 21px
        xl: ['1.5rem', { lineHeight: '2.1rem' }],       // 24px
        '2xl': ['1.875rem', { lineHeight: '2.4rem' }],  // 30px
        '3xl': ['2.375rem', { lineHeight: '2.8rem' }],  // 38px
        '4xl': ['3rem', { lineHeight: '3.3rem' }],      // 48px
        '5xl': ['3.875rem', { lineHeight: '1.1' }],     // 62px
        '6xl': ['5rem', { lineHeight: '1.1' }],         // 80px
      }
    },
  },
  plugins: [],
}
