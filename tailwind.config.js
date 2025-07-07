/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // GOV.UK inspired color palette for the tutorial
        'gov-blue': '#1d70b8',
        'gov-blue-light': '#5694ca',
        'gov-blue-dark': '#003078',
        'gov-green': '#00703c',
        'gov-green-light': '#85994b',
        'gov-red': '#d4351c',
        'gov-red-light': '#f3a2a2',
        'gov-yellow': '#ffbf47',
        'gov-grey': '#626a6e',
        'gov-grey-light': '#f3f2f1',
        'gov-grey-dark': '#0b0c0c',
        'gov-white': '#ffffff',
        'gov-black': '#0b0c0c',
        
        // Tutorial-specific colors (using GOV.UK palette)
        'tutorial-primary': '#1d70b8', // gov-blue
        'tutorial-secondary': '#00703c', // gov-green
        'tutorial-accent': '#003078', // gov-blue-dark
        'tutorial-warning': '#ffbf47', // gov-yellow
        'tutorial-error': '#d4351c', // gov-red
        'tutorial-success': '#00703c', // gov-green
      },
      fontFamily: {
        'gov': ['"GDS Transport"', 'arial', 'sans-serif'],
        'mono': ['Monaco', 'Menlo', 'Consolas', 'monospace'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}