Cypress.Commands.add("assertConfiguredProductInCart", (configuration) => {
  cy.url().should("include", "route=checkout/cart");
  cy.get(".breadcrumb").should("contain", "Shopping Cart");
  cy.get("#content")
    .contains("td.text-left a", configuration.product.name)
    .should("be.visible")
    .parents("tr")
    .within(() => {
      cy.get("small").should("contain", configuration.cartSummary);
      cy.get("input[name^='quantity']").should(
        "have.value",
        configuration.quantity
      );
    });
});
