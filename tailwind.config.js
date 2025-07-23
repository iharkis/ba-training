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
        // Warmer, friendlier color palette - still accessible but less intimidating
        'gov-blue': '#2563eb', // Warmer blue (was #1d70b8)
        'gov-blue-light': '#60a5fa', // Softer light blue (was #5694ca)
        'gov-blue-dark': '#1e40af', // Less harsh dark blue (was #003078)
        'gov-green': '#16a34a', // Friendlier green (was #00703c)
        'gov-green-light': '#4ade80', // Brighter success green (was #85994b)
        'gov-red': '#dc2626', // Less aggressive red (was #d4351c)
        'gov-red-light': '#fca5a5', // Gentler error background (was #f3a2a2)
        'gov-yellow': '#f59e0b', // Warmer orange-yellow (was #ffbf47)
        'gov-grey': '#6b7280', // Softer grey (was #626a6e)
        'gov-grey-light': '#f9fafb', // Cleaner light background (was #f3f2f1)
        'gov-grey-dark': '#374151', // Less harsh dark text (was #0b0c0c)
        'gov-white': '#ffffff',
        'gov-black': '#111827', // Softer black (was #0b0c0c)
        
        // Tutorial-specific colors - warmer and more approachable
        'tutorial-primary': '#3b82f6', // Friendly primary blue
        'tutorial-secondary': '#16a34a', // Encouraging green
        'tutorial-accent': '#6366f1', // Approachable indigo
        'tutorial-warning': '#f59e0b', // Gentle warning amber
        'tutorial-error': '#ef4444', // Kind error red
        'tutorial-success': '#22c55e', // Celebrating success green
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
        bounceGentle: {
          '0%': { transform: 'scale(0.9)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
        pulseSuccess: {
          '0%': { boxShadow: '0 0 0 0 rgba(34, 197, 94, 0.4)' },
          '70%': { boxShadow: '0 0 0 10px rgba(34, 197, 94, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(34, 197, 94, 0)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-3deg)' },
          '75%': { transform: 'rotate(3deg)' },
        },
        celebrate: {
          '0%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.1) rotate(-2deg)' },
          '50%': { transform: 'scale(1.15) rotate(2deg)' },
          '75%': { transform: 'scale(1.05) rotate(-1deg)' },
          '100%': { transform: 'scale(1) rotate(0deg)' },
        },
      },
    },
  },
  plugins: [],
}