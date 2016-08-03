Feature: Related profiles on profile pages

  As a user
  I want to see all related profiles for a given profile
  So I can know more about the entity

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
    And I select "Performance" from ".event-type-edit"
    And I fill in ".event-about-edit" with "A workshop on spelling"
    And I click on ".edit-event-save"
    And a profile with the following fields:
      | name | Il Regista |
    And I go to the play page for "Sofia"
    And I click on ".event-name a"
    And I fill in ".participant-profile-name-edit" with "Il Regista"
    And I click on ".autocomplete-results li"
    And I select "Stage Director" from ".participant-role-edit"
    And I click on ".edit-participant-save"
    And a profile with the following fields:
      | name | Il Curatore |
    And I go to the play page for "Sofia"
    And I click on ".event-name a"
    And I fill in ".participant-profile-name-edit" with "Il Curatore"
    And I click on ".autocomplete-results li"
    And I select "Curator" from ".participant-role-edit"
    And I click on ".edit-participant-save"

  Scenario: As a user viewing a profile I should see other profiles they are related to
    When I go to the profile page for "Il Regista"
    Then the ".related-profiles" element should contain "Il Curatore"

  Scenario: Update after deleting a participant from an event
  Scenario: Being related by multiple events should make profiles more related
  Scenario: After deleting one profile from an event it should not be related to the other profile any more
  Scenario: If a profile is listed on an event twice and one of the roles is removed they should still be related to other profiles on the event
