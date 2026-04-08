import "./commands";

Cypress.on("uncaught:exception", (error) => {
  // Scoped workaround for a known OpenCart demo-site script error, not a generic exception bypass.
  if (error.message.includes("pagespeed is not defined")) {
    return false;
  }
});
