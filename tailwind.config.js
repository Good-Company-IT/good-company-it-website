/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-poppins)', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'sans-serif'],
      },
      fontSizes: {
        'title-h1': '2.5rem', // 40px
        'title-h2': '2rem', // 32px
        'description-dark': '1.125rem', // 18px
        'description-light': '1rem', // 16px
        'cta-text': '1.125rem', // 18px
      },
      colors: {
        'primary-orange': '#FF4E00',
        'primary-blue': '#00B6F9',
        'secondary-orange': '#FF723F',
        'text-dark': '#1A1A1A',

        'title-h1': '#000000',
        'title-h2': '#000000',
        'description-dark': '#000000',
        'description-light': '#000000',


        'background': '#000000',
        'background-light': '#FFFFFF',
        'background-secondary': '#FFFFFF',


        'cta-bg': '#000000',
        'cta-bg-hover': '#000000',
        'cta-text': '#FFFFFF',
        'cta-text-hover': '#FFFFFF',
        'cta-text-disabled': '#FFFFFF',
        'cta-text-hover-disabled': '#FFFFFF',


        'secondary-cta-bg': '#000000',
        'secondary-cta-bg-hover': '#000000',
        'secondary-cta-text': '#FFFFFF',
        'secondary-cta-text-hover': '#FFFFFF',
        'secondary-cta-text-disabled': '#FFFFFF',

      },
      backgroundImage: {
        'gradient-light-orange': 'linear-gradient(169deg, #21024D 0%, #601436 19%, #AA2A1D 50%, #FF4300 75%, #FF8C62 94%)',
        'gradient-outline': 'linear-gradient(-113deg, #DBDDFB 0%, #555886 35%, #DBDDFB 99%)',
        'gradient-cards': 'linear-gradient(90deg, #FFFFFF 3%, #040B59 52%, #010425 100%)',
        'gradient-blue-1': 'linear-gradient(90deg, #040B59 0%, #024893 39%, #0094DC 58%, #00B2F9 79%, #91E0FF 95%)',
        'gradient-gray-3': 'linear-gradient(90deg, #FFFFFF 0%, #999999 100%)',
        'gradient-outline-4': 'linear-gradient(90deg, #DBDDFB 0%, #555886 35%, #DBDDFB 99%)',
        'gradient-radial-blue': 'radial-gradient(circle, #00B2F9 0%, #00AEF5 7%, #0088CD 11%, #0066AB 15%, #00498D 19%, #003174 24%, #001F62 30%, #001254 36%, #000B4D 45%, #01094B 61%, #000000 100%)',
      },
      animation: {
        'scroll-left': 'scroll-left 40s linear infinite',
      },
    },
  },
  plugins: [],
};