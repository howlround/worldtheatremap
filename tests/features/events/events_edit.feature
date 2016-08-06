Feature: Edit events

  As a user
  I want to edit existing event
  So I can keep information up to date

  Background:
    Given I am on the home page
    And a profile with the following fields:
      | name | My Favorite Playwright |
    And I am logged in
    And I go to the "play" add page
    And I fill in ".play-name-edit" with "Sofia"
    And I fill in ".play-author-name-edit" with "My Favorite Playwright"
    And I click on ".autocomplete-results li"
    And I fill in ".play-about-edit" with "Most popular name in Italy"
    And I click on ".edit-play-save"
    And I hover over ".add"
    When I click on ".add-event"
    And I fill in ".event-play-name-edit" with "Sofia"
    And I click on ".autocomplete-results li"
    And I select "Performance" from ".event-type-edit"
    And I fill in ".event-about-edit" with "A workshop on spelling"
    And I click on ".edit-event-save"

  Scenario: Users should be able to edit basic information for an event
    And I go to the play page for "Sofia"
    And I click on ".event-name a"
    And I click on ".edit-link"
    And I select "Twitter Chat" from ".event-type-edit"
    And I fill in ".event-about-edit" with "Tweets about spelling"
    And I click on ".edit-event-save"
    Then the "h1.page-title" element should contain "Sofia"
    And the ".event-about" element should contain "Tweets about spelling"

  # Scenario: Events should display the primary author for the related show
  #   And a profile with the following fields:
  #     | name | My Favorite Playwright |
  #   And I am logged in
  #   And I go to the "play" add page
  #   And I fill in ".play-name-edit" with "Sofia"
  #   And I fill in ".play-author-name-edit" with "My Favorite Playwright"
  #   And I click on ".autocomplete-results li"
  #   And I fill in ".play-about-edit" with "Most popular name in Italy"
  #   And I click on ".edit-play-save"
  #   And I hover over ".add"
  #   When I click on ".add-event"
  #   And I fill in ".event-play-name-edit" with "Sofia"
  #   And I click on ".autocomplete-results li"
  #   And I select "Performance" from ".event-type-edit"
  #   And I fill in ".event-about-edit" with "A workshop on spelling"
  #   And I click on ".edit-event-save"
  #   Then the ".event-name" element should contain "Sofia"
  #   Then the ".event-type" element should contain "Performance"
  #   And the ".event-authorship" element should contain "My Favorite Playwright"
