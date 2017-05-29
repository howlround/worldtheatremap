@affiliations
Feature: Create an affiliation

  As a user
  I want to affiliate a profile with another profile
  So that I can better articulate the relationships on the world theatre map

  Background:
    Given I am on the English language home page

  Scenario: As a user I want to be able to affiliate a profile with another profile
    And I am logged in
    When I go to the "profile" add page
    And I select "Organization" from the ".profile-type-edit" combobox
    And I fill in ".profile-name-edit" with "National Organization"
    And I click on ".organization-types-label-text=Network / Association / Union"
    And I click on ".edit-profile-save"
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

  Scenario: Only Network / Association / Union profiles are eligible to affiliate yourself with
    And I am logged in
    And a profile with the following fields:
      | name | Non-Network Organization |
      | about | We bring people together |
    And a profile with the following fields:
      | name | Affiliated friends |
      | about | We come together |
    When I go to the profile page for "Affiliated friends"
    And I fill in ".affiliation-profile-edit" with "Non-Network Organization"
    Then I should not see ".autocomplete-results li"

  Scenario: Users can delete affiliations
    And I am logged in
    When I go to the "profile" add page
    And I select "Organization" from the ".profile-type-edit" combobox
    And I click on ".organization-types-label-text=Network / Association / Union"
    And I fill in ".profile-name-edit" with "National Organization"
    And I click on ".edit-profile-save"
    And a profile with the following fields:
      | name | Affiliated friends |
      | about | We come together |
    And I go to the profile page for "Affiliated friends"
    And I fill in ".affiliation-profile-edit" with "National Organization"
    And I click on ".autocomplete-results li"
    And I click on ".edit-affiliation-save"
    And I click on ".delete-affiliation"
    Then I should not see ".affiliations li"

  @i18n
  Scenario: Profile names should display in the correct langauge in Affiliation lists
    And I am logged in
    And a profile with the following fields:
      | name | Affiliated friends |
      | about | We come together |
    When I go to the "profile" add page
    And I fill in ".profile-name-edit" with "National Organization"
    And I select "Organization" from the ".profile-type-edit" combobox
    And I click on ".organization-types-label-text=Network / Association / Union"
    And I click on ".edit-profile-save"
    And I go to the profile page for "Affiliated friends"
    And I fill in ".affiliation-profile-edit" with "National Organization"
    And I click on ".autocomplete-results li"
    And I click on ".edit-affiliation-save"
    When I go to the profile page for "National Organization"
    And I click on ".language-switcher [name=es]"
    And I follow ".edit-link"
    And I fill in ".profile-name-edit" with "Organización Nacional"
    And I click on ".edit-profile-save"
    And I go to the profile page for "Affiliated friends"
    Then the ".affiliations" element should contain "Organización Nacional"
