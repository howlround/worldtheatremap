@search
Feature: Unified Show/Event search: Events

  As a user
  I want to use search filters
  So I can find events

  Background:
    Given I am on the English language home page
    And a profile with the following fields:
      | name | My Favorite Playwright |
    And I am logged in
    # Add First Event
    When I go to the "event" add page
    And I fill in ".event-show-edit" with "Sofia"
    And I click on ".autocomplete-results li"
    And I fill in ".show-author-name-edit" with "My Favorite Playwright"
    And I click on ".autocomplete-results li"
    And I click on ".edit-show-save"
    And I fill in ".event-organization-edit" with "Organization of the year"
    And I click on ".autocomplete-results li"
    And I select "Performance" from the ".event-type-edit" combobox
    And I click on ".form-group-startDate input"
    And I click on ".react-datepicker__day=1"
    And I click on ".form-group-endDate input"
    And I click on ".react-datepicker__navigation--next"
    And I click on ".react-datepicker__day=15"
    And I select "Argentina" from the ".country-select-edit" combobox
    And I fill in "[name=lat]" with "-36.03133177633187"
    And I fill in "[name=lon]" with "-72.0703125"
    And I fill in ".event-administrative-area-edit" with "La Bombonera"
    And I fill in ".event-locality-edit" with "Buenos Aires"
    And I click on ".edit-event-save"
    # Add Second Event
    When I go to the "event" add page
    And I fill in ".event-show-edit" with "Aadya"
    And I click on ".autocomplete-results li"
    And I fill in ".show-author-name-edit" with "My Favorite Playwright"
    And I click on ".autocomplete-results li"
    And I click on ".edit-show-save"
    And I fill in ".event-organization-edit" with "Organization of the year"
    And I click on ".autocomplete-results li"
    And I select "Reading" from the ".event-type-edit" combobox
    And I click on ".form-group-startDate input"
    And I click on ".react-datepicker__day=16"
    And I click on ".form-group-endDate input"
    And I click on ".react-datepicker__navigation--next"
    And I click on ".react-datepicker__day=25"
    And I select "India" from the ".country-select-edit" combobox
    And I fill in "[name=lat]" with "-36.03133177633187"
    And I fill in "[name=lon]" with "-72.0703125"
    And I fill in ".event-locality-edit" with "Chennai"
    And I fill in ".event-administrative-area-edit" with "Tamil Nadu"
    And I click on ".edit-event-save"
    And I go to the "shows" search page
    And I should not see ".search-results"

  Scenario: After searching for a show users should see how many events which are associated with that show
    When I fill in ".show-search-text" with "Sofia"
    Then the ".search-results" element should contain "1 Event"

  Scenario: After searching for a show users should see events which are associated with that show
    When I fill in ".show-search-text" with "Sofia"
    Then the ".search-results" element should contain "Performance"

  Scenario: Users can filter events by type
    When I select "Performance" from the ".event-type-edit" combobox
    And the ".search-results" element should contain "Sofia"
    And the ".search-results" element should not contain "Aadya"

  # Country
  Scenario: Users can filter events by Country
    When I select "Argentina" from the ".form-group-eventsCountry .country-select-edit" combobox
    And the ".search-results" element should contain "Sofia"
    And the ".search-results" element should not contain "Aadya"

  Scenario: Users can filter events by Country after editing an event to add a new Country
    And I go to the show page for "Sofia"
    And I click on ".event-view-link"
    And I click on ".edit-link"
    And I select "Morocco" from the ".country-select-edit" combobox
    And I click on ".edit-event-save"
    And I go to the "events" search page
    When I select "Morocco" from the ".country-select-edit" combobox
    And the ".search-results" element should contain "Sofia"

  Scenario: Choosing multiple countries should match two different events that each have one of the countries
    And I go to the "events" search page
    And I should not see ".search-results"
    When I select "Argentina" from the ".country-select-edit" combobox
    And I select "India" from the ".country-select-edit" combobox
    And the ".search-results" element should contain "Sofia"
    And the ".search-results" element should contain "Aadya"

  # City / Locality
  Scenario: Users can filter events by city
    When I select "Buenos Aires" from the ".locality-select-edit" combobox
    And the ".search-results" element should contain "Sofia"
    And the ".search-results" element should not contain "Aadya"

  Scenario: Choosing multiple cities should match two different events that each have one of the cities
    When I select "Buenos Aires" from the ".locality-select-edit" combobox
    When I select "Chennai" from the ".locality-select-edit" combobox
    And the ".search-results" element should contain "Sofia"
    And the ".search-results" element should contain "Aadya"

  Scenario: Users can filter events by city after editing an event to add a new city
    And I go to the show page for "Sofia"
    And I click on ".event-view-link"
    And I click on ".edit-link"
    And I fill in ".event-locality-edit" with "Morocco"
    And I click on ".edit-event-save"
    And I go to the "events" search page
    When I select "Morocco" from the ".locality-select-edit" combobox
    And the ".search-results" element should contain "Sofia"

  # Province / Administrative area
  Scenario: Users can filter events by Province
    When I select "La Bombonera" from the ".administrative-area-select-edit" combobox
    And I select "Tamil Nadu" from the ".administrative-area-select-edit" combobox
    And the ".search-results" element should contain "Sofia"

  Scenario: Users can filter events by Province after editing an event to add a new Province
    And I go to the show page for "Sofia"
    And I click on ".event-view-link"
    And I click on ".edit-link"
    And I fill in ".event-administrative-area-edit" with "Rabat-Salé-Kénitra"
    And I click on ".edit-event-save"
    And I go to the "events" search page
    When I select "Rabat-Salé-Kénitra" from the ".administrative-area-select-edit" combobox
    And the ".search-results" element should contain "Sofia"

  Scenario: Choosing multiple provinces should match two different events that each have one of the provinces
    When I select "La Bombonera" from the ".administrative-area-select-edit" combobox
    And I select "Tamil Nadu" from the ".administrative-area-select-edit" combobox
    And the ".search-results" element should contain "Sofia"
    And the ".search-results" element should contain "Aadya"

  Scenario: Users can filter events by date range
    When I click on ".form-group-startDate input"
    And I click on ".react-datepicker__day=1"
    And I click on ".form-group-endDate input"
    And I click on ".react-datepicker__day=15"
    And the ".search-results" element should contain "Sofia"
    And the ".search-results" element should not contain "Aadya"
