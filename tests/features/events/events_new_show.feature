@events @shows
Feature: Create events for a show that doesn't exist yet

  As a user
  I want to create a new event for a show that doesn't exist yet
  So I can more quickly add information

  Background:
    Given I am on the English language home page

  Scenario: Users should be able to add events for a show that is not in the system yet but has an existing author
    And I am logged in
    And a profile with the following fields:
      | name | My Favorite Playwright |
    When I go to the "event" add page
    And I fill in ".event-show-edit" with "Althea"
    And I click on ".autocomplete-results li"
    And I fill in ".show-author-name-edit" with "My Favorite Playwright"
    And I click on ".autocomplete-results li"
    And I fill in ".event-organization-edit" with "Organization of the year"
    And I click on ".autocomplete-results li"
    And I select "Performance" from the ".event-type-edit" combobox
    And I click on ".form-group-startDate input"
    And I click on ".react-datepicker__day=1"
    And I click on ".form-group-endDate input"
    And I click on ".react-datepicker__navigation--next"
    And I click on ".react-datepicker__day=15"
    And I select "India" from the ".country-select-edit" combobox
    And I fill in "[name=lat]" with "-36.03133177633187"
    And I fill in "[name=lon]" with "-72.0703125"
    And I click on ".edit-event-save"
    Then the "h1.page-title" element should contain "Althea"
    And the ".event-authorship" element should contain "My Favorite Playwright"

  Scenario: Users should be able to add events for a show that is not in the system yet and also has a new author
    And I am logged in
    When I go to the "event" add page
    And I fill in ".event-show-edit" with "Althea"
    And I click on ".autocomplete-results li"
    And I fill in ".show-author-name-edit" with "Unknown Playwright"
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
    And I select "India" from the ".country-select-edit" combobox
    And I click on ".edit-event-save"
    Then the "h1.page-title" element should contain "Althea"
    And the ".event-authorship" element should contain "Unknown Playwright"
    And I click on ".show-author"
    Then the ".profile-name" element should contain "Unknown Playwright"

  Scenario: Users should be able to edit an event and change it to a show that is not already in the system with an author not already in the system
    And I am on the home page
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
    And I fill in ".event-organization-edit" with "Organization of the year"
    And I click on ".autocomplete-results li"
    And I select "Performance" from the ".event-type-edit" combobox
    And I fill in ".event-about-edit" with "http://google.com"
    And I click on ".form-group-startDate input"
    And I click on ".react-datepicker__day=1"
    And I click on ".form-group-endDate input"
    And I click on ".react-datepicker__day=15"
    And I fill in "[name=lat]" with "-36.03133177633187"
    And I fill in "[name=lon]" with "-72.0703125"
    And I select "India" from the ".country-select-edit" combobox
    And I click on ".edit-event-save"
    And I click on ".edit-link"
    When I fill in ".event-show-edit" with "Althea"
    And I click on ".autocomplete-results li"
    And I fill in ".show-author-name-edit" with "Unknown Playwright"
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
    And I select "India" from the ".country-select-edit" combobox
    And I click on ".edit-event-save"
    Then the "h1.page-title" element should contain "Althea"
    And the ".event-authorship" element should contain "Unknown Playwright"
    And I click on ".show-author"
    Then the ".profile-name" element should contain "Unknown Playwright"

  Scenario: When a user types in a show name that matches other shows they should still be able to add a new show
    And I am on the home page
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
    And I click on ".autocomplete-results li.select-show"
    And I fill in ".event-organization-edit" with "Organization of the year"
    And I click on ".autocomplete-results li"
    And I select "Performance" from the ".event-type-edit" combobox
    And I fill in ".event-about-edit" with "http://google.com"
    And I click on ".form-group-startDate input"
    And I click on ".react-datepicker__day=1"
    And I click on ".form-group-endDate input"
    And I click on ".react-datepicker__day=15"
    And I fill in "[name=lat]" with "-36.03133177633187"
    And I fill in "[name=lon]" with "-72.0703125"
    And I select "India" from the ".country-select-edit" combobox
    And I click on ".edit-event-save"
    And I click on ".edit-link"
    When I fill in ".event-show-edit" with "Sof"
    And I click on ".autocomplete-results li.select-new-show"
    And I fill in ".show-author-name-edit" with "Unknown Playwright"
    And I click on ".autocomplete-results li.create-profile"
    And I fill in ".event-organization-edit" with "Organization of the year"
    And I click on ".autocomplete-results li"
    And I select "Performance" from the ".event-type-edit" combobox
    And I click on ".form-group-startDate input"
    And I click on ".react-datepicker__day=1"
    And I click on ".form-group-endDate input"
    And I click on ".react-datepicker__day=15"
    And I fill in "[name=lat]" with "-36.03133177633187"
    And I fill in "[name=lon]" with "-72.0703125"
    And I select "India" from the ".country-select-edit" combobox
    And I click on ".edit-event-save"
    Then the "h1.page-title" element should contain "Sof"
    And the ".event-authorship" element should contain "Unknown Playwright"
    And I click on ".show-author"
    Then the ".profile-name" element should contain "Unknown Playwright"

  Scenario: During adding an event for a show that does not exist in in the system when a user types in a profile name that matches other profiles they should still be able to add it as a new profile
    And I am on the home page
    And a profile with the following fields:
      | name | My Favorite Playwright |
    And I am logged in
    And I go to the "event" add page
    When I fill in ".event-show-edit" with "Sof"
    And I click on ".autocomplete-results li.select-new-show"
    And I fill in ".show-author-name-edit" with "My Favorite"
    And I click on ".autocomplete-results li.create-profile"
    And I fill in ".event-organization-edit" with "Organization of the year"
    And I click on ".autocomplete-results li"
    And I select "Performance" from the ".event-type-edit" combobox
    And I click on ".form-group-startDate input"
    And I click on ".react-datepicker__day=1"
    And I click on ".form-group-endDate input"
    And I click on ".react-datepicker__day=15"
    And I fill in "[name=lat]" with "-36.03133177633187"
    And I fill in "[name=lon]" with "-72.0703125"
    And I select "India" from the ".country-select-edit" combobox
    And I click on ".edit-event-save"
    Then the "h1.page-title" element should contain "Sof"
    And the ".event-authorship" element should contain "My Favorite"
    And the ".event-authorship" element should not contain "My Favorite Playwright"
    And I click on ".show-author"
    And the ".profile-name" element should contain "My Favorite"
    And the ".profile-name" element should not contain "My Favorite Playwright"
