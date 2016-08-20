Feature: Events listing on show pages

  As a user
  I want to see all events for a show
  So I can know more about the show

  Background:
    Given I am on the home page

  Scenario: Users should be see all events associated with a show
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
    And I fill in ".event-show-name-edit" with "Sofia"
    And I click on ".autocomplete-results li"
    And I fill in ".event-about-edit" with "A workshop on spelling"
    And I select "Performance" from ".event-type-edit"
    And I click on ".edit-event-save"
    When I go to the show page for "Sofia"
    Then the "article.event-teaser" element should contain "Performance"
