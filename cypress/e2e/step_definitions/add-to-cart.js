const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const { cartItems } = require("../../support/test-data");

const cartItem = cartItems.configuredCanonEos5d;

Given("the user is viewing a configurable product", function () {
  cy.visitProductPage(cartItem.product);
});

Then("the product options should be available", function () {
  cy.assertProductOptionsAvailable();
});

When("the user configures the product", function () {
  cy.configureProduct(cartItem.configuration);
});

Then("the selected product configuration should be displayed", function () {
  cy.assertProductConfiguration(cartItem.configuration);
});

When("the user adds the product to the cart", function () {
  cy.addCurrentProductToCart();
});

When("the user goes to the cart page", function () {
  cy.openCartPageFromDropdown(cartItem.configuration.quantity);
});

Then("the configured product should be displayed in the cart", function () {
  cy.assertConfiguredProductInCart(cartItem);
});
