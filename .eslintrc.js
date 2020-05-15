module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
    mocha: true,
  },
  extends: ['plugin:vue/essential', '@vue/standard', '@vue/prettier'],
  plugins: ['import'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'prettier/prettier': [
      1,
      {
        printWidth: 80,
        singleQuote: true,
        trailingComma: 'all',
        semi: true,
        arrowParens: 'avoid',
        htmlWhitespaceSensitivity: 'ignore',
      },
    ],
    'no-console': 1,
    'no-debugger': 2,
    'no-alert': 1,
    'no-param-reassign': 0,
    'no-irregular-whitespace': 0,
    'no-unused-vars': [2, { argsIgnorePattern: '^_' }],
    'prefer-arrow-callback': 1,
    'prefer-spread': 1,
    'prefer-template': 1,
    'prefer-const': 2,
    'no-underscore-dangle': 0,
    camelcase: 0,

    // vue
    'vue/attributes-order': 0,
    'vue/attribute-hyphenation': 0,
    'vue/html-closing-bracket-spacing': 2,

    // import
    'import/prefer-default-export': 0,
    'import/extensions': [
      'off',
      'always',
      {
        js: 'never',
        vue: 'never',
      },
    ],
    'import/order': [
      2,
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
      },
    ],
    'import/newline-after-import': 1,
    'import/no-dynamic-require': 1,
    'import/no-unresolved': 2,
    'import/first': 2,
    'import/no-extraneous-dependencies': 0,
    'import/no-named-as-default': 0,
  },
};
