const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

Given("the user is viewing the Cameras category", function () {
  cy.visit("/index.php?route=product/category&path=33", {
    timeout: 120000,
  });
  cy.contains("h2", "Cameras").should("be.visible");
  cy.contains(".product-thumb", "Canon EOS 5D").should("be.visible");
  cy.contains(".product-thumb", "Nikon D300").should("be.visible");
});

When("the user adds Canon EOS 5D and Nikon D300 to compare", function () {
  addProductToCompare("Canon EOS 5D");
  addProductToCompare("Nikon D300");
});

When("the user opens the product comparison", function () {
  cy.contains('a[href*="route=product/compare"]', "product comparison")
    .invoke("attr", "href", "/index.php?route=product/compare")
    .click();
});

Then("both products should be displayed in comparison", function () {
  cy.url().should("include", "route=product/compare");
  cy.contains("h1", "Product Comparison").should("be.visible");
  cy.get("#content").within(() => {
    cy.contains("strong", "Canon EOS 5D").should("be.visible");
    cy.contains("strong", "Nikon D300").should("be.visible");
  });
});

function addProductToCompare(productName) {
  cy.contains(".product-thumb", productName)
    .find('button[data-original-title="Compare this Product"]')
    .click();
  cy.get(".alert-success").should("contain", productName);
}
