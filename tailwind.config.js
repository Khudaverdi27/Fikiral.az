/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      
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
    
    },
  },
  plugins: [],
}

