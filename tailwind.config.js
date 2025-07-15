/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [
        function({ addUtilities }) {
      const newUtilities = {
        '.bg-gradient-light': {
          background: 'linear-gradient(to right, white, #f9fafb)',
        },
        '.bg-gradient-medium': {
          background: 'linear-gradient(to bottom right, #ffffff, #e2e8f0)',
        },
        '.bg-gradient-blue': {
          background: 'linear-gradient(to bottom right, #eff6ff, #dbeafe)',
        },
        '.bg-gradient-slate': {
          background: 'linear-gradient(to bottom right, #e2e8f0, #cbd5e1)',
        },
        '.bg-gradient-dark': {
          background: 'linear-gradient(to bottom right, #1e293b, #334155)',
        },
        '.bg-gradient-sunset': {
          background: 'linear-gradient(to bottom right, #fef3c7, #fed7aa)', // Light yellow to light orange
        },
        '.bg-gradient-ocean': {
          background: 'linear-gradient(to bottom right, #dbeafe, #bfdbfe)', // Light blue to medium blue
        },
        '.bg-gradient-mint': {
          background: 'linear-gradient(to bottom right, #d1fae5, #a7f3d0)', // Light mint to medium mint
        },
        '.bg-gradient-lavender': {
          background: 'linear-gradient(to bottom right, #e0e7ff, #c7d2fe)', // Light purple to medium purple
        },
        '.bg-gradient-peach': {
          background: 'linear-gradient(to bottom right, #fef2f2, #fecaca)', // Light pink to light peach
        },
        '.bg-gradient-sky': {
          background: 'linear-gradient(to bottom right, #f0f9ff, #7dd3fc)', // Very light blue to bright sky blue
        },
        '.bg-gradient-emerald': {
          background: 'linear-gradient(to bottom right, #ecfdf5, #6ee7b7)', // Light emerald to bright emerald
        },
        '.bg-gradient-amber': {
          background: 'linear-gradient(to bottom right, #fffbeb, #fbbf24)', // Light amber to bright amber
        },
        '.bg-gradient-charcoal': {
          background: 'linear-gradient(to bottom right, #ffffff, #374151)', // White to medium gray
        },
        '.bg-gradient-steel': {
          background: 'linear-gradient(to bottom right, #f9fafb, #6b7280)', // Near white to medium gray
        },
      }
      addUtilities(newUtilities)
    }
  ],
}

