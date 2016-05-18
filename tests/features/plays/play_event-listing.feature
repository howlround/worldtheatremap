Feature: Events listing on play pages

  As a user
  I want to see all events for a play
  So I can know more about the play

  Background:
    Given I am on the home page

  Scenario: Users should be see all events associated with an play
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
    When I go to the play page for "Sofia"
    Then the "article.event-teaser" element should contain "A workshop on spelling"
