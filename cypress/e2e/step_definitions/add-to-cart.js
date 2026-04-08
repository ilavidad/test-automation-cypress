const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const { productConfigurations } = require("../../support/data/products.data");

const configuredProduct = productConfigurations.canonEos5dBlueQuantity4;

Given("the user is viewing a configurable product", function () {
  cy.visitProductPage(configuredProduct.product);
});

Then("the product options should be available", function () {
  cy.assertProductOptionsAvailable();
});

When("the user configures the product", function () {
  cy.configureProduct(configuredProduct);
});

Then("the selected product configuration should be displayed", function () {
  cy.assertProductConfiguration(configuredProduct);
});

When("the user adds the product to the cart", function () {
  cy.addCurrentProductToCart();
});

When("the user goes to the cart page", function () {
  cy.openCartPageFromDropdown(configuredProduct.quantity);
});

Then("the configured product should be displayed in the cart", function () {
  cy.assertConfiguredProductInCart(configuredProduct);
});
