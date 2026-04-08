Cypress.Commands.add("configureProduct", (configuration) => {
  cy.get("#product select[id^='input-option']").select(configuration.option);
  cy.get("#input-quantity").clear().type(configuration.quantity);
});

Cypress.Commands.add("addCurrentProductToCart", () => {
  cy.intercept("POST", "**/index.php?route=checkout/cart/add").as("addToCart");
  cy.get("#button-cart").click();
  cy.wait("@addToCart").its("response.body").should("have.property", "success");
});
