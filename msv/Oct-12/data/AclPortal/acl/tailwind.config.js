/** @type {import('tailwindcss').Config} */
export default {
  // content: ["./src/**/*.{html,js, jsx}"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'footer-texture': "url('/src/Images/Mask Group.png')",
      }
    },
  },
  plugins: [],
}

