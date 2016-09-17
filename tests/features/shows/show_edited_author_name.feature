@shows @profiles
Feature: Updating author names should propogate

  As a user
  I want to always see current profile names
  So I don't get confused

  Background:
    Given I am on the English language home page

  Scenario: If an author profile is edited after the show is created the show should display the new name
    And a profile with the following fields:
      | name | My Favorite Playwright |
    And I am logged in
    And I go to the "show" add page
    And I fill in ".show-name-edit" with "Emilia"
    And I fill in ".show-author-name-edit" with "My Favorite Playwright"
    And I click on ".autocomplete-results li"
    And I fill in ".show-about-edit" with "Most popular name in Argentina"
    And I select "Musical Theatre" from the ".interests-edit" combobox
    And I click on ".edit-show-save"
    When I go to the profile page for "My Favorite Playwright"
    And I follow ".edit-link"
    And I fill in ".profile-name-edit" with "Just Another Playwright"
    And I press ".edit-profile-save"
    And I go to the show page for "Emilia"
    Then the ".show-author" element should contain "Just Another Playwright"
