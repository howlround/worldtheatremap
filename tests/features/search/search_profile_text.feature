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
    And I select "Individual" from the ".profile-type-edit" combobox
    And I fill in ".profile-about-edit" with "Most popular name in Algeria (census, 2010)"
    And I fill in ".profile-agent-edit" with "Secret Agent"
    And I fill in ".profile-locality-edit" with "Algiers"
    And I fill in ".profile-administrative-area-edit" with "Algiers Province"
    And I select "Algeria" from the ".country-select-edit" combobox
    And I fill in ".profile-postal-code-edit" with "16000"
    And I fill in ".profile-founding-year-edit" with "1979"
    And I select "Musical Theatre" from the ".interests-edit" combobox
    And I select "Stage Director" from the ".profile-roles-edit" combobox
    And I click on ".edit-profile-save"
    When I go to the "profile" add page
    And I fill in ".profile-name-edit" with "Aadya"
    And I select "Individual" from the ".profile-type-edit" combobox
    And I fill in ".profile-about-edit" with "Most popular name in India"
    And I fill in ".profile-locality-edit" with "Chennai"
    And I select "India" from the ".country-select-edit" combobox
    And I select "Devised" from the ".interests-edit" combobox
    And I select "Venue" from the ".profile-organization-types-edit" combobox
    And I select "Funder" from the ".profile-roles-edit" combobox
    And I click on ".edit-profile-save"
    And I go to the "profiles" search page
    And I should not see ".search-results"

  Scenario: Users can search for profiles by name (partial/full, different case variations)
    # Full name, match case
    When I fill in ".profile-search-text" with "Fatima"
    And the ".search-results" element should contain "Fatima"
    And the ".search-results" element should not contain "Aadya"
    # Full name, different case
    When I fill in ".profile-search-text" with "fatima"
    And the ".search-results" element should contain "Fatima"
    # Partial name (begining), match case
    When I fill in ".profile-search-text" with "Fat"
    And the ".search-results" element should contain "Fatima"
    # Partial name (end), match case
    When I fill in ".profile-search-text" with "ima"
    And the ".search-results" element should contain "Fatima"
