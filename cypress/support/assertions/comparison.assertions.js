Cypress.Commands.add("assertCategoryShowsProducts", (products) => {
  products.forEach((product) => {
    cy.contains(".product-thumb", product.name).should("be.visible");
  });
});

Cypress.Commands.add("assertProductComparisonContains", (products) => {
  cy.url().should("include", "route=product/compare");
  cy.contains("h1", "Product Comparison").should("be.visible");
  cy.get("#content").within(() => {
    products.forEach((product) => {
      cy.contains("strong", product.name).should("be.visible");
    });
  });
});
