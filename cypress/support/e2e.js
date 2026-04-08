import "./commands";

Cypress.on("uncaught:exception", (error) => {
  if (error.message.includes("pagespeed is not defined")) {
    return false;
  }
});
