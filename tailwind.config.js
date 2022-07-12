/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './containers/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    // colors: {
    //   transparent: 'transparent',
    //   neutral: '#FFFFFF',
    //   'neutral-gray/10': '#FFFFFF',
    //   'neutral-gray/30': '#E9EDF1',
    //   'neutral-gray/40': '#D9E0E7',
    //   'neutral-gray/60': '#A09E9E;',
    //   'neutral-gray/70': '#627688',
    //   'neutral-gray/90': '#33414D',

    //   'primary-blue/20': '#CDDCFE',
    //   'primary-blue/100': '#036FCD',

    //   'neutral/400': '#9C9EB0',
    //   'neutral/500': '#6B6D80',
    //   'neutral/900': '#111327',

    //   'primary/40': '#E1E2EC',
    //   'primary/50': '#F9F9FB',
    //   'primary/200': '#ECEDF3',
    //   'primary/300': '##E6E7EF',
    //   'primary/400': '#E0E1EB',
    //   'primary/900': '#50537C',
    // },
    // borderColor: {
    //   neutral: '#FFFFFF',
    //   'neutral-gray/10': '#FFFFFF',
    //   'neutral-gray/30': '#E9EDF1',
    //   'neutral-gray/40': '#D9E0E7',
    //   'neutral-gray/60': '#A09E9E;',
    //   'neutral-gray/70': '#627688',
    //   'neutral-gray/90': '#33414D',

    //   'primary-blue/20': '#CDDCFE',
    //   'primary-blue/100': '#036FCD',

    //   'neutral/400': '#9C9EB0',
    //   'neutral/500': '#6B6D80',
    //   'neutral/900': '#111327',

    //   'primary/40': '#E1E2EC',
    //   'primary/50': '#F9F9FB',
    //   'primary/200': '#ECEDF3',
    //   'primary/300': '##E6E7EF',
    //   'primary/400': '#E0E1EB',
    //   'primary/900': '#50537C',
    // },
  },
  plugins: [],
};
