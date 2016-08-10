Feature: Create plays

  As a user
  I want to create new play
  So I can add information

  Background:
    Given I am on the home page

  Scenario: Anonymous users should see the add options but be directed to a login page with a message
    And I hover over ".add"
    When I click on ".add-play"
    Then the "h1" element should contain "Sign in"
    And the ".wrapper-message" element should contain "Sign in or register to participate in the World Theatre Map"

  Scenario: Users should see all the fields on the add play form
    And I am logged in
    And I hover over ".add"
    When I click on ".add-play"
    Then I should see the ".play-name-edit" element
    Then I should see the ".play-author-name-edit" element
    And I should see the ".play-about-edit" element

  Scenario: Users should be able to create a play with all the fields
    And a profile with the following fields:
      | name | My Favorite Playwright |
    And I am logged in
    And I hover over ".add"
    When I click on ".add-play"
    And I fill in ".play-name-edit" with "Sofía"
    And I fill in ".play-author-name-edit" with "My Favorite Playwright"
    And I click on ".autocomplete-results li"
    And I fill in ".play-about-edit" with "Most popular name in Argentina"
    And I click on ".edit-play-save"
    Then the ".play-name" element should contain "Sofía"
    Then the ".play-author" element should contain "My Favorite Playwright"
    And the ".play-about" element should contain "Most popular name in Argentina"

  Scenario: Autocomplete suggestions for existing primary authorship field
    And a profile with the following fields:
      | name | My Favorite Playwright |
    And I am logged in
    And I hover over ".add"
    When I click on ".add-play"
    And I fill in ".play-name-edit" with "Sofía"
    And I fill in ".play-author-name-edit" with "Favorite"
    Then the "ul.autocomplete-results li" element should contain "My Favorite Playwright"

  Scenario: After selecting an autocompleted primary author and saving the play a user should be able to click on the author and see their profile
    And a profile with the following fields:
      | name | My Favorite Playwright |
    And I am logged in
    And I hover over ".add"
    When I click on ".add-play"
    And I fill in ".play-name-edit" with "Sofía"
    And I fill in ".play-author-name-edit" with "Favorite"
    When I click on "ul.autocomplete-results li"
    And I click on ".edit-play-save"
    And I click on ".play-author"
    Then the ".profile-name" element should contain "My Favorite Playwright"

  Scenario: A single playwright should not have a comma
    And a profile with the following fields:
      | name | My Favorite Playwright |
    And I am logged in
    And I hover over ".add"
    When I click on ".add-play"
    And I fill in ".play-name-edit" with "Sofía"
    And I fill in ".play-author-name-edit" with "Favorite"
    When I click on "ul.autocomplete-results li"
    And I click on ".edit-play-save"
    Then the ".play-authorship" element should not contain "My Favorite Playwright,"

  Scenario: Two playwrights should be seperated by an AND
    And a profile with the following fields:
      | name | My Favorite Playwright |
    And a profile with the following fields:
      | name | The second best playwright |
    And I am logged in
    And I hover over ".add"
    When I click on ".add-play"
    And I fill in ".play-name-edit" with "Sofía"
    And I fill in ".play-author-name-edit" with "Favorite"
    And I click on "ul.autocomplete-results li"
    And I click on ".btn-add"
    And I fill in ".form-group-author-1-name .play-author-name-edit" with "second"
    And I click on "ul.autocomplete-results li"
    And I click on ".edit-play-save"
    Then the ".play-authorship" element should contain "My Favorite Playwright and The second best playwright"

  Scenario: When there are three playwrights the first two should be seperated by a comma and the third should be seperated by an AND
    And a profile with the following fields:
      | name | My Favorite Playwright |
    And a profile with the following fields:
      | name | The second best playwright |
    And a profile with the following fields:
      | name | The worst playwright |
    And I am logged in
    And I hover over ".add"
    When I click on ".add-play"
    And I fill in ".play-name-edit" with "Sofía"
    And I fill in ".play-author-name-edit" with "Favorite"
    And I click on "ul.autocomplete-results li"
    And I click on ".btn-add"
    And I fill in ".form-group-author-1-name .play-author-name-edit" with "second"
    And I click on "ul.autocomplete-results li"
    And I click on ".btn-add"
    And I fill in ".form-group-author-2-name .play-author-name-edit" with "worst"
    And I click on "ul.autocomplete-results li"
    And I click on ".edit-play-save"
    Then the ".play-authorship" element should contain "My Favorite Playwright, The second best playwright, and The worst playwright"
