# Test Automation Cypress

## Objective

Deliver a lightweight, maintainable Cypress + Cucumber E2E suite for the OpenCart demo site.
The project is intentionally small, but structured to show clear automation design decisions, practical risk management, and CI readiness.

## Scope

The suite covers three business flows against `https://opencart.abstracta.us`:

- Login
- Add To Cart
- Compare Products

The goal is not exhaustive coverage. The goal is to demonstrate representative ecommerce automation with clean structure and realistic constraints.

## Selected Flows

- Login: validates that an existing user can authenticate successfully.
- Add To Cart: configures `Canon EOS 5D` with option `Blue` and quantity `4`, adds it to the cart, and validates the configured item in the cart view.
- Compare Products: adds `Canon EOS 5D` and `Nikon D300` to comparison from the Cameras category and validates both products in the comparison view.

## Why These Flows

- Login protects a critical entry point and confirms that test credentials are wired through environment-driven configuration instead of source-controlled secrets.
- Add To Cart covers product configuration, quantity input, AJAX cart submission, cart dropdown navigation, and final cart-state validation.
- Compare Products covers category navigation, repeated product actions, user feedback, and comparison-page assertions.

Together, these flows exercise UI navigation, form input, async network behavior, link handling, and final-state assertions without needing admin access or database control.

## Technical Decisions

- Cypress was chosen for browser-level E2E automation, automatic waiting, network interception, fast feedback, and straightforward local debugging.
- Cucumber/Gherkin was used to keep scenario intent readable for both QA and non-QA reviewers while keeping implementation detail out of feature files.
- Reusable commands and assertions were introduced to keep step definitions declarative and prevent selectors/actions from spreading across the suite.
- Test data was centralized in domain-oriented modules so routes, products, product configuration, comparison sets, and user env keys can be maintained in one place.
- The Add To Cart flow uses `cy.intercept()` to validate the cart-add network response before asserting UI state, reducing the risk of false confidence from DOM-only checks.
- AUT-specific link normalization is isolated in a utility because the demo site exposes some `http://opencart.abstracta.us:80` links while the suite runs against HTTPS.
- Page objects were intentionally not introduced. For this project size, commands + assertions + domain data provide enough structure without turning the challenge into a heavy framework.

## Architecture Overview

```text
.
|-- .cypress-cucumber-preprocessorrc.json
|-- .github/
|   `-- workflows/
|       `-- cypress.yml
|-- cypress.config.js
|-- eslint.config.js
|-- package.json
|-- package-lock.json
|-- scripts/
|   |-- run-cypress.js
|   `-- validate-env.js
|-- README.md
`-- cypress/
    |-- e2e/
    |   |-- features/
    |   |   |-- add-to-cart.feature
    |   |   |-- compare-products.feature
    |   |   `-- login.feature
    |   `-- step_definitions/
    |       |-- add-to-cart.js
    |       |-- compare-products.js
    |       `-- login.js
    `-- support/
        |-- assertions/
        |   |-- auth.assertions.js
        |   |-- cart.assertions.js
        |   |-- comparison.assertions.js
        |   `-- product.assertions.js
        |-- commands/
        |   |-- auth.commands.js
        |   |-- cart.commands.js
        |   |-- comparison.commands.js
        |   |-- navigation.commands.js
        |   `-- product.commands.js
        |-- data/
        |   |-- comparison.data.js
        |   |-- products.data.js
        |   |-- routes.data.js
        |   `-- users.data.js
        |-- utils/
        |   |-- demo-site-workarounds.js
        |   `-- link-normalization.js
        |-- commands.js
        `-- e2e.js
```

Ignored local/runtime files:

```text
cypress.env.json
cypress/screenshots/
cypress/videos/
cypress/downloads/
cypress/reports/
node_modules/
```

Design flow:

```text
Feature files -> Step definitions -> Commands / Assertions -> Data / Utils
```

This keeps business intent, actions, validations, test data, and AUT workarounds separated without adding unnecessary framework layers.

## Test Data Strategy

Public demo-site data is grouped by domain:

- `routes.data.js`: OpenCart paths used by the flows.
- `products.data.js`: product metadata and product configurations.
- `comparison.data.js`: comparison sets and category context.
- `users.data.js`: environment variable keys for user credentials.

Credentials are not stored in source control. Local runs use `cypress.env.json`; CI uses GitHub Actions secrets.
The runner validates required credentials before executing Cypress, so missing config fails early with a clear error instead of failing inside a scenario.

Local `cypress.env.json` example:

```json
{
  "validUser": {
    "email": "your-test-email@example.com",
    "password": "your-test-password"
  }
}
```

Required CI secrets:

- `OPENCART_TEST_EMAIL`
- `OPENCART_TEST_PASSWORD`

Validate the local/CI credential setup without running Cypress:

```bash
npm run validate:env
```

## Workaround Strategy for Demo AUT

The target application is a public demo site, so the suite contains controlled, AUT-specific mitigations:

- `pagespeed is not defined` is ignored only through `demo-site-workarounds.js` because it is emitted by the demo site and is unrelated to the tested behavior.
- Demo-site links that point to `http://opencart.abstracta.us:80` are normalized through `link-normalization.js` before clicking, avoiding protocol/port redirects that can make Cypress wait on unstable page loads.

These workarounds are intentionally scoped to this AUT and should not be treated as generic exception-handling patterns for production-grade systems.

Local Cypress execution also goes through `scripts/run-cypress.js`, which removes `ELECTRON_RUN_AS_NODE` only for the Cypress child process. This keeps the local Electron workaround isolated from test logic and does not change the test scenarios or framework structure.

## Execution

Install dependencies:

```bash
npm install
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

Run quality checks:

```bash
npm run lint
npm run format:check
```

Auto-fix lint and formatting issues:

```bash
npm run lint:fix
npm run format
```

## Test Reports

Cucumber HTML and JSON reports are generated automatically when Cypress runs:

```text
cypress/reports/cucumber-report.html
cypress/reports/cucumber-report.json
```

Generate the report:

```bash
npm run test
```

Open the HTML report from the project root:

```powershell
start cypress\reports\cucumber-report.html
```

The report folder is ignored by Git and uploaded as a GitHub Actions artifact. Cypress screenshots and videos keep their current behavior and are still uploaded on CI failure when available.

## CI / Automation Execution

GitHub Actions runs Cypress on `push` and `pull_request` using `.github/workflows/cypress.yml`.
The pipeline installs dependencies, checks formatting, runs ESLint, validates required credentials, creates `cypress.env.json` from repository secrets, runs Cypress, and uploads the Cucumber report artifact.

Required repository secrets:

- `OPENCART_TEST_EMAIL`
- `OPENCART_TEST_PASSWORD`

On failure, Cypress screenshots and videos are uploaded as workflow artifacts when available.

## Known Limitations

- The OpenCart demo environment is public and can be slow, reset data, or emit unrelated client-side errors.
- The login flow assumes the configured test user exists and remains valid.
- Cypress may show an `allowCypressEnv` warning because the Cucumber preprocessor uses `Cypress.env()` internally. The warning does not fail the suite.
- The suite focuses on a small set of representative flows, not exhaustive ecommerce coverage.

## Future Improvements

- Create a controlled test user setup strategy if a stable test environment becomes available.
- Add cart/session cleanup if more cart scenarios are introduced.
- Add lightweight reporting, such as JUnit output, if CI consumers need trend visibility.
- Add tags for smoke/regression subsets once the scenario count grows.
- Introduce page objects only if repeated page-level behavior grows enough to justify another abstraction layer.
