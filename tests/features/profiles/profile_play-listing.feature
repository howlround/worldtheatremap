Feature: List plays on the playwright profile

  As a user
  I want to see all plays by a playwright
  So I can better understand what they do

  Background:
    Given I am on the home page

  Scenario: After creating a play that lists a profile as the primary author the play should display on that profile page
    And a profile with the following fields:
      | name | My Favorite Playwright |
    And I am logged in
    And I hover over ".add"
    When I click on ".add-play"
    And I fill in ".play-name-edit" with "A Play About Maryam"
    And I fill in ".play-about-edit" with "Most popular name in the Arab world (2015) (BabyCenter Arabia members)"
    And I fill in ".play-author-name-edit" with "Favorite"
    When I click on "ul.play-author-edit-results li"
    And I click on ".edit-play-save"
    And I click on ".play-author"
    Then the "article.play-teaser" element should contain "A Play About Maryam"

  Scenario: After creating a play that lists a profile as a role other than primary author the play should display on that profile page
    And a profile with the following fields:
      | name | My Favorite Playwright |
    And I am logged in
    And I hover over ".add"
    And I click on ".add-play"
    And I fill in ".play-name-edit" with "A Play About Maryam"
    And I fill in ".play-about-edit" with "Most popular name in the Arab world (2015) (BabyCenter Arabia members)"
    And I fill in ".play-author-name-edit" with "Favorite"
    And I click on "ul.play-author-edit-results li"
    And I click on ".edit-play-save"
    And I go to the "event" add page
    And I fill in ".event-play-name-edit" with "A Play About Maryam"
    And I click on ".event-play-edit-results li"
    And I fill in ".event-about-edit" with "A workshop on spelling"
    And I select "Performance" from ".event-type-edit"
    And I click on ".edit-event-save"
    And a profile with the following fields:
      | name | Il Regista |
    And I go to the play page for "A Play About Maryam"
    And I click on ".event-name a"
    And I fill in ".participant-profile-name-edit" with "Il Regista"
    And I click on ".autocomplete-results li"
    And I select "Stage Director" from ".participant-role-edit"
    And I click on ".edit-participant-save"
    When I go to the profile page for "Il Regista"
    Then the "article.play-teaser" element should contain "A Play About Maryam"
