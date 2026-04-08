const globals = require("globals");

module.exports = [
  {
    ignores: [
      "node_modules/**",
      "cypress/downloads/**",
      "cypress/reports/**",
      "cypress/screenshots/**",
      "cypress/videos/**",
    ],
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        ...globals.node,
        ...globals.browser,
        cy: "readonly",
        Cypress: "readonly",
      },
    },
    rules: {
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "no-undef": "error",
    },
  },
  {
    files: ["cypress/support/e2e.js"],
    languageOptions: {
      sourceType: "module",
    },
  },
];
