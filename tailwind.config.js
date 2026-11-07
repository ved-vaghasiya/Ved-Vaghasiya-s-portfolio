/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#101010',
          50: '#1c1c1c',
          100: '#181818',
          200: '#141414',
          300: '#101010',
          surface: '#151515',
          card: '#181818',
          border: '#262626',
          borderMuted: '#1f1f1f',
        },
        accent: {
          red: '#D93636',
          'red-glow': '#ff4d4d',
          'red-dark': '#8c1f1f',
          blue: '#3B82F6',
          green: '#10B981',
          amber: '#F59E0B',
          pink: '#EC4899',
          purple: '#8B5CF6',
        },
        light: {
          DEFAULT: '#F2EEE8',
          muted: '#858585',
          subtle: '#525252',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
        condensed: ['"Bebas Neue"', 'Oswald', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        widest: '0.25em',
        ultra: '0.35em',
      }
    },
  },
  plugins: [],
}
