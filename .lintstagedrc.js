module.exports = {
  '*.{js,jsx,ts,tsx}': ['npx eslint --fix'],
  '*.{md,html,css,sass,scss,less,styl}': ['npx prettier --write'],
  '*.{css,sass,scss,less,styl}': ['npx stylelint'],
}
