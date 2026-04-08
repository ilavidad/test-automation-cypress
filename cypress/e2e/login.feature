Feature: User Login

  Scenario: User logs in with valid credentials
    Given the user is on the login page
    When the user enters valid credentials
    Then the user should be logged in
