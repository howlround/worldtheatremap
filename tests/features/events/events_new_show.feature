@events @shows
Feature: Create events for a show that doesn't exist yet

  As a user
  I want to create a new event for a show that doesn't exist yet
  So I can more quickly add information

  Background:
    Given I am on the home page

  Scenario: Users should be able to add events for a show that is not in the system yet but has an existing author
    And I am logged in
    And a profile with the following fields:
      | name | My Favorite Playwright |
    When I go to the "event" add page
    And I fill in ".event-show-edit" with "Althea"
    And I click on ".autocomplete-results li"
    And I fill in ".show-author-name-edit" with "My Favorite Playwright"
    And I click on ".autocomplete-results li"
    And I select "Performance" from ".event-type-edit"
    And I click on ".form-group-startDate input"
    And I click on ".DayPicker-Day=1"
    And I click on ".form-group-endDate input"
    And I click on ".DayPicker-Day=15"
    And I click on ".edit-event-save"
    Then the "h1.page-title" element should contain "Althea"
    And the ".event-authorship" element should contain "My Favorite Playwright"

  Scenario: Users should be able to add events for a show that is not in the system yet and also has a new author
    And I am logged in
    When I go to the "event" add page
    And I fill in ".event-show-edit" with "Althea"
    And I click on ".autocomplete-results li"
    And I fill in ".show-author-name-edit" with "Unknown Playwright"
    And I click on ".autocomplete-results li"
    And I select "Performance" from ".event-type-edit"
    And I click on ".form-group-startDate input"
    And I click on ".DayPicker-Day=1"
    And I click on ".form-group-endDate input"
    And I click on ".DayPicker-Day=15"
    And I click on ".edit-event-save"
    Then the "h1.page-title" element should contain "Althea"
    And the ".event-authorship" element should contain "Unknown Playwright"
    And I click on ".show-author"
    Then the ".profile-name" element should contain "Unknown Playwright"

  Scenario: Users should be able to edit and event and change it to a show that is not already in the system with an author not already in the system
    Given I am on the home page
    And a profile with the following fields:
      | name | My Favorite Playwright |
    And I am logged in
    And I go to the "show" add page
    And I fill in ".show-name-edit" with "Sofia"
    And I fill in ".show-author-name-edit" with "My Favorite Playwright"
    And I click on ".autocomplete-results li"
    And I fill in ".show-about-edit" with "Most popular name in Italy"
    And I click on ".edit-show-save"
    And I go to the "event" add page
    And I fill in ".event-show-edit" with "Sofia"
    And I click on ".autocomplete-results li"
    And I select "Performance" from ".event-type-edit"
    And I fill in ".event-about-edit" with "A workshop on spelling"
    And I click on ".form-group-startDate input"
    And I click on ".DayPicker-Day=1"
    And I click on ".form-group-endDate input"
    And I click on ".DayPicker-Day=15"
    And I click on ".edit-event-save"
    And I click on ".edit-link"
    When I fill in ".event-show-edit" with "Althea"
    And I click on ".autocomplete-results li"
    And I fill in ".show-author-name-edit" with "Unknown Playwright"
    And I click on ".autocomplete-results li"
    And I select "Performance" from ".event-type-edit"
    And I click on ".form-group-startDate input"
    And I click on ".DayPicker-Day=1"
    And I click on ".form-group-endDate input"
    And I click on ".DayPicker-Day=15"
    And I click on ".edit-event-save"
    Then the "h1.page-title" element should contain "Althea"
    And the ".event-authorship" element should contain "Unknown Playwright"
    And I click on ".show-author"
    Then the ".profile-name" element should contain "Unknown Playwright"
