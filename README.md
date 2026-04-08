# Test Automation Cypress

Automated end-to-end tests for the OpenCart demo site using Cypress and Gherkin.

## Tech Stack

- Cypress
- Gherkin / Cucumber
- @badeball/cypress-cucumber-preprocessor
- @bahmutov/cypress-esbuild-preprocessor

## Test Site

Base URL:

```text
https://opencart.abstracta.us
```

## Test Scenarios

- Login
  - Valid user login
- Add To Cart
  - Configure Canon EOS 5D with option Blue and quantity 4
  - Add product to cart
  - Validate product in cart view
- Compare Products
  - Add Canon EOS 5D and Nikon D300 to product comparison
  - Validate both products in comparison view

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
    e2e.js
    commands.js
```

## Setup

Install dependencies:

```bash
npm install
```

## Run Tests

Run all tests in headless mode:

```bash
npm.cmd run test
```

Run Cypress in interactive mode:

```bash
npm.cmd run dev
```

Run a specific feature:

```bash
npm.cmd run test -- --spec cypress/e2e/add-to-cart.feature
npm.cmd run test -- --spec cypress/e2e/compare-products.feature
npm.cmd run test -- --spec cypress/e2e/login.feature
```

## Environment Data

Create a `cypress.env.json` file in the project root to store local test credentials.

Example:

```json
{
  "validUser": {
    "email": "your-test-email@example.com",
    "password": "your-test-password"
  }
}
```

This file is ignored by Git and should not be committed.

## Notes

The OpenCart demo site is public and can be unstable. Some tests include small workarounds for demo-site behavior, such as handling a `pagespeed is not defined` application error and normalizing links that point to `http://opencart.abstracta.us:80`.
