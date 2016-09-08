@events
Feature: Edit events

  As a user
  I want to edit existing event
  So I can keep information up to date

  Background:
    Given I am on the home page
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
    And I select "Performance" from the ".event-type-edit" combobox
    And I fill in ".event-about-edit" with "A workshop on spelling"
    And I click on ".form-group-startDate input"
    And I click on ".react-datepicker__day=1"
    And I click on ".form-group-endDate input"
    And I click on ".react-datepicker__day=15"
    And I fill in "[name=lat]" with "-36.03133177633187"
    And I fill in "[name=lon]" with "-72.0703125"
    And I select "Coral Sea Islands" from the ".country-select-edit" combobox
    And I click on ".edit-event-save"

  Scenario: Users should be able to edit basic information for an event
    And I go to the show page for "Sofia"
    And I click on ".event-name a"
    And I click on ".edit-link"
    And I select "Twitter Chat" from the ".event-type-edit" combobox
    And I fill in ".event-about-edit" with "Tweets about spelling"
    And I click on ".form-group-startDate input"
    And I click on ".react-datepicker__day=2"
    And I click on ".form-group-endDate input"
    And I click on ".react-datepicker__day=18"
    And I fill in "[name=lat]" with "-36.03133177633187"
    And I fill in "[name=lon]" with "-72.0703125"
    And I select "Coral Sea Islands" from the ".country-select-edit" combobox
    And I click on ".edit-event-save"
    Then the "h1.page-title" element should contain "Sofia"
    And the ".event-about" element should contain "Tweets about spelling"
    And the ".event-date-range" element should contain the date range for day "2" to day "18" of this month

  @chromeOnly
  Scenario: Users should be able to edit location information for events (CHROME ONLY)
    And I go to the show page for "Sofia"
    And I click on ".event-name a"
    And I click on ".edit-link"
    And I fill in ".find-pin" with "Buenos Aires"
    And I click on ".pac-item"
    And I should wait extra long until "pac-item" is not visible
    And I click on ".edit-event-save"
    Then I should see the "#globe" element

  Scenario: Users should see the existing show value when editing an event
    And I go to the show page for "Sofia"
    And I click on ".event-name a"
    When I click on ".edit-link"
    Then the ".event-show-edit" field should have the value "Sofia"
