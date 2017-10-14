@search @events @shows
Feature: Event search results can be displayed on a map

  As a user
  I want search results to display on a map
  So I can better understand the results

  Background:
    Given I am on the English language home page

  Scenario: Events that match search filters can be display on a map
    And a profile with the following fields:
      | name | My Favorite Playwright |
    And I am logged in
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
    And I go to the "shows" search page
    And I fill in ".show-search-text" with "Sofia"
    When I click on ".results-display-map"
    Then the ".items-globe .event-show-name" element should contain "Sofia"
    And the ".items-globe .event-organizations" element should contain "Organization of the year"
