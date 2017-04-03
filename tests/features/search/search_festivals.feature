@festivals @search
Feature: Festival Search

  As a user
  I want to search for festivals
  So that I can find things I'm interested in

  Background:
    Given I am on the English language home page

  Scenario: Festivals should show up in normal profile search
    And I am logged in
    When I go to the "profile" add page
    And I fill in ".profile-name-edit" with "National Festival of Festivals 2010"
    And I select "Festival" from the ".profile-type-edit" combobox
    And I click on ".edit-profile-save"
    And a profile with the following fields:
      | name | National Festival Organizers |
      | about | We fest |
    And I go to the "profiles" search page
    When I fill in ".profile-search-text" with "Festival"
    Then the ".search-results" element should contain "National Festival Organizers"
    And the ".search-results" element should contain "National Festival of Festivals 2010"

  Scenario: There should be a special festival search tab
    And I go to the "festivals" search page
    Then I should not see ".not-found"
    And the ".search-type .active" element should contain "Festivals"

  Scenario: Festival search should have the appropriate filter options
    And I go to the "festivals" search page
    Then I should not see ".profile-roles-edit"
    And I should not see ".profile-organization-types-edit"
    And I should not see ".profile-gender-edit"
    And I should not see ".fieldset-ethnicityRace"

  Scenario: Only Festivals should display in festival tab search
    And I am logged in
    When I go to the "profile" add page
    And I fill in ".profile-name-edit" with "National Festival of Festivals 2010"
    And I select "Festival" from the ".profile-type-edit" combobox
    And I click on ".edit-profile-save"
    And a profile with the following fields:
      | name | National Festival Organizers |
      | about | We fest |
    And I go to the "festivals" search page
    When I fill in ".profile-search-text" with "Festival"
    Then the ".search-results" element should not contain "National Festival Organizers"
    And the ".search-results" element should contain "National Festival of Festivals 2010"

  Scenario: Users should be able to search festivals by date
    And I am logged in
    When I go to the "profile" add page
    And I fill in ".profile-name-edit" with "National Festival of Festivals 2010"
    And I select "Festival" from the ".profile-type-edit" combobox
    And I click on ".form-group-startDate input"
    And I click on ".react-datepicker__day=1"
    And I click on ".form-group-endDate input"
    And I click on ".react-datepicker__day=15"
    And I click on ".edit-profile-save"
    And I go to the "festivals" search page
    When I click on ".form-group-startDate input"
    And I click on ".react-datepicker__day=1"
    And I click on ".form-group-endDate input"
    And I click on ".react-datepicker__day=15"
    Then the ".search-results" element should contain "National Festival of Festivals 2010"
