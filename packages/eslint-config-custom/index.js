module.exports = {
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'next',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['react', '@typescript-eslint', 'prettier'],
  parser: '@typescript-eslint/parser',
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
      },
    },
  },
  rules: {
    'react/react-in-jsx-scope': 0,
    'import/extensions': 0,
    'react/function-component-definition': 0,
    'react/jsx-props-no-spreading': 0,
    'react/destructuring-assignment': 0,
    'no-template-curly-in-string': 0,
    'react/require-default-props': 0,
    'react/jsx-filename-extension': [
      0,
      {
        extensions: ['.ts', '.tsx'],
      },
    ],
    'import/no-unresolved': [
      0,
      {
        ignore: ['antd'],
      },
    ],
  },
  // rules: {
  //   semi: ['error', 'never'],
  //   quotes: ['error', 'single'],
  //   'arrow-body-style': 0,
  //   'consistent-return': 0,
  //   'global-require': 0,
  //   'import/extensions': 0,
  //   'import/no-unresolved': [
  //     0,
  //     {
  //       ignore: ['antd']
  //     }
  //   ],
  //   'import/no-extraneous-dependencies': 0,
  //   'import/prefer-default-export': 0,
  //   'no-console': ['error', { allow: ['error', 'info', 'warn'] }],
  //   'no-param-reassign': 0,
  //   'no-plusplus': 0,
  //   'no-useless-escape': 0,
  //   'no-unused-vars': 0,
  //   'no-restricted-exports': 0,
  //   'no-restricted-syntax': ['error', 'WithStatement'],
  //   'prettier/prettier': [
  //     'error',
  //     {
  //       semi: false,
  //       singleQuote: true,
  //       usePrettierrc: false,
  //       fileInfoOptions: {
  //         withNodeModules: true
  //       }
  //     }
  //   ],
  //   'react/function-component-definition': 0,
  //   'react/no-danger': 0,
  //   'react/jsx-fragments': 0,
  //   'react/jsx-filename-extension': [
  //     0,
  //     {
  //       extensions: ['.ts', '.tsx']
  //     }
  //   ],
  //   'react/jsx-no-useless-fragment': 0,
  //   'react/jsx-props-no-spreading': 0,
  //   'react/react-in-jsx-scope': 0,
  //   'react/require-default-props': 0,
  //   '@typescript-eslint/ban-types': 0,
  //   '@typescript-eslint/no-explicit-any': 0,
  //   '@typescript-eslint/no-empty-interface': 0,
  //   '@typescript-eslint/no-empty-function': 0,
  //   '@typescript-eslint/no-inferrable-types': 0,
  //   '@typescript-eslint/no-var-requires': 0,
  //   '@typescript-eslint/no-unused-vars': 'error',
  // }
};
