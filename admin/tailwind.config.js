/** @type {import('tailwindcss').Config} */
export default  {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}*",
  ],
  theme: {
    extend: {colors: {
        'dark-red': '#8B0000', 
        'dark-red-light': '#A52A2A', 
        'gold': '#c4ba45', 
       
      },},
  },
  plugins: [],
}
