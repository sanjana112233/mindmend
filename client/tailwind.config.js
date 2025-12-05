
/** @type {import('tailwindcss').Config} **/
/*

original tailwind
export default {
    content: [
        "./index.html",
        "./src/**.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#4F46E5', // Indigo
                secondary: '#10B981', // Emerald
                background: '#F9FAFB',
                surface: '#ffffff',
            }
        },
    },
    plugins: [],
}
*/



/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Map Indigo to Rose/Pink
        indigo: colors.rose,
        slate: colors.zinc,     // Neutral grays
        violet: colors.fuchsia, // Accents become Purple
        rose: colors.red,       // Alerts
        amber: colors.orange,   // Gold becomes warmth
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Manrope', 'sans-serif'],
      }
    },
    borderRadius: {
        'xl': '1.5rem',
        '2xl': '2rem',
        '3xl': '3rem', // Makes cards look like bubbles
      }
  },
  plugins: [],
}