@events
Feature: Event counts and events should display on show history listings

  As a user
  I want to see all events that a particular profile was involved in
  So I can know more about profile

  Background:
    Given I am on the English language home page
    And I am logged in
    And a profile with the following fields:
      | name | My Favorite Playwright |
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
    And I select "India" from the ".country-select-edit" combobox
    And I fill in "[name=lat]" with "-36.03133177633187"
    And I fill in "[name=lon]" with "-72.0703125"
    And I click on ".edit-event-save"

  Scenario: The number of events a profile is listed as the primary organization on should display on the show history section
    When I go to the profile page for "Organization of the year"
    Then the ".show-events-toggle" element should contain "1 Event"

  Scenario: When viewing a profile a user should be able to see each event listed under the show in the Show History section
    When I go to the profile page for "Organization of the year"
    And I click on ".show-events-toggle"
    Then the ".event-type" element should contain "Performance"
    Then the ".event-location" element should contain "India"

  @participants
  Scenario: When a profile is listed as a participant on an event, each event should be listed under the show in the appropriate section on the profile
    And a profile with the following fields:
      | name | Il Regista |
    And I go to the show page for "Sofia"
    And I click on ".event-view-link"
    And I fill in ".participant-profile-edit" with "Il Regista"
    And I click on ".autocomplete-results li"
    And I fill in ".participant-role-edit" with "Director"
    And I click on ".edit-participant-save"
    When I go to the profile page for "Il Regista"
    Then the ".show-events-toggle" element should contain "1 Event"
    And I click on ".show-events-toggle"
    Then the ".event-type" element should contain "Performance"
    Then the ".event-location" element should contain "India"
