const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const { categories, products } = require("../../support/test-data");

const comparableProducts = [products.canonEos5d.name, products.nikonD300.name];

Given("the user is viewing the Cameras category", function () {
  cy.visitCategoryPage(categories.cameras);
  comparableProducts.forEach((productName) => {
    cy.contains(".product-thumb", productName).should("be.visible");
  });
});

When("the user adds Canon EOS 5D and Nikon D300 to compare", function () {
  comparableProducts.forEach((productName) => {
    cy.addProductToCompare(productName);
  });
});

When("the user opens the product comparison", function () {
  cy.openProductComparison();
});

Then("both products should be displayed in comparison", function () {
  cy.assertProductComparisonContains(comparableProducts);
});
