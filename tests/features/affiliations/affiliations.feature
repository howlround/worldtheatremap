@affiliations
Feature: Create an affiliation

  As a user
  I want to affiliate a profile with another profile
  So that I can better articulate the relationships on the world theatre map

  Background:
    Given I am on the English language home page
@focus
  Scenario: As a user I want to be able to affiliate a profile with another profile
    And I am logged in
    And a profile with the following fields:
      | name | National Organization |
      | about | We bring people together |
    And a profile with the following fields:
      | name | Affiliated friends |
      | about | We come together |
    When I go to the profile page for "Affiliated friends"
    And I fill in ".affiliation-profile-edit" with "National Organization"
    And I click on ".autocomplete-results li"
    And I click on ".edit-affiliation-save"
    Then the ".affiliations" element should contain "National Organization"
    When I go to the profile page for "National Organization"
    Then the ".affiliated-profiles" element should contain "Affiliated friends"
