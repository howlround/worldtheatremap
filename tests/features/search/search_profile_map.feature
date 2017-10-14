@search
Feature: Profile search results displayed on a map

  As a user
  I want to see profile search results displayed on a map
  So I can better understand the results

  Background:
    Given I am on the English language home page
    And I am logged in
    When I go to the "profile" add page
    And I fill in ".profile-name-edit" with "Fatima"
    # And I fill in "[name=lat]" with "-36.03133177633187"
    # And I fill in "[name=lon]" with "-72.0703125"
    # And I click on ".edit-profile-save"
    # And I go to the "profiles" search page

  Scenario: Profile search results can be displayed on a map
    And I fill in "[name=lat]" with "-36.03133177633187"
    And I fill in "[name=lon]" with "-72.0703125"
    And I click on ".edit-profile-save"
    And I go to the "profiles" search page
    And I fill in ".profile-search-text" with "Fatima"
    When I click on ".results-display-map"
    Then the ".items-globe .profile-name" element should contain "Fatima"

  Scenario: Profiles without locations should not be included on the map
    And I click on ".edit-profile-save"
    And I go to the "profiles" search page
    And I fill in ".profile-search-text" with "Fatima"
    When I click on ".results-display-map"
    And I should not see ".items-globe .profile-name"
