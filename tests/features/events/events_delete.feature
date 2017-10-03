@events
Feature: Delete events

  As a user
  I want to be able to delete events
  So information remains accurate

  Background:
    Given I am on the English language home page
    And I am logged in
    And I go to the "event" add page
    And I fill in ".event-show-edit" with "Fatima"
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

  Scenario: Logged out users should not be able to delete a event
    And I am logged out
    And I go to the show page for "Fatima"
    And I click on ".event-view-link"
    Then I should not see ".page-delete-link"

  @chromeOnly
  Scenario: Users should be able to request to delete a event
    When I click on ".page-delete-link"
    And I accept the alert
    Then the ".page-actions-edit" element should contain "Delete request received"

  @chromeOnly
  Scenario: If an admin denies a delete request then the event should go back to the default state
    When I click on ".page-delete-link"
    And I accept the alert
    And I am logged in as an administrator
    And I go to the show page for "Fatima"
    And I click on ".event-view-link"
    And I click on ".page-deny-removal-link"
    And I accept the alert
    Then the ".page-delete-link" element should contain "Delete"

  @chromeOnly
  Scenario: If an admin accepts a delete request then the event be removed from the system
    When I click on ".page-delete-link"
    And I accept the alert
    And I am logged in as an administrator
    And I go to the show page for "Fatima"
    And I click on ".event-view-link"
    And I click on ".page-confirm-removal-link"
    And I accept the alert
    Then there should be no events for shows with the name "Fatima"

  @chromeOnly
  Scenario: Regular users should not see the delete approve or deny links
    When I click on ".page-delete-link"
    And I accept the alert
    And I go to the show page for "Fatima"
    And I click on ".event-view-link"
    Then I should not see ".page-confirm-removal-link"
    And I should not see ".page-deny-removal-link"
