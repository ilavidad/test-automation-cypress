Feature: Product Options Selection

  Scenario: View available product options
    Given the user is viewing a product
    When the user checks the available options
    Then the options should be displayed

  Scenario: Select product options
    Given the user is viewing a product
    When the user fills the available options
    Then the selected options should be displayed

  Scenario: Review configured product in the cart
    Given the user is viewing a product
    And the user has configured the product
    When the user adds the product to the cart
    And the user goes to the cart page
    Then the configured product should be displayed in the cart
