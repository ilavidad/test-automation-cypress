# Test Automation Cypress

Lightweight Cypress + Cucumber E2E automation suite for the OpenCart demo site:

```text
https://opencart.abstracta.us
```

The project is intentionally small and focused. It demonstrates representative ecommerce automation flows with a maintainable structure, environment-driven credentials, CI readiness, and generated Cucumber reports.

## Scope

The suite currently covers three business flows:

- Login: validates that an existing user can authenticate successfully.
- Add To Cart: configures `Canon EOS 5D` with option `Blue` and quantity `4`, adds it to the cart, and validates the configured item in the cart view.
- Compare Products: adds `Canon EOS 5D` and `Nikon D300` to comparison from the Cameras category and validates both products in the comparison view.

The goal is not exhaustive OpenCart coverage. The goal is to show a clean, credible automation slice around navigation, form input, product configuration, async cart behavior, comparison actions, and final-state assertions.

## Prerequisites / Installation

Required locally:

- Node.js compatible with the project dependencies.
- npm.
- Valid OpenCart demo credentials for the login flow.

Install dependencies from the repository root:

```bash
npm install
```

For CI, the workflow uses:

```bash
npm ci
```

## Configuration and Environment Variables

Secrets are not committed to the repository.

Local runs use `cypress.env.json` at the project root:

```json
{
  "validUser": {
    "email": "your-test-email@example.com",
    "password": "your-test-password"
  }
}
```

`cypress.env.json` is ignored by Git.

CI runs use GitHub Actions secrets:

- `OPENCART_TEST_EMAIL`
- `OPENCART_TEST_PASSWORD`

The workflow creates `cypress.env.json` at runtime from those secrets. The test runner validates required credentials before starting Cypress, so missing configuration fails early with a clear error.

Validate the environment without running Cypress:

```bash
npm run validate:env
```

## How to Run the Tests

Run the full suite headlessly:

```bash
npm run test
```

Open Cypress interactively:

```bash
npm run dev
```

Run one flow:

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

Auto-fix style issues:

```bash
npm run lint:fix
npm run format
```

## Reports

Cucumber HTML and JSON reports are generated automatically when Cypress runs:

```text
cypress/reports/cucumber-report.html
cypress/reports/cucumber-report.json
```

Generate the report:

```bash
npm run test
```

Open the HTML report from the project root on Windows PowerShell:

```powershell
start cypress\reports\cucumber-report.html
```

The report folder is ignored by Git. In GitHub Actions, `cypress/reports` is uploaded as a workflow artifact. Cypress screenshots and videos keep their default project behavior and are uploaded on CI failure when available.

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
node_modules/
cypress.env.json
cypress/downloads/
cypress/reports/
cypress/screenshots/
cypress/videos/
```

## Architecture Decisions

- Cypress is used for browser-level E2E coverage, automatic waiting, network interception, and local debugging.
- Cucumber/Gherkin keeps scenario intent readable while implementation detail stays in step definitions and support modules.
- Feature files describe business behavior; step definitions delegate to reusable commands and assertions.
- Domain data is centralized under `cypress/support/data` so products, routes, comparison sets, and user env keys are not scattered across tests.
- AUT-specific mitigations live under `cypress/support/utils`, keeping demo-site workarounds explicit and isolated.
- Page objects were intentionally not introduced. For this suite size, commands + assertions + domain data provide enough structure without adding framework weight.
- Local Cypress execution goes through `scripts/run-cypress.js` to remove `ELECTRON_RUN_AS_NODE` only for the Cypress child process. This keeps the local Electron workaround out of test logic.

## Execution Strategy

The suite is designed to provide fast feedback on a small set of representative flows rather than broad regression coverage.

- `npm run test` is the default headless execution path and generates Cucumber reports.
- `npm run dev` is intended for interactive debugging in the Cypress UI.
- Flow-specific scripts support targeted execution during development.
- `npm run validate:env` fails early when credentials are missing or malformed.
- CI runs formatting, linting, environment validation, Cypress tests, and report artifact upload.
- Screenshots and videos remain available for failure investigation without being committed to the repository.

## CI / Automation Execution

GitHub Actions runs on `push` and `pull_request` through:

```text
.github/workflows/cypress.yml
```

The workflow:

- Checks out the repository.
- Sets up Node.js.
- Installs dependencies with `npm ci`.
- Runs Prettier and ESLint checks.
- Validates required credentials.
- Creates `cypress.env.json` from GitHub Actions secrets.
- Runs the Cypress suite.
- Uploads the Cucumber report artifact.
- Uploads Cypress screenshots/videos on failure when available.

## Known Limitations / Trade-offs

- The target application is a public demo site, so it can be slow, unavailable, reset data, or emit unrelated client-side errors.
- The login flow depends on a pre-existing valid user configured through local env or CI secrets.
- The suite covers representative ecommerce flows, not exhaustive OpenCart regression coverage.
- AUT-specific link normalization exists because the demo site exposes some `http://opencart.abstracta.us:80` links while the suite runs against HTTPS.
- `pagespeed is not defined` is ignored as a scoped demo-site workaround because it is unrelated to the tested behavior.
- Cypress may show an `allowCypressEnv` warning because the Cucumber preprocessor uses `Cypress.env()` internally. The warning does not fail the suite.
- Report files are generated locally under `cypress/reports`, but they are intentionally not committed to source control.

## Future Improvements

- Introduce a controlled test user setup strategy if a stable test environment becomes available.
- Add cart/session cleanup if more cart scenarios are introduced.
- Add tags for smoke/regression subsets once the scenario count grows.
- Consider JUnit output if downstream CI consumers need trend dashboards or test-management integration.
- Revisit page objects only if repeated page-level behavior grows enough to justify the extra abstraction.
