module.exports = {
  '*.{js,mjs,ts,tsx}': ['npx eslint --fix', 'prettier --write'],
  '*.nr': () => 'cd circuit && nargo fmt',
  '*.sol': ['npx hardhat check --fix', 'prettier --write'],
  '*.{json,md,yml,yaml}': ['prettier --write'],
};
