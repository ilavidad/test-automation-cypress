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

When("the user enters invalid credentials", function () {
  cy.get("#input-email").type("invalid-user@example.com");
  cy.get("#input-password").type("Invalid123", { log: false });
  cy.get("input[type='submit'][value='Login']").click();
});

Then("an error message should be displayed", function () {
  cy.get(".alert-danger")
    .should("be.visible")
    .and("contain", "Warning: No match for E-Mail Address and/or Password.");
});
