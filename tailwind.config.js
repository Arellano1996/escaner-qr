/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
    "./public/**/*.html",
    "./src/**/*.vue"
  ],
  theme: {
    extend: {
      keyframes: {
        uno: {
          '0%': { left: '0vw', top: '0vh' },
          '10%': { left: '10vw', top: '10vh' },
          '25%': { left: '-30vw', top: '30vh' },
          '40%': { left: '-10vw', top: '70vh' },
          '60%': { left: '20vw', top: '60vh' },
          '80%': { left: '30vw', top: '30vh' },
          '100%': { left: '0vw', top: '0vh' },
        },

        dos: {
          '0%': { left: '0vw', top: '0vh' },
          '15%': { left: '20vw', top: '5vh' },
          '30%': { left: '40vw', top: '15vh' },
          '50%': { left: '60vw', top: '70vh' },
          '70%': { left: '30vw', top: '90vh' },
          '90%': { left: '10vw', top: '50vh' },
          '100%': { left: '0vw', top: '0vh' },
        },

        tres: {
          '0%': { left: '0vw', top: '0vh' },
          '20%': { left: '-20vw', top: '5vh' },
          '35%': { left: '-40vw', top: '50vh' },
          '55%': { left: '-10vw', top: '90vh' },
          '75%': { left: '20vw', top: '60vh' },
          '95%': { left: '0vw', top: '30vh' },
          '100%': { left: '0vw', top: '0vh' },
        },
        
        scan: {
          '0%': { top: '50%', opacity: '0' },
          
          '40%': { top: '50%', opacity: '0' },
          
          '45%': { top: '50%', opacity: '1' },
          '48%': { top: '0%', opacity: '1' },
          '52%': { top: '100%', opacity: '1' },
          '55%': { top: '50%', opacity: '1' },
          
          '60%': { top: '50%', opacity: '0' },
          
          '100%': { top: '50%', opacity: '0' },
        },
        
        breath: {
          '0%': { opacity: '0.1' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0.1' },
        }


        
      },
      animation: {
        uno: 'uno 12s infinite',
        dos: 'dos 14s infinite',
        tres: 'tres 16s infinite',
        scan: 'scan 6s infinite',
        breath: 'breath 2.7s infinite',
      },
    },
  },
  plugins: [
  ],
}




