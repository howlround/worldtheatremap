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
