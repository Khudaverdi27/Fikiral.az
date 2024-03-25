/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'roboto': ['Roboto', 'system-ui',"serif"],
        'fransisco': ['San Francisco',"sans-serif"]},
      colors:{
        primaryGray: ' #262626'
        
      },
      letterSpacing: {
        widest: '0.30em',
      },
      backdropBrightness: {
        40: '.43',
       
      },
      rotate: {
        '35': '35deg',
      },
      backgroundImage: {
        'heroBg': "url('./public/static/images/bg.jpg')",
        
      },
    },
  },
  plugins: [],
}

