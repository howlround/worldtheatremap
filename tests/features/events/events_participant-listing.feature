Feature: Participant listing on event pages

  As a user
  I want to see all participants for an event
  So I can know more about the event

  Background:
    Given I am on the home page
    And a profile with the following fields:
      | name | My Favorite Playwright |
    And I am logged in
    And I go to the "play" add page
    And I fill in ".play-name-edit" with "Sofia"
    And I fill in ".play-author-name-edit" with "My Favorite Playwright"
    And I click on ".play-author-edit-results li"
    And I fill in ".play-about-edit" with "Most popular name in Italy"
    And I click on ".edit-play-save"
    And I go to the "event" add page
    And I fill in ".event-play-name-edit" with "Sofia"
    And I click on ".event-play-edit-results li"
    And I fill in ".event-about-edit" with "A workshop on spelling"
    And I click on ".edit-event-save"

  Scenario: Add participant form should only display for logged in users
    And I hover over ".user-menu"
    And I click on ".menu-logout"
    And I go to the play page for "Sofia"
    And I click on ".event-name a"
    Then I should not see ".participant-profile-name-edit"

  Scenario: Users should be see all events associated with an play
    And a profile with the following fields:
      | name | Il Regista |
    And I go to the play page for "Sofia"
    And I click on ".event-name a"
    And I fill in ".participant-profile-name-edit" with "Il Regista"
    And I click on ".autocomplete-results li"
    And I select "Stage Director" from ".participant-role-edit"
    And I click on ".edit-participant-save"
    And I go to the play page for "Sofia"
    And I click on ".event-name a"
    Then the "event-participant-name" element should contain "Il Regista"
    And the "event-participant-role" element should contain "Stage Director"
