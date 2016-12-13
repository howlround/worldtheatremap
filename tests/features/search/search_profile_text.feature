@search
Feature: Search box on profile search

  As a user
  I want to search profiles by name
  So I can find specific profiles I already know about

  Background:
    Given I am on the English language home page
    And I am logged in
    When I go to the "profile" add page
    And I fill in ".profile-name-edit" with "Fatima"
    And I click on ".edit-profile-save"
    When I go to the "profile" add page
    And I fill in ".profile-name-edit" with "Aadya"
    And I click on ".edit-profile-save"
    And I go to the "profiles" search page
    And I should not see ".search-results"

  Scenario: Users can search for profiles by name (partial/full, different case variations)
    # Full name, match case
    When I fill in ".profile-search-text" with "Fatima"
    Then the ".search-results" element should contain "Fatima"
    And the ".search-results" element should not contain "Aadya"
    # Full name, different case
    When I fill in ".profile-search-text" with "fatima"
    Then the ".search-results" element should contain "Fatima"
    # Partial name (begining), match case
    When I fill in ".profile-search-text" with "Fat"
    Then the ".search-results" element should contain "Fatima"
    # Partial name (end), match case
    When I fill in ".profile-search-text" with "ima"
    Then the ".search-results" element should contain "Fatima"
