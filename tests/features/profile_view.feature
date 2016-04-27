Feature: View organization profiles

  As a user
  I want to see organization profiles
  So I can find information

  Background:
    Given I am on the home page

  Scenario: As a user viewing an organization profile page I want to see information about that organization
    And a profile with the following fields:
      | name | First place theatre |
    And a profile with the following fields:
      | name | Favorite place theatre |
    When I go to the profile page for "Favorite place theatre"
    Then the ".profile-name" element should contain "Favorite place theatre"
