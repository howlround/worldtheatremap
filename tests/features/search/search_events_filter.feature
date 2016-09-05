@search
Feature: Filters on event search

  As a user
  I want to use search filters
  So I can find events

  Background:
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
    When I go to the "event" add page
    And I fill in ".event-show-edit" with "Sofia"
    And I click on ".autocomplete-results li"
    And I select "Performance" from the ".event-type-edit" combobox
    And I fill in ".event-about-edit" with "A workshop on spelling"
    And I click on ".form-group-startDate input"
    And I click on ".DayPicker-Day=1"
    And I click on ".form-group-endDate input"
    And I click on ".DayPicker-Day=15"
    And I fill in ".event-street-address-edit" with "Brandsen 805"
    And I fill in ".event-locality-edit" with "Buenos Aires"
    And I fill in ".event-country-edit" with "Argentina"
    And I fill in ".event-postal-code-edit" with "1161"
    And I click on ".edit-event-save"
    And I go to the "show" add page
    And I fill in ".show-name-edit" with "Aadya"
    And I fill in ".show-author-name-edit" with "My Favorite Playwright"
    And I click on ".autocomplete-results li"
    And I fill in ".show-about-edit" with "Most popular name in India"
    And I click on ".edit-show-save"
    When I go to the "event" add page
    And I fill in ".event-show-edit" with "Aadya"
    And I click on ".autocomplete-results li"
    And I select "Twitter Chat" from the ".event-type-edit" combobox
    And I fill in ".event-about-edit" with "A workshop on spelling"
    And I click on ".form-group-startDate input"
    And I click on ".DayPicker-Day=1"
    And I click on ".form-group-endDate input"
    And I click on ".DayPicker-Day=15"
    And I fill in ".event-locality-edit" with "Chennai"
    And I fill in ".event-country-edit" with "India"
    And I click on ".edit-event-save"
    And I go to the "events" search page
    And I should not see ".search-results"

  Scenario: Users can filter events by type
    When I select "Performance" from the ".event-type-edit" combobox
    And the ".search-results" element should contain "Sofia"
    And the ".search-results" element should not contain "Aadya"

  Scenario: Users can filter events by city
    When I select "Buenos Aires" from the ".event-locality-select-edit" combobox
    And the ".search-results" element should contain "Sofia"
    And the ".search-results" element should not contain "Aadya"

  Scenario: Users can filter events by city after editing a profile to add a new city
    And I go to the show page for "Sofia"
    And I click on ".event-name a"
    And I click on ".edit-link"
    And I fill in ".event-locality-edit" with "Morocco"
    And I click on ".edit-event-save"
    And I go to the "events" search page
    When I select "Morocco" from the ".event-locality-select-edit" combobox
    And the ".search-results" element should contain "Sofia"
