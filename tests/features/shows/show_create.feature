@shows
Feature: Create shows

  As a user
  I want to create new show
  So I can add information

  Background:
    Given I am on the English language home page

  Scenario: Anonymous users should see the add options but be directed to a login page with a message
    When I go to the "show" add page
    Then the "h1" element should contain "Sign in"
    And the ".wrapper-message" element should contain "Sign in or register to participate in the World Theatre Map"

  Scenario: There should be no show option in the add menu
    And I am logged in
    And I hover over ".add"
    Then I should not see ".add-show"

  Scenario: Users should see all the fields on the add show form
    And I am logged in
    When I go to the "show" add page
    Then I should see the ".show-name-edit" element
    And I should see the ".show-author-name-edit" element
    And I should see the ".show-about-edit" element

  Scenario: Users should be able to create a show with all the fields
    And a profile with the following fields:
      | name | My Favorite Playwright |
    And I am logged in
    When I go to the "show" add page
    And I fill in ".show-name-edit" with "Sofía"
    And I fill in ".show-author-name-edit" with "My Favorite Playwright"
    And I click on ".autocomplete-results li"
    And I fill in ".show-about-edit" with "Most popular name in Argentina"
    And I select "Musical Theatre" from the ".interests-edit" combobox
    And I click on ".edit-show-save"
    Then the ".show-name" element should contain "Sofía"
    Then the ".show-author" element should contain "My Favorite Playwright"
    And the ".show-interests" element should contain "Musicals"
    And the ".show-about" element should contain "Most popular name in Argentina"

  Scenario: Autocomplete suggestions for existing primary authorship field
    And a profile with the following fields:
      | name | My Favorite Playwright |
    And I am logged in
    When I go to the "show" add page
    And I fill in ".show-name-edit" with "Sofía"
    And I fill in ".show-author-name-edit" with "Favorite"
    Then the "ul.autocomplete-results li" element should contain "My Favorite Playwright"

  Scenario: After selecting an autocompleted primary author and saving the show a user should be able to click on the author and see their profile
    And a profile with the following fields:
      | name | My Favorite Playwright |
    And I am logged in
    And I go to the "show" add page
    And I fill in ".show-name-edit" with "Sofía"
    And I fill in ".show-author-name-edit" with "Favorite"
    When I click on "ul.autocomplete-results li"
    And I click on ".edit-show-save"
    And I click on ".show-author"
    Then the ".profile-name" element should contain "My Favorite Playwright"

  Scenario: A single playwright should not have a comma
    And a profile with the following fields:
      | name | My Favorite Playwright |
    And I am logged in
    And I go to the "show" add page
    And I fill in ".show-name-edit" with "Sofía"
    And I fill in ".show-author-name-edit" with "Favorite"
    When I click on "ul.autocomplete-results li"
    And I click on ".edit-show-save"
    Then the ".show-authorship" element should not contain "My Favorite Playwright,"

  Scenario: Two playwrights should be seperated by an AND
    And a profile with the following fields:
      | name | My Favorite Playwright |
    And a profile with the following fields:
      | name | The second best playwright |
    And I am logged in
    When I go to the "show" add page
    And I fill in ".show-name-edit" with "Sofía"
    And I fill in ".show-author-name-edit" with "Favorite"
    And I click on "ul.autocomplete-results li"
    And I click on ".btn-add"
    And I fill in ".form-group-author-1-name .show-author-name-edit" with "second"
    And I click on "ul.autocomplete-results li"
    And I click on ".edit-show-save"
    Then the ".show-authorship" element should contain "My Favorite Playwright and The second best playwright"

  Scenario: When there are three playwrights the first two should be seperated by a comma and the third should be seperated by an AND
    And a profile with the following fields:
      | name | My Favorite Playwright |
    And a profile with the following fields:
      | name | The second best playwright |
    And a profile with the following fields:
      | name | The worst playwright |
    And I am logged in
    When I go to the "show" add page
    And I fill in ".show-name-edit" with "Sofía"
    And I fill in ".show-author-name-edit" with "Favorite"
    And I click on "ul.autocomplete-results li"
    And I click on ".btn-add"
    And I fill in ".form-group-author-1-name .show-author-name-edit" with "second"
    And I click on "ul.autocomplete-results li"
    And I click on ".btn-add"
    And I fill in ".form-group-author-2-name .show-author-name-edit" with "worst"
    And I click on "ul.autocomplete-results li"
    And I click on ".edit-show-save"
    Then the ".show-authorship" element should contain "My Favorite Playwright, The second best playwright and The worst playwright"
