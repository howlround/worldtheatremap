Feature: Add new primary author profiles from play create page

  As a user
  I want to create a profile for an author not currently in the system
  So I can add more information quickly

  Background:
    Given I am on the home page

  Scenario: Users should be able to create a play with all the fields
    And I am logged in
    And I hover over ".add"
    When I click on ".add-play"
    And I fill in ".play-name-edit" with "Sofía"
    And I fill in ".play-author-name-edit" with "Unknown Playwright"
    And I click on ".autocomplete-results li"
    And I click on ".edit-play-save"
    Then the ".play-name" element should contain "Sofía"
    And the ".play-author" element should contain "Unknown Playwright"
    When I go to the profile page for "Unknown Playwright"
    Then the ".profile-name" element should contain "Unknown Playwright"

  Scenario: After creating a profile for a previously non-existing primary author and saving the play a user should be able to click on the author and see their profile
    And I am logged in
    And I hover over ".add"
    When I click on ".add-play"
    And I fill in ".play-name-edit" with "Sofía"
    And I fill in ".play-author-name-edit" with "Unknown Playwright"
    When I click on "ul.autocomplete-results li"
    And I click on ".edit-play-save"
    And I click on ".play-author"
    Then the ".profile-name" element should contain "Unknown Playwright"

  # Scenario: Play edit form...
