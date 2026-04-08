Cypress.Commands.add("assertUserIsLoggedIn", () => {
  cy.url().should("include", "route=account/account");
  cy.contains("h2", "My Account").should("be.visible");
});
