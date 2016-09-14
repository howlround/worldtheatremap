Feature: Related profiles on profile pages

  As a user
  I want to see all related profiles for a given profile
  So I can know more about the entity

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
    And I fill in "[name=lat]" with "-36.03133177633187"
    And I fill in "[name=lon]" with "-72.0703125"
    And I click on ".form-group-startDate input"
    And I click on ".react-datepicker__day=1"
    And I click on ".form-group-endDate input"
    And I click on ".react-datepicker__day=15"
    And I select "Coral Sea Islands" from the ".country-select-edit" combobox
    And I click on ".edit-event-save"
    And a profile with the following fields:
      | name | Il Regista |
    And I go to the show page for "Sofia"
    And I click on ".event-name a"
    And I fill in ".participant-profile-edit" with "Il Regista"
    And I click on ".autocomplete-results li"
    And I fill in ".participant-role-edit" with "Stage Director"
    And I click on ".edit-participant-save"
    And a profile with the following fields:
      | name | Il Curatore |
    And I go to the show page for "Sofia"
    And I click on ".event-name a"
    And I fill in ".participant-profile-edit" with "Il Curatore"
    And I click on ".autocomplete-results li"
    And I fill in ".participant-role-edit" with "Curator"
    And I click on ".edit-participant-save"

  Scenario: As a user viewing a profile I should see other profiles they are related to
    When I go to the profile page for "Il Regista"
    Then the ".related-profiles" element should contain "Il Curatore"

  Scenario: Primary authors should be listed as related profiles
    When I go to the profile page for "Il Regista"
    Then the ".related-profiles" element should contain "My Favorite Playwright"

  # Scenario: Update after deleting a participant from an event
  # Scenario: Being related by multiple events should make profiles more related
  # Scenario: After deleting one profile from an event it should not be related to the other profile any more
  # Scenario: If a profile is listed on an event twice and one of the roles is removed they should still be related to other profiles on the event
