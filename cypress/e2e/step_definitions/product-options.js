const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

Given("the user is viewing a product", function () {
  cy.visit("/index.php?route=product/product&product_id=30", {
    timeout: 120000,
  });
  cy.contains("h1", "Canon EOS 5D").should("be.visible");
});

When("the user checks the available options", function () {
  cy.contains("Available Options").scrollIntoView();
});

Then("the options should be displayed", function () {
  cy.contains("Available Options").should("be.visible");
  cy.get("#product").within(() => {
    cy.get("select[id^='input-option']").should("be.visible");
  });
});

When("the user fills the available options", function () {
  fillAvailableOptions();
});

Given("the user has configured the product", function () {
  fillAvailableOptions();
});

Then("the selected options should be displayed", function () {
  cy.get("#product").within(() => {
    cy.get("select[id^='input-option']").should("have.value", "3");
    cy.get("#input-quantity").should("have.value", "4");
  });
});

When("the user adds the product to the cart", function () {
  cy.intercept("POST", "**/index.php?route=checkout/cart/add").as("addToCart");
  cy.get("#button-cart").click();
  cy.wait("@addToCart").its("response.body").should("have.property", "success");
});

When("the user goes to the cart page", function () {
  cy.get("#cart-total").should("contain", "4 item");
  cy.get('#cart button[data-toggle="dropdown"]').click();
  cy.get("#cart .dropdown-menu").should("be.visible");
  cy.get("#cart")
    .contains('a[href*="route=checkout/cart"]', "View Cart")
    .invoke("attr", "href", "/index.php?route=checkout/cart")
    .click();
});

Then("the configured product should be displayed in the cart", function () {
  cy.url().should("include", "route=checkout/cart");
  cy.get(".breadcrumb").should("contain", "Shopping Cart");
  cy.get("#content")
    .contains("td.text-left a", "Canon EOS 5D")
    .should("be.visible")
    .parents("tr")
    .within(() => {
      cy.get("small").should("contain", "Select: Blue");
      cy.get("input[name^='quantity']").should("have.value", "4");
    });
});

function fillAvailableOptions() {
  fillOption("Select", () => {
    cy.get("select[id^='input-option']").select("Blue");
  });

  cy.get("#input-quantity").clear().type("4");
}

function fillOption(label, callback) {
  cy.get("#product .form-group")
    .filter((_, element) => {
      const labelText = Cypress.$(element)
        .find("label")
        .first()
        .text()
        .replace("*", "")
        .trim();

      return labelText === label;
    })
    .first()
    .within(callback);
}
