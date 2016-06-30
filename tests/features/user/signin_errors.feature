Feature: Create events

  As a user
  I want to see error messages when joining
  So I don't get frustrated or confused

  Background:
    Given I am on the home page

  Scenario: When trying to sign in with an account that doesn't exist I should see an error
    And I log in with the email "sofia@famousnames.com" and the password "fail"
    Then the ".list-errors" element should contain "USER NOT FOUND"
