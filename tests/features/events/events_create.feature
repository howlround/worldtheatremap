@events
Feature: Create events

  As a user
  I want to create a new event
  So I can add information

  Background:
    Given I am on the English language home page

  Scenario: Anonymous users should see the option to add an event but be directed to a login page with a message
    When I go to the "event" add page
    Then the "h1" element should contain "Sign in"
    And the ".wrapper-message" element should contain "Sign in or register to participate in the World Theatre Map"

  Scenario: Users should be able to create an event with all the fields
    And a profile with the following fields:
      | name | My Favorite Playwright |
    And a profile with the following fields:
      | name | Organization of the year |
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
    And I fill in ".event-organization-edit" with "Organization of the year"
    And I click on ".autocomplete-results li"
    And I select "Performance" from the ".event-type-edit" combobox
    And I fill in ".event-about-edit" with "http://google.com"
    And I click on ".form-group-startDate input"
    And I click on ".react-datepicker__day=1"
    And I click on ".form-group-endDate input"
    And I click on ".react-datepicker__day=15"
    And I fill in ".find-pin" with "Buenos Aires"
    And I click on ".pac-item"
    And I should wait extra long until "pac-item" is not visible
    And I fill in ".event-street-address-edit" with "Brandsen 805"
    And I fill in ".event-locality-edit" with "Buenos Aires"
    And I select "Argentina" from the ".country-select-edit" combobox
    And I fill in ".event-postal-code-edit" with "1161"
    And I click on ".edit-event-save"
    Then the "h1.page-title" element should contain "Sofia"
    And the ".event-about" element should contain "More information"
    And the ".event-type" element should contain "Performance"
    And the ".event-date-range" element should contain the date range for day "1" to day "15" of this month
    And I should see the "#globe" element
    And the ".event-location" element should contain "Buenos Aires, Argentina"
    And the ".event-organizations" element should contain "Organization of the year"

  Scenario: Users should be able to create an event with all the fields offline (doesn't need google maps)
    And a profile with the following fields:
      | name | My Favorite Playwright |
    And a profile with the following fields:
      | name | Organization of the year |
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
    And I fill in ".event-street-address-edit" with "Brandsen 805"
    And I fill in ".event-locality-edit" with "Buenos Aires"
    And I select "Argentina" from the ".country-select-edit" combobox
    And I fill in ".event-postal-code-edit" with "1161"
    And I click on ".edit-event-save"
    Then the "h1.page-title" element should contain "Sofia"
    And the ".event-about" element should contain "More information"
    And the ".event-type" element should contain "Performance"
    And the ".event-date-range" element should contain the date range for day "1" to day "15" of this month
    And I should see the "#globe" element
    And the ".event-location" element should contain "Buenos Aires, Argentina"
    And the ".event-organizations" element should contain "Organization of the year"

  Scenario: Users who use the text box on the location map when adding an event should have the other address fields prepopulated
    And a profile with the following fields:
      | name | My Favorite Playwright |
    And a profile with the following fields:
      | name | Organization of the year |
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
    And I fill in ".event-organization-edit" with "Organization of the year"
    And I click on ".autocomplete-results li"
    And I select "Performance" from the ".event-type-edit" combobox
    And I fill in ".event-about-edit" with "http://google.com"
    And I click on ".form-group-startDate input"
    And I click on ".react-datepicker__day=1"
    And I click on ".form-group-endDate input"
    And I click on ".react-datepicker__day=15"
    And I fill in ".find-pin" with "10 Boylston Pl, Boston"
    And I click on ".pac-item"
    And I should wait extra long until "pac-item" is not visible
    Then the ".event-street-address-edit" field should have the value "10 Boylston Place"
    And the ".event-locality-edit" field should have the value "Boston"
    And the ".event-administrative-area-edit" field should have the value "Massachusetts"
    And I click on ".edit-event-save"
    And the ".event-location" element should contain "Massachusetts, United States"

  Scenario: Events should display the primary author for the related show
    And I am logged in
    And I go to the "profile" add page
    And I fill in ".profile-name-edit" with "My Favorite Playwright"
    And I click on ".edit-profile-save"
    And I go to the "show" add page
    And I fill in ".show-name-edit" with "Sofia"
    And I fill in ".show-author-name-edit" with "My Favorite Playwright"
    And I click on ".autocomplete-results li"
    And I fill in ".show-about-edit" with "Most popular name in Italy"
    And I click on ".edit-show-save"
    When I go to the "event" add page
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
    And I select "Coral Sea Islands" from the ".country-select-edit" combobox
    And I fill in ".event-show-edit" with "Sof"
    And I click on ".autocomplete-results li"
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
    And I fill in ".event-about-edit" with "http://google.com"
    And I click on ".form-group-startDate input"
    And I click on ".react-datepicker__day=1"
    And I click on ".form-group-endDate input"
    And I click on ".react-datepicker__day=15"
    And I fill in "[name=lat]" with "-36.03133177633187"
    And I fill in "[name=lon]" with "-72.0703125"
    And I select "Coral Sea Islands" from the ".country-select-edit" combobox
    And I click on ".edit-event-save"
    Then the ".error-block" element should contain "Event type is required"

  Scenario: When adding an event the suggestions for existing show should include the Playwright
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
    Then the ".autocomplete-results li" element should contain "My Favorite Playwright"

  Scenario: When adding an event the suggestions for existing local organization should include the location of the profile
    And a profile with the following fields:
      | name | Organization of the year |
      | locality | Muntinlupa |
    And I am logged in
    And I go to the "event" add page
    And I fill in ".event-organization-edit" with "Organization of the year"
    Then the ".autocomplete-results li" element should contain "Muntinlupa"

  Scenario: Start and end dates can be the same
    And I am logged in
    And a profile with the following fields:
      | name | My Favorite Playwright |
    When I go to the "event" add page
    And I fill in ".event-show-edit" with "Althea"
    And I click on ".autocomplete-results li"
    And I fill in ".show-author-name-edit" with "My Favorite Playwright"
    And I click on ".autocomplete-results li"
    And I click on ".edit-show-save"
    And I fill in ".event-organization-edit" with "Organization of the year"
    And I click on ".autocomplete-results li"
    And I select "Performance" from the ".event-type-edit" combobox
    And I click on ".form-group-startDate input"
    And I click on ".react-datepicker__day=15"
    And I click on ".form-group-endDate input"
    And I click on ".react-datepicker__day=15"
    And I select "India" from the ".country-select-edit" combobox
    And I fill in "[name=lat]" with "-36.03133177633187"
    And I fill in "[name=lon]" with "-72.0703125"
    And I click on ".edit-event-save"
    Then the "h1.page-title" element should contain "Althea"

  # This test isn't working but the functionality appears to be
  Scenario: End dates can not be before start dates
    And I am logged in
    When I go to the "event" add page
    And I fill in ".event-show-edit" with "Althea"
    And I click on ".autocomplete-results li"
    And I fill in ".show-author-name-edit" with "My Favorite Playwright"
    And I click on ".autocomplete-results li.create-profile"
    And I click on ".edit-show-save"
    And I fill in ".event-organization-edit" with "Organization of the year"
    And I click on ".autocomplete-results li"
    And I select "Performance" from the ".event-type-edit" combobox
    And I click on ".form-group-startDate input"
    And I click on ".react-datepicker__day=14"
    And I click on ".form-group-endDate input"
    And I click on ".react-datepicker__day=13"
    And I select "India" from the ".country-select-edit" combobox
    And I fill in "[name=lat]" with "-36.03133177633187"
    And I fill in "[name=lon]" with "-72.0703125"
    And I click on ".edit-event-save"
    Then I should not see "h1.page-title"
    Then the ".error-block" element should contain "End date must be after the start date"
