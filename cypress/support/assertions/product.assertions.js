Cypress.Commands.add("assertProductOptionsAvailable", () => {
  cy.contains("Available Options").should("be.visible");
  cy.get("#product select[id^='input-option']").should("be.visible");
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
