Feature: Add new primary author profiles from show create page

  As a user
  I want to create a profile for an author not currently in the system
  So I can add more information quickly

  Background:
    Given I am on the English language home page

  Scenario: Users should be able to create a show for a previously non-existing primary author
    And I am logged in
    And I go to the "show" add page
    And I fill in ".show-name-edit" with "Sofía"
    And I fill in ".show-author-name-edit" with "Unknown Playwright"
    And I click on ".autocomplete-results li"
    And I click on ".edit-show-save"
    Then the ".show-name" element should contain "Sofía"
    And the ".show-author" element should contain "Unknown Playwright"
    When I go to the profile page for "Unknown Playwright"
    Then the ".profile-name" element should contain "Unknown Playwright"

  Scenario: After creating a profile for a previously non-existing primary author and saving the show a user should be able to click on the author and see their profile
    And I am logged in
    And I go to the "show" add page
    And I fill in ".show-name-edit" with "Sofía"
    And I fill in ".show-author-name-edit" with "Unknown Playwright"
    When I click on "ul.autocomplete-results li"
    And I click on ".edit-show-save"
    And I click on ".show-author"
    Then the ".profile-name" element should contain "Unknown Playwright"

  # Scenario: Show edit form...
