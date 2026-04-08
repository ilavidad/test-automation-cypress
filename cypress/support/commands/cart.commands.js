const { routes } = require("../data/routes.data");
const { normalizeAutHref } = require("../utils/link-normalization");

Cypress.Commands.add("openCartPageFromDropdown", (expectedQuantity) => {
  cy.get("#cart-total").should("contain", `${expectedQuantity} item`);
  cy.get('#cart button[data-toggle="dropdown"]').click();
  cy.get("#cart .dropdown-menu").should("be.visible");
  cy.get("#cart")
    .contains('a[href*="route=checkout/cart"]', "View Cart")
    .then(($link) => normalizeAutHref($link, routes.checkout.cart))
    .click();
});
