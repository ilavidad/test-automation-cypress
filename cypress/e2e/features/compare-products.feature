Feature: Compare Products

  Scenario: Compare two products
    Given the user is viewing the Cameras category
    When the user adds Canon EOS 5D and Nikon D300 to compare
    And the user opens the product comparison
    Then both products should be displayed in comparison
