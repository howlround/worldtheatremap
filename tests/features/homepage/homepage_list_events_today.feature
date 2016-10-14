@events @homepage
Feature: Events taking place today should display on a list on the home page

  As a user
  I want to see events happening today on the home page
  So I can quickly see the breadth of content on the site

  Background:
    Given I am on the English language home page

  Scenario: Events that start before today and end after today should display on the home page events list
    And I am logged in
    And a profile with the following fields:
      | name | My Favorite Playwright |
    When I go to the "event" add page
    And I fill in ".event-show-edit" with "Althea"
    And I click on ".autocomplete-results li"
    And I fill in ".show-author-name-edit" with "My Favorite Playwright"
    And I click on ".autocomplete-results li"
    And I click on ".edit-show-save"
    And I fill in ".event-organization-edit" with "Organization of the year"
    And I click on ".autocomplete-results li"
    And I select "Performance" from the ".event-type-edit" combobox
    And I fill in "[name=lat]" with "-36.03133177633187"
    And I fill in "[name=lon]" with "-72.0703125"
    And I click on ".form-group-startDate input"
    And I click on ".react-datepicker__navigation--previous"
    And I click on ".react-datepicker__day=1"
    And I click on ".form-group-endDate input"
    And I click on ".react-datepicker__navigation--next"
    And I click on ".react-datepicker__day=15"
    And I select "Coral Sea Islands" from the ".country-select-edit" combobox
    And I click on ".edit-event-save"
    And I am on the home page
    Then the ".homepage-events-list .event-show-name" element should contain "Althea"
    And the ".homepage-events-list .event-organizations" element should contain "Organization of the year"

  Scenario: Events that start before today and end before today should not display on the home page events list
    And I am logged in
    And a profile with the following fields:
      | name | My Favorite Playwright |
    When I go to the "event" add page
    And I fill in ".event-show-edit" with "Althea"
    And I click on ".autocomplete-results li"
    And I fill in ".show-author-name-edit" with "My Favorite Playwright"
    And I click on ".autocomplete-results li"
    And I fill in ".event-organization-edit" with "Organization of the year"
    And I click on ".autocomplete-results li"
    And I select "Performance" from the ".event-type-edit" combobox
    And I fill in "[name=lat]" with "-36.03133177633187"
    And I fill in "[name=lon]" with "-72.0703125"
    And I click on ".form-group-startDate input"
    And I click on ".react-datepicker__navigation--previous"
    And I click on ".react-datepicker__day=1"
    And I click on ".form-group-endDate input"
    And I click on ".react-datepicker__navigation--previous"
    And I click on ".react-datepicker__day=15"
    And I select "Coral Sea Islands" from the ".country-select-edit" combobox
    And I click on ".edit-event-save"
    And I am on the home page
    Then I should not see ".homepage-events-list .event-show-name"

  Scenario: Events that start after today and end after today should not display on the home page events list
    And I am logged in
    And a profile with the following fields:
      | name | My Favorite Playwright |
    When I go to the "event" add page
    And I fill in ".event-show-edit" with "Althea"
    And I click on ".autocomplete-results li"
    And I fill in ".show-author-name-edit" with "My Favorite Playwright"
    And I click on ".autocomplete-results li"
    And I fill in ".event-organization-edit" with "Organization of the year"
    And I click on ".autocomplete-results li"
    And I select "Performance" from the ".event-type-edit" combobox
    And I fill in "[name=lat]" with "-36.03133177633187"
    And I fill in "[name=lon]" with "-72.0703125"
    And I click on ".form-group-startDate input"
    And I click on ".react-datepicker__navigation--next"
    And I click on ".react-datepicker__day=15"
    And I click on ".form-group-endDate input"
    And I click on ".react-datepicker__navigation--next"
    And I click on ".react-datepicker__day=18"
    And I select "Coral Sea Islands" from the ".country-select-edit" combobox
    And I click on ".edit-event-save"
    And I am on the home page
    Then I should not see ".homepage-events-list .event-show-name"

  Scenario: Events that start today and end today should display on the home page events list
    And I am logged in
    And a profile with the following fields:
      | name | My Favorite Playwright |
    When I go to the "event" add page
    And I fill in ".event-show-edit" with "Althea"
    And I click on ".autocomplete-results li"
    And I fill in ".show-author-name-edit" with "My Favorite Playwright"
    And I click on ".autocomplete-results li"
    And I click on ".edit-show-save"
    And I fill in ".event-organization-edit" with "Organization of the year"
    And I click on ".autocomplete-results li"
    And I select "Performance" from the ".event-type-edit" combobox
    And I fill in "[name=lat]" with "-36.03133177633187"
    And I fill in "[name=lon]" with "-72.0703125"
    And I click on ".form-group-startDate input"
    And I click on ".react-datepicker__day--today"
    And I click on ".form-group-endDate input"
    And I click on ".react-datepicker__day--today"
    And I select "Coral Sea Islands" from the ".country-select-edit" combobox
    And I click on ".edit-event-save"
    And I am on the home page
    Then the ".homepage-events-list .event-show-name" element should contain "Althea"
