@events @participants
Feature: Participant listing on event pages

  As a user
  I want to see all participants for an event
  So I can know more about the event

  Background:
    Given I am on the English language home page
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
    And I select "Coral Sea Islands" from the ".country-select-edit" combobox
    And I click on ".edit-event-save"

  Scenario: Add participant form should only display for logged in users
    And I am logged out
    And I go to the show page for "Sofia"
    And I click on ".event-name a"
    Then I should not see ".participant-profile-edit"

  Scenario: Users should be see all participants associated with an event
    And a profile with the following fields:
      | name | Il Regista |
    And I go to the show page for "Sofia"
    And I click on ".event-name a"
    And I fill in ".participant-profile-edit" with "Il Regista"
    And I click on ".autocomplete-results li"
    And I fill in ".participant-role-edit" with "Stage Director"
    And I click on ".edit-participant-save"
    And I go to the show page for "Sofia"
    And I click on ".event-name a"
    Then the ".event-participant-name" element should contain "Il Regista"
    And the ".event-participant-role" element should contain "Stage Director"

  Scenario: Number of participants should be displayed on the event page
    And a profile with the following fields:
      | name | Il Regista |
    And I go to the show page for "Sofia"
    And I click on ".event-name a"
    And I fill in ".participant-profile-edit" with "Il Regista"
    And I click on ".autocomplete-results li"
    And I fill in ".participant-role-edit" with "Stage Director"
    And I click on ".edit-participant-save"
    And I go to the show page for "Sofia"
    And I click on ".event-name a"
    Then the ".event-participants h2" element should contain "1 Participant"
    And the ".event-participants h2" element should not contain "1 Participants"

  Scenario: Role for participants should be optional
    And a profile with the following fields:
      | name | Il Regista |
    And I go to the show page for "Sofia"
    And I click on ".event-name a"
    And I fill in ".participant-profile-edit" with "Il Regista"
    And I click on ".autocomplete-results li"
    And I click on ".edit-participant-save"
    Then the ".event-participant-name" element should contain "Il Regista"

  Scenario: If a participant is not assigned a role they should still be displayed on the user profile
    And a profile with the following fields:
      | name | Il Regista |
    And I go to the show page for "Sofia"
    And I click on ".event-name a"
    And I fill in ".participant-profile-edit" with "Il Regista"
    And I click on ".autocomplete-results li"
    And I click on ".edit-participant-save"
    When I go to the profile page for "Il Regista"
    Then the ".shows-by-role h2" element should contain "Participant"
    And the ".show-teaser" element should contain "Sofia"

  Scenario: If a profile is edited after they are added as a participant to a show it should display the new name
    And a profile with the following fields:
      | name | Il Regista |
    And I go to the show page for "Sofia"
    And I click on ".event-name a"
    And I fill in ".participant-profile-edit" with "Il Regista"
    And I click on ".autocomplete-results li"
    And I fill in ".participant-role-edit" with "Stage Director"
    And I click on ".edit-participant-save"
    When I go to the profile page for "Il Regista"
    And I follow ".edit-link"
    And I fill in ".profile-name-edit" with "La Regista"
    And I press ".edit-profile-save"
    And I go to the show page for "Sofia"
    And I click on ".event-name a"
    Then the ".event-participant-name .profile-name" element should contain "La Regista"
