/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*"],
  theme: {
    extend: {
      backgroundImage:{
        'mobile-top': "url('/assets/images/bg-main-mobile.png')",
        'desktop-left': "url('/assets/images/bg-main-desktop.png')"
      }
    },
  },
  plugins: [],
}