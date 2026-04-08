const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

Given("the user is on the login page", function () {
  cy.visit("/index.php?route=account/login");
});

When("the user enters valid credentials", function () {
  const user = Cypress.env("validUser");

  cy.get("#input-email").type(user.email);
  cy.get("#input-password").type(user.password, { log: false });
  cy.get("input[type='submit'][value='Login']").click();
});

Then("the user should be logged in", function () {
  cy.url().should("include", "route=account/account");
  cy.contains("h2", "My Account").should("be.visible");
});
