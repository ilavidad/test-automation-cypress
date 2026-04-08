Cypress.Commands.add("assertProductOptionsAvailable", () => {
  cy.contains("Available Options").should("be.visible");
  cy.get("#product select[id^='input-option']").should("be.visible");
});

Cypress.Commands.add("configureProduct", (configuration) => {
  cy.get("#product select[id^='input-option']").select(configuration.option);
  cy.get("#input-quantity").clear().type(configuration.quantity);
});

Cypress.Commands.add("assertProductConfiguration", (configuration) => {
  cy.get("#product").within(() => {
    cy.get("select[id^='input-option'] option:selected").should(
      "contain.text",
      configuration.option
    );
    cy.get("#input-quantity").should("have.value", configuration.quantity);
  });
});

Cypress.Commands.add("addCurrentProductToCart", () => {
  cy.intercept("POST", "**/index.php?route=checkout/cart/add").as("addToCart");
  cy.get("#button-cart").click();
  cy.wait("@addToCart").its("response.body").should("have.property", "success");
});
