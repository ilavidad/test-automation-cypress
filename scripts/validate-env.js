const fs = require("node:fs");
const path = require("node:path");

const projectRoot = path.join(__dirname, "..");
const cypressEnvPath = path.join(projectRoot, "cypress.env.json");

function readCypressEnv() {
  if (!fs.existsSync(cypressEnvPath)) {
    return {};
  }

  try {
    return JSON.parse(fs.readFileSync(cypressEnvPath, "utf8"));
  } catch (error) {
    throw new Error(
      `Invalid cypress.env.json. Expected valid JSON, but parsing failed: ${error.message}`
    );
  }
}

function hasLocalCredentials(cypressEnv) {
  return Boolean(cypressEnv.validUser?.email && cypressEnv.validUser?.password);
}

function hasCiCredentials() {
  return Boolean(
    process.env.CI && process.env.OPENCART_TEST_EMAIL && process.env.OPENCART_TEST_PASSWORD
  );
}

function validateTestEnvironment() {
  const cypressEnv = readCypressEnv();

  if (hasLocalCredentials(cypressEnv) || hasCiCredentials()) {
    return;
  }

  throw new Error(
    [
      "Missing required OpenCart test credentials.",
      "",
      "Local runs require cypress.env.json with:",
      "{",
      '  "validUser": {',
      '    "email": "your-test-email@example.com",',
      '    "password": "your-test-password"',
      "  }",
      "}",
      "",
      "CI runs require OPENCART_TEST_EMAIL and OPENCART_TEST_PASSWORD secrets.",
    ].join("\n")
  );
}

if (require.main === module) {
  validateTestEnvironment();
  console.log("Required test environment is configured.");
}

module.exports = { validateTestEnvironment };
