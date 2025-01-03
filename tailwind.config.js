/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}", // For `app` directory in Next.js 13+
  ],
  theme: {
    extend: {
      keyframes: {
        glitter: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '50px 50px' },
        },
      },
      animation: {
        glitter: 'glitter 2s linear infinite',
      },
    },
  },
  plugins: [],
};
