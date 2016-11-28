@homepage
Feature: Collection counts on home page

  As a user
  I want to see statistics about all the content on the map
  So I know the bredth of the system

  Background:
    Given I am on the English language home page

  Scenario: Users viewing the home page should see how many profiles there are
    And I am logged in
    When I go to the "profile" add page
    And I fill in ".profile-name-edit" with "Fatima"
    And I click on ".edit-profile-save"
    And I am on the English language home page
    Then the ".theatremakers-count .count" element should contain "1"
