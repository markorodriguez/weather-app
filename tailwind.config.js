/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'night': '#303841',
        'space': '#3A4750',
        'myred': '#F73859',
        'light': '#EEEEEE'       

      }
    },
  },
  plugins: [],
}