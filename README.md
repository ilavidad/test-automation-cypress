# Test Automation Cypress

End-to-end test automation project for the OpenCart demo site using Cypress and Gherkin.

## Objective

Validate representative user journeys in a public ecommerce demo while keeping the test code readable, maintainable, and easy to extend.

## Selected Flows

- Login: validates that an existing user can sign in successfully.
- Add To Cart: configures `Canon EOS 5D`, adds it to the cart, and validates the configured product in the cart view.
- Compare Products: compares `Canon EOS 5D` and `Nikon D300` from the Cameras category.

## Why These Flows

These scenarios cover core ecommerce behavior without requiring admin access or changing the application under test: authentication, product configuration, cart validation, and product comparison.

## Tech Stack

- Cypress
- Gherkin / Cucumber
- @badeball/cypress-cucumber-preprocessor
- @bahmutov/cypress-esbuild-preprocessor

## Test Site

Base URL: `https://opencart.abstracta.us`

## Project Structure

```text
cypress/
  e2e/
    add-to-cart.feature
    compare-products.feature
    login.feature
    step_definitions/
      add-to-cart.js
      compare-products.js
      login.js
  support/
    commands.js
    e2e.js
    test-data.js
```

Key responsibilities:

- `*.feature`: business-readable scenarios.
- `step_definitions/`: glue between Gherkin steps and Cypress actions.
- `support/commands.js`: reusable Cypress commands for domain actions.
- `support/test-data.js`: stable demo-site routes, products, categories, and product configuration data.
- `support/e2e.js`: global Cypress support configuration.

## Setup

Install dependencies:

```bash
npm install
```

Create a `cypress.env.json` file in the project root. Use `cypress.env.example.json` as a template:

```json
{
  "validUser": {
    "email": "your-test-email@example.com",
    "password": "your-test-password"
  }
}
```

`cypress.env.json` is ignored by Git and should not be committed.

## Run Tests

Run all tests in headless mode:

```bash
npm.cmd run test
```

Open Cypress in interactive mode:

```bash
npm.cmd run dev
```

Run a specific flow:

```bash
npm.cmd run test:login
npm.cmd run test:add-to-cart
npm.cmd run test:compare
```

## Notes

The OpenCart demo site is public and can be unstable. The suite includes small workarounds for demo-site behavior, such as ignoring the external `pagespeed is not defined` error and normalizing links that point to `http://opencart.abstracta.us:80`.

Cypress may show an `allowCypressEnv` warning because the Cucumber preprocessor currently relies on `Cypress.env()` internally. The warning does not fail the tests.

## Future Improvements

- Replace public demo credentials with a controlled test user lifecycle if the environment allows it.
- Add retry-safe setup or cleanup for cart state if more cart scenarios are added.
- Add reporting for CI execution.
- Introduce page objects only if flows grow enough to justify another abstraction layer.
