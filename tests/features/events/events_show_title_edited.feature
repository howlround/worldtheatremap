@events
Feature: Edits to a show title should propogate

  As a user
  I want any changes to shows to be reflected everywhere
  So I feel confident in what I am looking at

  Background:
    Given I am on the English language home page

  Scenario: When an show name is edited the name should propogate to the info on the home page globe
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
    And I click on ".react-datepicker__navigation--next"
    And I click on ".react-datepicker__day=15"
    And I select "Coral Sea Islands" from the ".country-select-edit" combobox
    And I click on ".edit-event-save"
    And I go to the show page for "Althea"
    And I click on ".edit-link"
    And I fill in ".show-name-edit" with "Jessa"
    And I click on ".edit-show-save"
    And I click on ".event-name a"
    Then the "h1.page-title" element should contain "Jessa"

  Scenario: When an show name is edited the name should propogate to the edit form for a related event
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
    And I click on ".react-datepicker__navigation--next"
    And I click on ".react-datepicker__day=15"
    And I select "Coral Sea Islands" from the ".country-select-edit" combobox
    And I click on ".edit-event-save"
    And I go to the show page for "Althea"
    And I click on ".edit-link"
    And I fill in ".show-name-edit" with "Jessa"
    And I click on ".edit-show-save"
    And I click on ".event-name a"
    When I click on ".edit-link"
    Then the ".event-show-edit" field should have the value "Jessa"
