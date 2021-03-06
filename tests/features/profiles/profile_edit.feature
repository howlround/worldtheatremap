@profiles
Feature: Edit profiles

  As a user
  I want to edit profiles
  So I can make sure information is up to date

  Background:
    Given I am on the English language home page

  Scenario: Anonymous users should not be able to edit profiles
    And a profile with the following fields:
      | name | Favorite place theatre |
    When I go to the profile page for "Favorite place theatre"
    Then I should not see ".edit-link"

  Scenario: As a user editing a profile page I want to be able to update information
    And I am logged in
    And a profile with the following fields:
      | name | Favorite place theatre |
      | about | I really like going there |
    When I go to the profile page for "Favorite place theatre"
    And I follow ".edit-link"
    And I fill in ".profile-name-edit" with "Favorite place theatER"
    And I fill in ".profile-about-edit" with "I really really like going there"
    And I press ".edit-profile-save"
    Then the ".profile-name" element should contain "Favorite place theatER"
    And the ".profile-about" element should contain "I really really like going there"

  # Scenario: After updating a profile name the new name should show up on shows if this profile is listed as a primary author
