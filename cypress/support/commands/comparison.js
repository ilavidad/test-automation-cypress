const { routes } = require("../test-data");

Cypress.Commands.add("assertCategoryShowsProducts", (productNames) => {
  productNames.forEach((productName) => {
    cy.contains(".product-thumb", productName).should("be.visible");
  });
});

Cypress.Commands.add("addProductToCompare", (productName) => {
  cy.contains(".product-thumb", productName)
    .find('button[data-original-title="Compare this Product"]')
    .click();
  cy.get(".alert-success").should("contain", productName);
});

Cypress.Commands.add("openProductComparison", () => {
  cy.contains('a[href*="route=product/compare"]', "product comparison")
    .invoke("attr", "href", routes.product.compare)
    .click();
});

Cypress.Commands.add("assertProductComparisonContains", (productNames) => {
  cy.url().should("include", "route=product/compare");
  cy.contains("h1", "Product Comparison").should("be.visible");
  cy.get("#content").within(() => {
    productNames.forEach((productName) => {
      cy.contains("strong", productName).should("be.visible");
    });
  });
});
