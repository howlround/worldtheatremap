@watch
Feature: View organization profiles

  As a user
  I want to see organization profiles
  So I can find information

  Background:
    Given I am on the home page

  Scenario: As a user viewing an organization profile page I want to see information about that organization
    And I am an anonymous user
    And I am am logged in
    And a task with the following fields:
      | text | Add test profilz |
    When I go to the profile page for "Irondale Center"
    Then the ".profile-name" element should contain "Irondale Center"
