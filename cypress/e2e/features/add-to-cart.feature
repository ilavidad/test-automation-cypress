Feature: Add To Cart

  Scenario: Add a configured product to the cart
    Given the user is viewing a configurable product
    Then the product options should be available
    When the user configures the product
    Then the selected product configuration should be displayed
    When the user adds the product to the cart
    And the user goes to the cart page
    Then the configured product should be displayed in the cart
