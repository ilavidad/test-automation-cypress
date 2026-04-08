import "./commands";
const { isKnownDemoSiteException } = require("./utils/demo-site-workarounds");

Cypress.on("uncaught:exception", (error) => {
  // Scoped workaround for a known OpenCart demo-site script error, not a generic exception bypass.
  if (isKnownDemoSiteException(error)) {
    return false;
  }
});
