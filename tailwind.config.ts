import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef9f0',
          100: '#fef3d9',
          200: '#fde4b8',
          300: '#fbce8a',
          400: '#f8b454',
          500: '#f59a2e',
          600: '#e07e1f',
          700: '#b85f1a',
          800: '#91451b',
          900: '#76381b',
        },
        brand: {
          orange: '#f97316',
          amber: '#fcd34d',
          cream: '#fffbeb',
          brown: '#451a03',
          accent: '#fb923c',
        },
        cream: '#FDF8F0',
        beige: '#F5EDE0',
        brown: {
          50: '#faf8f5',
          100: '#f3ede5',
          200: '#e6d9c8',
          300: '#d4bfa5',
          400: '#c1a17d',
          500: '#b38960',
          600: '#9d7252',
          700: '#835f46',
          800: '#6d4f3d',
          900: '#5a4233',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.02em',
      },
      boxShadow: {
        lift: '0 12px 30px -12px rgba(249, 115, 22, 0.45)',
      },
      animation: {
        grain: 'grain 8s steps(8) infinite',
      },
      keyframes: {
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(2%, -3%)' },
          '50%': { transform: 'translate(-1%, 2%)' },
          '75%': { transform: 'translate(1%, 1%)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
