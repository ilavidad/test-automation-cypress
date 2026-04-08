# Test Automation Cypress

## Objective

Build a maintainable Cypress + Cucumber end-to-end automation suite for the OpenCart demo site.
The goal is to validate representative ecommerce behavior while keeping scenarios readable, reusable, and realistic for a technical QA automation assessment.

## Selected Flows

- Login: validates that an existing user can sign in successfully.
- Add To Cart: configures `Canon EOS 5D` with option `Blue` and quantity `4`, adds it to the cart, and validates the configured item in the cart view.
- Compare Products: adds `Canon EOS 5D` and `Nikon D300` to product comparison from the Cameras category and validates both products in the comparison view.

## Why These Flows

These flows cover important ecommerce risks without requiring admin access or database control:

- Login validates authentication with environment-driven credentials.
- Add To Cart validates product configuration, AJAX cart submission, cart navigation, and cart detail assertions.
- Compare Products validates category navigation, repeated product actions, and comparison page assertions.

Together, they exercise navigation, form input, asynchronous network behavior, UI feedback, and final-state validation.

## Technical Decisions

- Cypress was selected for browser-level E2E coverage, automatic waiting, network interception, and straightforward debugging.
- Gherkin/Cucumber was used to keep business intent readable while keeping implementation details in step definitions and reusable commands.
- Reusable commands are split by responsibility under `cypress/support/commands/`: auth, navigation, product actions, cart assertions, and comparison actions/assertions.
- Static demo-site data is centralized in `cypress/support/test-data.js` so product IDs, routes, category paths, and cart configuration are not duplicated across steps.
- The Add To Cart flow validates the cart add request with `cy.intercept()` before asserting UI state, which gives a stronger signal than relying only on DOM changes.
- Link normalization is used for demo-site links that point to `http://opencart.abstracta.us:80`, preventing protocol/port redirects from making Cypress wait on unstable page loads.
- Page objects were intentionally not introduced yet. The suite is still small, and custom commands provide enough reuse without adding unnecessary layers.

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
    commands/
      auth.js
      cart.js
      comparison.js
      navigation.js
      product-actions.js
    commands.js
    e2e.js
    test-data.js
.github/
  workflows/
    cypress.yml
```

Key responsibilities:

- `*.feature`: business-readable scenarios.
- `step_definitions/`: declarative glue between Gherkin and Cypress commands.
- `support/commands.js`: command registry loaded by Cypress.
- `support/commands/`: reusable domain actions and assertions grouped by responsibility.
- `support/test-data.js`: centralized routes and stable demo-site data.
- `support/e2e.js`: global Cypress support configuration.
- `.github/workflows/cypress.yml`: CI execution on push and pull request.

## Test Data Strategy

The project keeps public, stable demo-site values in `cypress/support/test-data.js`:

- `routes`: application paths used by the flows.
- `catalog`: category and product metadata used for navigation and comparison.
- `cartItems`: product configuration used by the Add To Cart flow.
- `users`: environment variable keys used to read credentials safely.

Credentials are intentionally not stored in source control. Local runs use `cypress.env.json`; CI uses GitHub Actions secrets.

## Execution

Install dependencies:

```bash
npm install
```

Create a local `cypress.env.json` file in the project root:

```json
{
  "validUser": {
    "email": "your-test-email@example.com",
    "password": "your-test-password"
  }
}
```

Run all tests headlessly:

```bash
npm run test
```

Open Cypress interactively:

```bash
npm run dev
```

Run a specific flow:

```bash
npm run test:login
npm run test:add-to-cart
npm run test:compare
```

For GitHub Actions, configure these repository secrets:

- `OPENCART_TEST_EMAIL`
- `OPENCART_TEST_PASSWORD`

## Known Issues / Assumptions

- The OpenCart site is a public demo environment, so availability, test data, and response times can vary.
- The login flow assumes the configured test user exists and remains valid in the demo environment.
- Cypress may show an `allowCypressEnv` warning because the Cucumber preprocessor currently uses `Cypress.env()` internally. The warning does not fail the suite.
- The support file ignores only the external `pagespeed is not defined` application error emitted by the target OpenCart demo site. This is a scoped workaround for the AUT, not a generic production-testing pattern.
- Some demo-site links are normalized before clicking because this AUT includes `http://opencart.abstracta.us:80` links while the tests run against the HTTPS base URL.

## Future Improvements

- Add a controlled user setup strategy if a stable test environment becomes available.
- Add cleanup or isolated cart/session setup if more cart scenarios are introduced.
- Add CI artifacts for screenshots/videos on failure.
- Add reporting, such as JUnit or HTML output, for CI visibility.
- Introduce page objects only if the suite grows enough to justify another abstraction layer.
