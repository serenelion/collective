/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F3F7F4',
          100: '#E1EDE3',
          200: '#C3DAC7',
          300: '#A5C7AB',
          400: '#87B48F',
          500: '#69A173',
          600: '#548E5C',
          700: '#3F6B45',
          800: '#2A482E',
          900: '#152517',
        },
        secondary: {
          50: '#F6F7F3',
          100: '#E8EDE1',
          200: '#D1DAC3',
          300: '#B9C8A5',
          400: '#A2B587',
          500: '#8BA369',
          600: '#748C54',
          700: '#5D6F43',
          800: '#3E4A2C',
          900: '#1F2516',
        },
        earth: {
          50: '#F7F4F3',
          100: '#EDE3E1',
          200: '#DAC7C3',
          300: '#C7ABA5',
          400: '#B48F87',
          500: '#A17369',
          600: '#8E5C54',
          700: '#6B453F',
          800: '#482E2A',
          900: '#251715',
        },
        success: {
          50: '#ECFDF3',
          100: '#D1FAE1',
          500: '#10B981',
          700: '#047857',
        },
        warning: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          500: '#F59E0B',
          700: '#B45309',
        },
        error: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          500: '#EF4444',
          700: '#B91C1C',
        },
      },
      animation: {
        'growth': 'growth 2s ease-in-out infinite',
      },
      keyframes: {
        growth: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
};