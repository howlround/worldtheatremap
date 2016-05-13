Feature: Create plays

  As a user
  I want to create new play
  So I can add information

  Scenario: Anonymous users should see the add options but be directed to a login page with a message
    And I click on ".add"
    And I click on ".add-play"
    Then the "h1" element should contain "Sign in"
    And the ".wrapper-message" element should contain "Sign in or register to participate in the World Theatre Map"

  Scenario: Users should see all the fields on the add play form
    And I am logged in
    And I click on ".add"
    When I click on ".add-play"
    Then I should see the ".play-name-edit" element
    Then I should see the ".play-author-edit" element
    And I should see the ".play-about-edit" element

  Scenario: Users should be able to create a play with all the fields
    And I am logged in
    And I click on ".add"
    When I click on ".add-play"
    And I fill in ".play-name-edit" with "Sofía"
    And I fill in ".play-author-edit" with "No autocomplete author"
    And I fill in ".play-about-edit" with "Most popular name in Argentina"
    And I click on ".edit-play-save"
    Then the ".play-name" element should contain "Sofía"
    Then the ".play-author" element should contain "No autocomplete author"
    And the ".play-about" element should contain "Most popular name in Argentina"

  Scenario: Autocomplete suggestions for existing primary authorship field
    And a profile with the following fields:
      | name | My Favorite Playwright |
    And I am logged in
    And I click on ".add"
    When I click on ".add-play"
    And I fill in ".play-name-edit" with "Sofía"
    And I fill in ".play-author-name-edit" with "Favorite"
    Then the "ul.play-author-edit-results li" element should contain "My Favorite Playwright"

  Scenario: After selecting an autocompleted primary author and saving the play a user should be able to click on the author and see their profile
    And a profile with the following fields:
      | name | My Favorite Playwright |
    And I am logged in
    And I click on ".add"
    When I click on ".add-play"
    And I fill in ".play-name-edit" with "Sofía"
    And I fill in ".play-author-name-edit" with "Favorite"
    When I click on "ul.play-author-edit-results li"
    And I click on ".edit-play-save"
    And I click on ".play-author"
    Then the ".profile-name" element should contain "My Favorite Playwright"
