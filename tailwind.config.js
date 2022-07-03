const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./libs/**/*.{html,ts}', './apps/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
