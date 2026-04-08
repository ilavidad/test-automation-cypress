const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

Given("the user is on the login page", function () {
  cy.visitLoginPage();
});

When("the user enters valid credentials", function () {
  cy.submitValidLogin();
});

Then("the user should be logged in", function () {
  cy.assertUserIsLoggedIn();
});
