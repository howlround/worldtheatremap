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
