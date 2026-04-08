const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const { comparisonSets } = require("../../support/data/comparison.data");

const comparisonSet = comparisonSets.camerasCanonVsNikon;

Given("the user is viewing the Cameras category", function () {
  cy.visitCategoryPage(comparisonSet.category);
  cy.assertCategoryShowsProducts(comparisonSet.products);
});

When("the user adds Canon EOS 5D and Nikon D300 to compare", function () {
  comparisonSet.products.forEach((product) => {
    cy.addProductToCompare(product.name);
  });
});

When("the user opens the product comparison", function () {
  cy.openProductComparison();
});

Then("both products should be displayed in comparison", function () {
  cy.assertProductComparisonContains(comparisonSet.products);
});
