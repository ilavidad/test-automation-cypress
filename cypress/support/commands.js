const { routes } = require("./test-data");

Cypress.Commands.add("submitValidLogin", () => {
  const user = Cypress.env("validUser");

  if (!user?.email || !user?.password) {
    throw new Error("Missing validUser credentials in cypress.env.json");
  }

  cy.get("#input-email").type(user.email);
  cy.get("#input-password").type(user.password, { log: false });
  cy.get("input[type='submit'][value='Login']").click();
});

Cypress.Commands.add("visitProductPage", (product) => {
  cy.visit(`${routes.product}&product_id=${product.id}`, {
    timeout: 120000,
  });
  cy.contains("h1", product.name).should("be.visible");
});

Cypress.Commands.add("visitCategoryPage", (category) => {
  cy.visit(`${routes.category}&path=${category.path}`, {
    timeout: 120000,
  });
  cy.contains("h2", category.name).should("be.visible");
});

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

Cypress.Commands.add("openCartPageFromDropdown", (expectedQuantity) => {
  cy.get("#cart-total").should("contain", `${expectedQuantity} item`);
  cy.get('#cart button[data-toggle="dropdown"]').click();
  cy.get("#cart .dropdown-menu").should("be.visible");
  cy.get("#cart")
    .contains('a[href*="route=checkout/cart"]', "View Cart")
    .invoke("attr", "href", routes.cart)
    .click();
});

Cypress.Commands.add("assertConfiguredProductInCart", (product) => {
  cy.url().should("include", "route=checkout/cart");
  cy.get(".breadcrumb").should("contain", "Shopping Cart");
  cy.get("#content")
    .contains("td.text-left a", product.name)
    .should("be.visible")
    .parents("tr")
    .within(() => {
      cy.get("small").should("contain", product.configuration.summary);
      cy.get("input[name^='quantity']").should(
        "have.value",
        product.configuration.quantity
      );
    });
});

Cypress.Commands.add("addProductToCompare", (productName) => {
  cy.contains(".product-thumb", productName)
    .find('button[data-original-title="Compare this Product"]')
    .click();
  cy.get(".alert-success").should("contain", productName);
});

Cypress.Commands.add("openProductComparison", () => {
  cy.contains('a[href*="route=product/compare"]', "product comparison")
    .invoke("attr", "href", routes.compare)
    .click();
});

Cypress.Commands.add("assertProductComparisonContains", (productNames) => {
  cy.url().should("include", "route=product/compare");
  cy.contains("h1", "Product Comparison").should("be.visible");
  cy.get("#content").within(() => {
    productNames.forEach((productName) => {
      cy.contains("strong", productName).should("be.visible");
    });
  });
});
