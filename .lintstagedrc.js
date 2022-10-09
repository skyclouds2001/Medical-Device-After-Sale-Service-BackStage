module.exports = {
  '*.{js,jsx,ts,tsx}': ['npx eslint --fix'],
  '*.{js,jsx,ts,tsx,md,html,css,sass,scss,less,styl,json}': ['npx prettier --write'],
  '*.{css,sass,scss,less,styl}': ['stylelint']
}
