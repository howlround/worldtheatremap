@events @participants
Feature: Participant listing on event pages

  As a user
  I want to see all participants for an event
  So I can know more about the event

  Background:
    Given I am on the English language home page
    And I am logged in
    When I go to the "event" add page
    And I fill in ".event-show-edit" with "Sofia"
    And I click on ".autocomplete-results li"
    And I fill in ".show-author-name-edit" with "My Favorite Playwright"
    And I click on ".autocomplete-results li.create-profile"
    And I click on ".edit-show-save"
    And I fill in ".event-organization-edit" with "Organization of the year"
    And I click on ".autocomplete-results li.create-profile"
    And I select "Performance" from the ".event-type-edit" combobox
    And I click on ".form-group-startDate input"
    And I click on ".react-datepicker__day=1"
    And I click on ".form-group-endDate input"
    And I click on ".react-datepicker__day=15"
    And I select "India" from the ".country-select-edit" combobox
    And I fill in "[name=lat]" with "-36.03133177633187"
    And I fill in "[name=lon]" with "-72.0703125"
    And I click on ".edit-event-save"

  Scenario: Add participant form should only display for logged in users
    And I am logged out
    And I go to the show page for "Sofia"
    And I click on ".event-view-link"
    Then I should not see ".participant-profile-edit"

  Scenario: Users should be see all participants associated with an event
    And I go to the show page for "Sofia"
    And I click on ".event-view-link"
    And I fill in ".participant-profile-edit" with "Il Regista"
    And I click on ".autocomplete-results li.create-profile"
    And I fill in ".participant-role-edit" with "Director"
    And I click on ".edit-participant-save"
    And I go to the show page for "Sofia"
    And I click on ".event-view-link"
    Then the ".event-participant-name" element should contain "Il Regista"
    And the ".event-participant-role" element should contain "Director"

  @i18n
  Scenario: Users should be see the language-specific name for all participants associated with an event
    And I go to the show page for "Sofia"
    And I click on ".event-view-link"
    And I fill in ".participant-profile-edit" with "Il Regista"
    And I click on ".autocomplete-results li.create-profile"
    And I fill in ".participant-role-edit" with "Director"
    And I click on ".edit-participant-save"
    When I set the language to "Español"
    And I go to the profile page for "Il Regista"
    And I follow ".edit-link"
    And I fill in ".profile-name-edit" with "El director"
    And I click on ".edit-profile-save"
    And I go to the show page for "Sofia"
    And I click on ".event-view-link"
    Then the ".event-participant-name" element should contain "El director"

  Scenario: Number of participants should be displayed on the event page
    And I go to the show page for "Sofia"
    And I click on ".event-view-link"
    And I fill in ".participant-profile-edit" with "Il Regista"
    And I click on ".autocomplete-results li.create-profile"
    And I fill in ".participant-role-edit" with "Director"
    And I click on ".edit-participant-save"
    And I go to the show page for "Sofia"
    And I click on ".event-view-link"
    Then the ".event-participants h2" element should contain "1 Participant"
    And the ".event-participants h2" element should not contain "1 Participants"

  Scenario: Role for participants should be optional
    And I go to the show page for "Sofia"
    And I click on ".event-view-link"
    And I fill in ".participant-profile-edit" with "Il Regista"
    And I click on ".autocomplete-results li.create-profile"
    And I click on ".edit-participant-save"
    Then the ".event-participant-name" element should contain "Il Regista"

  Scenario: If a participant is not assigned a role they should still be displayed on the user profile
    And I go to the show page for "Sofia"
    And I click on ".event-view-link"
    And I fill in ".participant-profile-edit" with "Il Regista"
    And I click on ".autocomplete-results li.create-profile"
    And I click on ".edit-participant-save"
    When I go to the profile page for "Il Regista"
    Then the ".shows-by-role h2" element should contain "Participant"
    And the ".show-teaser" element should contain "Sofia"

  Scenario: If a profile is edited after they are added as a participant to a show it should display the new name
    And I go to the show page for "Sofia"
    And I click on ".event-view-link"
    And I fill in ".participant-profile-edit" with "Il Regista"
    And I click on ".autocomplete-results li.create-profile"
    And I fill in ".participant-role-edit" with "Director"
    And I click on ".edit-participant-save"
    When I go to the profile page for "Il Regista"
    And I follow ".edit-link"
    And I fill in ".profile-name-edit" with "La Regista"
    And I press ".edit-profile-save"
    And I go to the show page for "Sofia"
    And I click on ".event-view-link"
    Then the ".event-participant-name" element should contain "La Regista"

  Scenario: If a show name is edited after a participant is added the show name should display correctly on the participant profile
    And I go to the show page for "Sofia"
    And I click on ".event-view-link"
    And I fill in ".participant-profile-edit" with "Il Regista"
    And I click on ".autocomplete-results li.create-profile"
    And I fill in ".participant-role-edit" with "Director"
    And I click on ".edit-participant-save"
    When I go to the show page for "Sofia"
    And I click on ".edit-link"
    And I fill in ".show-name-edit" with "Jessa"
    And I click on ".edit-show-save"
    When I go to the profile page for "Il Regista"
    Then the ".show-teaser" element should contain "Jessa"

  Scenario: If event dates are editing after a participant is added it should display correctly on the participant profile
    And I go to the show page for "Sofia"
    And I click on ".event-view-link"
    And I fill in ".participant-profile-edit" with "Il Regista"
    And I click on ".autocomplete-results li.create-profile"
    And I fill in ".participant-role-edit" with "Director"
    And I click on ".edit-participant-save"
    When I go to the show page for "Sofia"
    And I click on ".event-view-link"
    And I click on ".edit-link"
    And I click on ".form-group-startDate input"
    And I click on ".react-datepicker__day=2"
    And I click on ".form-group-endDate input"
    And I click on ".react-datepicker__day=18"
    And I click on ".edit-event-save"
    When I go to the profile page for "Il Regista"
    And I click on ".show-events-toggle"
    And the ".event-date-range" element should contain the date range for day "2" to day "18" of this month

  Scenario: If an author name is changed after a participant is added it should display correctly on the participant profile
    And I go to the show page for "Sofia"
    And I click on ".event-view-link"
    And I fill in ".participant-profile-edit" with "Il Regista"
    And I click on ".autocomplete-results li.create-profile"
    And I fill in ".participant-role-edit" with "Director"
    And I click on ".edit-participant-save"
    When I go to the profile page for "My Favorite Playwright"
    And I follow ".edit-link"
    And I fill in ".profile-name-edit" with "My Second Favorite Playwright"
    And I press ".edit-profile-save"
    When I go to the profile page for "Il Regista"
    Then the ".show-authorship" element should contain "My Second Favorite Playwright"

  Scenario: If an author name for a play with multiple authors is changed after a participant is added it should display correctly on the participant profile
    When I go to the "event" add page
    And I fill in ".event-show-edit" with "Masterpiece"
    And I click on ".autocomplete-results li"
    And I fill in ".show-author-name-edit" with "My Favorite"
    And I click on "ul.autocomplete-results li.create-profile"
    And I click on ".btn-add"
    And I fill in ".form-group-author-1 .show-author-name-edit" with "The second"
    And I click on "ul.autocomplete-results li.create-profile"
    And I click on ".btn-add"
    And I fill in ".form-group-author-2 .show-author-name-edit" with "The worst"
    And I click on "ul.autocomplete-results li.create-profile"
    And I click on ".edit-show-save"
    And I fill in ".event-organization-edit" with "Organization of the year"
    And I click on ".autocomplete-results li.create-profile"
    And I select "Performance" from the ".event-type-edit" combobox
    And I click on ".form-group-startDate input"
    And I click on ".react-datepicker__day=1"
    And I click on ".form-group-endDate input"
    And I click on ".react-datepicker__day=15"
    And I select "India" from the ".country-select-edit" combobox
    And I fill in "[name=lat]" with "-36.03133177633187"
    And I fill in "[name=lon]" with "-72.0703125"
    And I click on ".edit-event-save"
    And I go to the show page for "Masterpiece"
    And I click on ".event-view-link"
    And I fill in ".participant-profile-edit" with "Il Regista"
    And I click on ".autocomplete-results li.create-profile"
    And I fill in ".participant-role-edit" with "Director"
    And I click on ".edit-participant-save"
    When I go to the profile page for "The second"
    And I follow ".edit-link"
    And I fill in ".profile-name-edit" with "#2"
    And I press ".edit-profile-save"
    When I go to the profile page for "Il Regista"
    Then the ".show-authorship" element should contain "My Favorite, #2 and The worst"
