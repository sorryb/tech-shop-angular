const defaultTheme = require('tailwindcss/defaultTheme');

const tailwindConfig = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
  },
};

module.exports = tailwindConfig;
exports.default = tailwindConfig;
