const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const tailwindcss = require('tailwindcss')

module.exports = {
  plugins: [require('postcss-import'), tailwindcss, autoprefixer, cssnano]
}
