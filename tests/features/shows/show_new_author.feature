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

  Scenario: Users should be able to add a previously non-existing author to a show from the show edit form
    And a profile with the following fields:
      | name | Organization of the year |
    And a profile with the following fields:
      | name | My Favorite Playwright |
    And I am logged in
    And I go to the "show" add page
    And I fill in ".show-name-edit" with "Emilia"
    And I fill in ".show-author-name-edit" with "My Favorite Playwright"
    And I click on ".autocomplete-results li"
    And I fill in ".show-about-edit" with "Most popular name in Argentina"
    And I click on ".label-text=Musical Theatre"
    And I click on ".edit-show-save"
    When I go to the "event" add page
    And I fill in ".event-show-edit" with "Emilia"
    And I click on ".autocomplete-results li"
    And I fill in ".event-organization-edit" with "Organization of the year"
    And I click on ".autocomplete-results li"
    And I select "Performance" from the ".event-type-edit" combobox
    And I click on ".form-group-startDate input"
    And I click on ".react-datepicker__day=1"
    And I click on ".form-group-endDate input"
    And I click on ".react-datepicker__day=15"
    And I fill in "[name=lat]" with "-36.03133177633187"
    And I fill in "[name=lon]" with "-72.0703125"
    And I select "Coral Sea Islands" from the ".country-select-edit" combobox
    And I click on ".edit-event-save"
    When I go to the show page for "Emilia"
    And I follow ".edit-link"
    And I click on ".btn-add"
    And I fill in ".form-group-author-1 .show-author-name-edit" with "Unknown Playwright"
    And I click on "ul.autocomplete-results li"
    And I click on ".edit-show-save"
    And I click on "a.event-view-link"
    Then the ".event-authorship" element should contain "My Favorite Playwright and Unknown Playwright"
