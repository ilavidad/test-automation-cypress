const { routes } = require("../test-data");

Cypress.Commands.add("openCartPageFromDropdown", (expectedQuantity) => {
  cy.get("#cart-total").should("contain", `${expectedQuantity} item`);
  cy.get('#cart button[data-toggle="dropdown"]').click();
  cy.get("#cart .dropdown-menu").should("be.visible");
  cy.get("#cart")
    .contains('a[href*="route=checkout/cart"]', "View Cart")
    .invoke("attr", "href", routes.checkout.cart)
    .click();
});

Cypress.Commands.add("assertConfiguredProductInCart", (cartItem) => {
  cy.url().should("include", "route=checkout/cart");
  cy.get(".breadcrumb").should("contain", "Shopping Cart");
  cy.get("#content")
    .contains("td.text-left a", cartItem.product.name)
    .should("be.visible")
    .parents("tr")
    .within(() => {
      cy.get("small").should("contain", cartItem.configuration.summary);
      cy.get("input[name^='quantity']").should(
        "have.value",
        cartItem.configuration.quantity
      );
    });
});
