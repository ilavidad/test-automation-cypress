const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const { products } = require("../../support/test-data");

const product = products.canonEos5d;

Given("the user is viewing a configurable product", function () {
  cy.visitProductPage(product);
});

Then("the product options should be available", function () {
  cy.assertProductOptionsAvailable();
});

When("the user configures the product", function () {
  cy.configureProduct(product.configuration);
});

Then("the selected product configuration should be displayed", function () {
  cy.assertProductConfiguration(product.configuration);
});

When("the user adds the product to the cart", function () {
  cy.addCurrentProductToCart();
});

When("the user goes to the cart page", function () {
  cy.openCartPageFromDropdown(product.configuration.quantity);
});

Then("the configured product should be displayed in the cart", function () {
  cy.assertConfiguredProductInCart(product);
});
