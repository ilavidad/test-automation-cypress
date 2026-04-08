const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin =
  require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;

async function setupNodeEvents(on, config) {
  await addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    createBundler({
      plugins: [
        require("@badeball/cypress-cucumber-preprocessor/esbuild").default(config),
      ],
    })
  );

  return config;
}

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://opencart.abstracta.us",
    pageLoadTimeout: 120000,
    specPattern: "cypress/e2e/features/**/*.feature",
    setupNodeEvents,
  },
});
