@festivals @search
Feature: Festival Search map

  As a user
  I want to view festival search results on a map
  So that I can better understand the results

  Background:
    Given I am on the English language home page

  Scenario: Festivals with locations should show up on the map display
    And I am logged in
    When I go to the "profile" add page
    And I fill in ".profile-name-edit" with "National Festival of Festivals 2010"
    And I select "Festival" from the ".profile-type-edit" combobox
    And I fill in "[name=lat]" with "-36.03133177633187"
    And I fill in "[name=lon]" with "-72.0703125"
    And I click on ".edit-profile-save"
    And a profile with the following fields:
      | name | National Festival Organizers |
      | about | We fest |
    And I go to the "festivals" search page
    And I fill in ".profile-search-text" with "Festival"
    When I click on ".results-display-map"
    Then the ".items-globe .profile-name" element should contain "National Festival of Festivals 2010"
