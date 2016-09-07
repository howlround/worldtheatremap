@participants
Feature: Add new profile from the participant add form

  As a user
  I want to create a profile not currently in the system when adding a participant to an event
  So I can add more information quickly

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
    And I go to the "event" add page
    And I fill in ".event-show-edit" with "Sofia"
    And I click on ".autocomplete-results li"
    And I select "Performance" from the ".event-type-edit" combobox
    And I fill in ".event-about-edit" with "A workshop on spelling"
    And I click on ".form-group-startDate input"
    And I click on ".react-datepicker__day=1"
    And I click on ".form-group-endDate input"
    And I click on ".react-datepicker__day=15"
    And I fill in "[name=lat]" with "-36.03133177633187"
    And I fill in "[name=lon]" with "-72.0703125"
    And I click on ".edit-event-save"

  Scenario: Users should be able to add participants to events for profiles that are not in the system yet
    And I go to the show page for "Sofia"
    And I click on ".event-name a"
    And I fill in ".participant-profile-edit" with "Unknown participant"
    And I click on ".autocomplete-results li"
    And I fill in ".participant-role-edit" with "Stage Director"
    And I click on ".edit-participant-save"
    And I go to the show page for "Sofia"
    And I click on ".event-name a"
    Then the ".event-participant-name" element should contain "Unknown participant"
