module.exports = {
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      presets: ['@babel/preset-react'],
    },
  },
  env: {
    browser: true,
  },
  rules: {
    'prettier/prettier': 'warn',
    'max-len': [1, 200],
    'no-shadow': 0,
    'no-plusplus': 0,
    'import/no-unresolved': 'off',
    'react/jsx-filename-extension': 'off',
    'react/function-component-definition': 'off',
    'eslintreact/jsx-props-no-spreading': 'off',
    'no-unused-vars': 'warn',
    'no-param-reassign': 'off',
    'react/prop-types': [
      1,
      {
        skipUndeclared: true,
      },
    ],
    'import/prefer-default-export': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/no-array-index-key': 'off',
    'no-restricted-syntax': 'off',
    'no-await-in-loop': 'off',
  },
}
