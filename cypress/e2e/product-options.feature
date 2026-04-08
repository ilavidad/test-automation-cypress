Feature: Product Options Selection

  Scenario: View available product options
    Given the user is viewing a product
    When the user checks the available options
    Then the options should be displayed

  Scenario: Select a product option
    Given the user is viewing a product
    When the user selects an option
    Then the option should be selected
