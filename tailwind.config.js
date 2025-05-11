/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EDF7ED',
          100: '#D1EAD2',
          200: '#B3DCB5',
          300: '#95CE97',
          400: '#81C784', // Main primary
          500: '#66BB6A',
          600: '#4CAF50',
          700: '#388E3C',
          800: '#2E7D32',
          900: '#1B5E20',
        },
        secondary: {
          50: '#E3F2FD',
          100: '#BBDEFB',
          200: '#90CAF9',
          300: '#64B5F6',
          400: '#42A5F5',
          500: '#2196F3',
          600: '#1E88E5',
          700: '#1976D2',
          800: '#1565C0', // Main secondary
          900: '#0D47A1',
        },
        earth: {
          50: '#EFEBE9',
          100: '#D7CCC8',
          200: '#BCAAA4',
          300: '#A1887F',
          400: '#8D6E63',
          500: '#795548', // Main earth
          600: '#6D4C41',
          700: '#5D4037',
          800: '#4E342E',
          900: '#3E2723',
        },
        success: {
          50: '#E8F5E9',
          100: '#C8E6C9',
          500: '#4CAF50',
          700: '#388E3C',
        },
        warning: {
          50: '#FFF8E1',
          100: '#FFECB3',
          500: '#FFC107',
          700: '#FFA000',
        },
        error: {
          50: '#FFEBEE',
          100: '#FFCDD2',
          500: '#F44336',
          700: '#D32F2F',
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