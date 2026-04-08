Feature: Brand Navigation

  Scenario: Navigate to brand page
    Given the user is on the home page
    When the user clicks on a brand link
    Then the brand page should be displayed

  Scenario: Filter products by brand
    Given the user is on the products page
    When the user filters by a specific brand
    Then only products from that brand should be shown
