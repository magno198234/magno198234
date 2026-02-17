import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#F9FAFB',
        primary: '#7C3AED',
        secondary: '#EC4899',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(90deg, #7C3AED 0%, #EC4899 100%)',
      },
    },
  },
  plugins: [],
} satisfies Config
