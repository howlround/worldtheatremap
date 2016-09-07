@events
Feature: Create events

  As a user
  I want to create a new event
  So I can add information

  Background:
    Given I am on the home page

  Scenario: Anonymous users should see the option to add an event but be directed to a login page with a message
    When I go to the "event" add page
    Then the "h1" element should contain "Sign in"
    And the ".wrapper-message" element should contain "Sign in or register to participate in the World Theatre Map"

  Scenario: Users should be able to create an event with all the fields
    And a profile with the following fields:
      | name | My Favorite Playwright |
    And I am logged in
    And I go to the "show" add page
    And I fill in ".show-name-edit" with "Sofia"
    And I fill in ".show-author-name-edit" with "My Favorite Playwright"
    And I click on ".autocomplete-results li"
    And I fill in ".show-about-edit" with "Most popular name in Italy"
    And I click on ".edit-show-save"
    When I go to the "event" add page
    And I fill in ".event-show-edit" with "Sofia"
    And I click on ".autocomplete-results li"
    And I select "Performance" from the ".event-type-edit" combobox
    And I fill in ".event-about-edit" with "A workshop on spelling"
    And I click on ".form-group-startDate input"
    And I click on ".react-datepicker__day=1"
    And I click on ".form-group-endDate input"
    And I click on ".react-datepicker__day=15"
    And I fill in ".event-street-address-edit" with "Brandsen 805"
    And I fill in ".event-locality-edit" with "Buenos Aires"
    And I fill in ".event-country-edit" with "Argentina"
    And I fill in ".event-postal-code-edit" with "1161"
    And I fill in ".find-pin" with "Buenos Aires"
    And I click on ".pac-item"
    And I should wait extra long until "pac-item" is not visible
    And I click on ".edit-event-save"
    Then the "h1.page-title" element should contain "Sofia"
    And the ".event-about" element should contain "A workshop on spelling"
    And the ".event-date-range" element should contain the date range for day "1" to day "15" of this month
    And I should see the "#globe" element
    And the ".event-location" element should contain "Buenos Aires, Argentina"

  Scenario: Events should display the primary author for the related show
    And a profile with the following fields:
      | name | My Favorite Playwright |
    And I am logged in
    And I go to the "show" add page
    And I fill in ".show-name-edit" with "Sofia"
    And I fill in ".show-author-name-edit" with "My Favorite Playwright"
    And I click on ".autocomplete-results li"
    And I fill in ".show-about-edit" with "Most popular name in Italy"
    And I click on ".edit-show-save"
    When I go to the "event" add page
    And I fill in ".event-show-edit" with "Sofia"
    And I click on ".autocomplete-results li"
    And I select "Performance" from the ".event-type-edit" combobox
    And I fill in ".event-about-edit" with "A workshop on spelling"
    And I click on ".form-group-startDate input"
    And I click on ".react-datepicker__day=1"
    And I click on ".form-group-endDate input"
    And I click on ".react-datepicker__day=15"
    And I click on ".edit-event-save"
    Then the ".event-name" element should contain "Sofia"
    Then the ".event-type" element should contain "Performance"
    And the ".event-authorship" element should contain "My Favorite Playwright"

  Scenario: Event type should be required and give an error if not selected
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
    And I fill in ".event-about-edit" with "A workshop on spelling"
    And I click on ".form-group-startDate input"
    And I click on ".react-datepicker__day=1"
    And I click on ".form-group-endDate input"
    And I click on ".react-datepicker__day=15"
    And I click on ".edit-event-save"
    Then the ".error-block" element should contain "Event type is required"
