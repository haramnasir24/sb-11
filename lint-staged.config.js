/** @type {import('lint-staged').Config} */
module.exports = {
  "**/*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
  "**/*.{json,md,mdx,css,html,yml,yaml}": ["prettier --write"],
};
