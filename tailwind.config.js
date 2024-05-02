
const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./modules/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
     
    },
    fontFamily: {
      'monte':['monte','serif'],
      'monte-1':['monte-1','serif'],
      'monte-2':['monte-2','serif'],
      'monte-3':['monte-3','serif'],
      'monte-4':['monte-4','serif'],
      
    },
    screens: {
      "4xs":"176px",
      "3xs":"260px",
       "2xs":"340px",
       "xs":"520px",
       "sm":"640px",
       "md":"768px",
       "lg":"1024px",
       "xl":"1280px",
       "2xl":"1536px",
    },
  },
  plugins: [],
});