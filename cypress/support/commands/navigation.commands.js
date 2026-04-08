const { routes } = require("../data/routes.data");

Cypress.Commands.add("visitLoginPage", () => {
  cy.visit(routes.account.login);
});

Cypress.Commands.add("visitProductPage", (product) => {
  cy.visit(`${routes.product.detail}&product_id=${product.id}`, {
    timeout: 120000,
  });
  cy.contains("h1", product.name).should("be.visible");
});

Cypress.Commands.add("visitCategoryPage", (category) => {
  cy.visit(`${routes.product.category}&path=${category.path}`, {
    timeout: 120000,
  });
  cy.contains("h2", category.name).should("be.visible");
});
