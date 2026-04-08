const { users } = require("../data/users.data");

Cypress.Commands.add("submitValidLogin", () => {
  const user = Cypress.env(users.valid.envKey);

  if (!user?.email || !user?.password) {
    throw new Error(`Missing ${users.valid.envKey} credentials in cypress.env.json`);
  }

  cy.get("#input-email").type(user.email);
  cy.get("#input-password").type(user.password, { log: false });
  cy.get("input[type='submit'][value='Login']").click();
});
