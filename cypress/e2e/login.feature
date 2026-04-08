Feature: User Login

  Scenario: User logs in with valid credentials
    Given the user is on the login page
    When the user enters valid credentials
    Then the user should be logged in

  Scenario: User logs in with invalid credentials
    Given the user is on the login page
    When the user enters invalid credentials
    Then an error message should be displayed
