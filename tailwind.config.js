/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primaryGray: '#858585',
      },
      fontFamily: {
        'Manrope': ['ui-serif', 'Manrope'],
        'Biryani': ['ui-serif', 'Biryani'],
      },
      letterSpacing: {
        widest: '0.30em',
      },
      backgroundImage: {
        'heroBackground': "url('/public/background.png')",
        
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

