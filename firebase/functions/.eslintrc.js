module.exports = {
  root: false,
  env: {
    es6: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  extends: ['airbnb', 'eslint:recommended', 'plugin:prettier/recommended'],
  rules: {
    'no-restricted-globals': ['error', 'name', 'length'],
    'prefer-arrow-callback': 'error'
  },
  overrides: [
    {
      files: ['**/*.spec.*'],
      env: {
        mocha: true
      },
      rules: {}
    }
  ],
  globals: {}
};
