module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['security'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'standard-with-typescript',
    'plugin:security/recommended',
    'plugin:unicorn/all',
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'prettier', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  parserOptions: {
    project: 'tsconfig.json',
  },
  rules: {
    'security/detect-object-injection': 'off',
    'eslint(security/detect-object-injection)': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/ban-types': 'off',
    // '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-inferrable-types': 'off',
    'typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/class-name-casing': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/prefer-interface': 'off',

    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/method-signature-style': 'off',
    '@typescript-eslint/prefer-ts-expect-error': ['off'],
    '@typescript-eslint/ban-ts-comment': ['error'],
    '@typescript-eslint/restrict-template-expressions': ['off'],
    '@typescript-eslint/return-await': ['off'],
    '@typescript-eslint/prefer-nullish-coalescing': ['off'],
    '@typescript-eslint/no-dynamic-delete': ['off'],
    '@typescript-eslint/prefer-optional-chain': ['warn'],
    '@typescript-eslint/ban-types': ['error'],
    '@typescript-eslint/no-var-requires': ['warn'],
    '@typescript-eslint/no-invalid-void-type': ['off'],
    'no-console': 'error',
    '@typescript-eslint/no-unused-expressions': 'off',

    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'prettier/prettier': 'off',
    '@typescript-eslint/naming-convention': 'off',
    // '@typescript-eslint/no-object-literal-type-assertion': 'off',
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",

    //SECURITY
    'security/detect-non-literal-fs-filename': 'off',

    // UNICORN
    'unicorn/prefer-module': 'off',
    'unicorn/prefer-node-protocol': 'off',
    'unicorn/no-null': 'off',
    'unicorn/no-keyword-prefix': 'off',
    'unicorn/consistent-destructuring': 'off',
    'unicorn/prefer-at': 'off',
    'no-unreachable': 'error',
    'unicorn/prevent-abbreviations': [
      'error',
      {
        allowList: {
          GetCtx: true,
          getCtx: true,
          ctx: true,
          req: true,
          res: true,
          db: true,
          ref: true,
          Ref: true,
          params: true,
          Params: true,
        },
      },
    ],
  },
}
