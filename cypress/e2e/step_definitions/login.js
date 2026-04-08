const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const { routes } = require("../../support/test-data");

Given("the user is on the login page", function () {
  cy.visit(routes.login);
});

When("the user enters valid credentials", function () {
  cy.submitValidLogin();
});

Then("the user should be logged in", function () {
  cy.url().should("include", "route=account/account");
  cy.contains("h2", "My Account").should("be.visible");
});
