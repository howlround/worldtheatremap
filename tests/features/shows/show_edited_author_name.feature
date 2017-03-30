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
    And I click on ".label-text=Musical Theatre"
    And I click on ".edit-show-save"
    When I go to the profile page for "My Favorite Playwright"
    And I follow ".edit-link"
    And I fill in ".profile-name-edit" with "Just Another Playwright"
    And I press ".edit-profile-save"
    And I go to the show page for "Emilia"
    Then the ".show-author" element should contain "Just Another Playwright"

  Scenario: Users should be able to remove the first author
    And a profile with the following fields:
      | name | My Favorite Playwright |
    And a profile with the following fields:
      | name | My Second Fave |
    And I am logged in
    And I go to the "show" add page
    And I fill in ".show-name-edit" with "Emilia"
    And I fill in ".show-author-name-edit" with "My Favorite Playwright"
    And I click on ".btn-add"
    And I fill in ".form-group-author-1 .show-author-name-edit" with "Second"
    And I click on "ul.autocomplete-results li"
    And I click on ".autocomplete-results li"
    And I click on ".edit-show-save"
    And I follow ".edit-link"
    And I click on ".btn-remove"
    And I click on ".edit-show-save"
    And I go to the show page for "Emilia"
    Then the ".show-author" element should not contain "My Favorite Playwright"
    And the ".show-author" element should contain "My Second Fave"

  Scenario: When a user removes the first author on the show edit form the interface should reflect which author is being removed
    And a profile with the following fields:
      | name | My Favorite Playwright |
    And a profile with the following fields:
      | name | My Second Fave |
    And I am logged in
    And I go to the "show" add page
    And I fill in ".show-name-edit" with "Emilia"
    And I fill in ".show-author-name-edit" with "My Favorite Playwright"
    And I click on ".btn-add"
    And I fill in ".form-group-author-1 .show-author-name-edit" with "Second"
    And I click on "ul.autocomplete-results li"
    And I click on ".autocomplete-results li"
    And I click on ".edit-show-save"
    And I follow ".edit-link"
    And I click on ".btn-remove"
    Then the ".show-author-name-edit" field should have the value "My Second Fave"
