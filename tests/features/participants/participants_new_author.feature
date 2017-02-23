@participants
Feature: Add new profile from the participant add form

  As a user
  I want to create a profile not currently in the system when adding a participant to an event
  So I can add more information quickly

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

  Scenario: Users should be able to add participants to events for profiles that are not in the system yet
    And I go to the show page for "Sofia"
    And I click on ".event-name a"
    And I fill in ".participant-profile-edit" with "Unknown participant"
    And I click on ".autocomplete-results li"
    And I fill in ".participant-role-edit" with "Director"
    And I click on ".edit-participant-save"
    And I go to the show page for "Sofia"
    And I click on ".event-name a"
    Then the ".event-participant-name" element should contain "Unknown participant"

  @i18n
  Scenario: Participants listed on an event should be displayed in the correct language
    And I go to the show page for "Sofia"
    And I click on ".event-name a"
    And I fill in ".participant-profile-edit" with "Unknown participant"
    And I click on ".autocomplete-results li"
    And I fill in ".participant-role-edit" with "Director"
    And I click on ".edit-participant-save"
    When I click on ".language-switcher [name=es]"
    And I go to the profile page for "Unknown participant"
    And I follow ".edit-link"
    And I fill in ".profile-name-edit" with "Participante desconocido"
    And I click on ".edit-profile-save"
    And I go to the show page for "Sofia"
    And I click on ".event-name a"
    Then the ".event-participant-name" element should contain "Participante desconocido"
