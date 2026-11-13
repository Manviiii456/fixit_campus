/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        campus: {
          navy: '#172554',
          'navy-light': '#1e3a8a',
          'navy-dark': '#0f172a',
          blue: '#2563EB',
          'blue-hover': '#1d4ed8',
          bg: '#F5F7FB',
          slate: '#1e293b',
          'slate-muted': '#64748b',
          border: '#e2e8f0',
        },
        status: {
          pending: '#F97316',
          'pending-bg': '#FFF7ED',
          'pending-border': '#FED7AA',
          progress: '#2563EB',
          'progress-bg': '#EFF6FF',
          'progress-border': '#BFDBFE',
          resolved: '#16A34A',
          'resolved-bg': '#F0FDF4',
          'resolved-border': '#BBF7D0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

