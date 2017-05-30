@shows @profiles
Feature: Adding author names should propogate to events

  As a user
  I want to always see current author names
  So I don't get confused

  Background:
    Given I am on the English language home page

  Scenario: If an author profile is added after the show is created the show should display the new name
    And a profile with the following fields:
      | name | Organization of the year |
    And a profile with the following fields:
      | name | My Favorite Playwright |
    And a profile with the following fields:
      | name | Some Other Playwright |
    And I am logged in
    And I go to the "show" add page
    And I fill in ".show-name-edit" with "Emilia"
    And I fill in ".show-author-name-edit" with "My Favorite Playwright"
    And I click on ".autocomplete-results li"
    And I fill in ".show-about-edit" with "Most popular name in Argentina"
    And I click on ".label-text=Musical Theatre"
    And I click on ".edit-show-save"
    When I go to the "event" add page
    And I fill in ".event-show-edit" with "Emilia"
    And I click on ".autocomplete-results li"
    And I fill in ".event-organization-edit" with "Organization of the year"
    And I click on ".autocomplete-results li"
    And I select "Performance" from the ".event-type-edit" combobox
    And I click on ".form-group-startDate input"
    And I click on ".react-datepicker__day=1"
    And I click on ".form-group-endDate input"
    And I click on ".react-datepicker__day=15"
    And I fill in "[name=lat]" with "-36.03133177633187"
    And I fill in "[name=lon]" with "-72.0703125"
    And I select "Coral Sea Islands" from the ".country-select-edit" combobox
    And I click on ".edit-event-save"
    When I go to the show page for "Emilia"
    And I follow ".edit-link"
    And I click on ".btn-add"
    And I fill in ".form-group-author-1 .show-author-name-edit" with "Some Other"
    And I click on "ul.autocomplete-results li"
    And I click on ".edit-show-save"
    And I click on "a.event-view-link"
    Then the ".event-authorship" element should contain "My Favorite Playwright and Some Other Playwright"
