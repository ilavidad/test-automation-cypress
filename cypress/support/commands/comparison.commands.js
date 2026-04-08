const { routes } = require("../data/routes.data");
const { normalizeAutHref } = require("../utils/link-normalization");

Cypress.Commands.add("addProductToCompare", (productName) => {
  cy.contains(".product-thumb", productName)
    .find('button[data-original-title="Compare this Product"]')
    .click();
  cy.get(".alert-success").should("contain", productName);
});

Cypress.Commands.add("openProductComparison", () => {
  cy.contains('a[href*="route=product/compare"]', "product comparison")
    .then(($link) => normalizeAutHref($link, routes.product.compare))
    .click();
});
