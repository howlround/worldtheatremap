@search
Feature: Filters on profile search

  As a user
  I want to use search filters
  So I can find profiles

  Background:
    Given I am on the home page
    And I am logged in
    When I go to the "profile" add page
    And I fill in ".profile-name-edit" with "Fatima"
    And I select "Individual" from the ".profile-type-edit" combobox
    And I fill in ".profile-about-edit" with "Most popular name in Algeria (census, 2010)"
    And I fill in ".profile-agent-edit" with "Secret Agent"
    And I fill in ".profile-locality-edit" with "Algiers"
    And I fill in ".profile-administrative-area-edit" with "Algiers Province"
    And I fill in ".profile-country-edit" with "Algeria"
    And I fill in ".profile-postal-code-edit" with "16000"
    And I fill in ".profile-founding-year-edit" with "1979"
    And I select "Musicals" from the ".profile-interests-edit" combobox
    And I select "Producer" from the ".profile-organization-types-edit" combobox
    And I select "Stage Director" from the ".profile-roles-edit" combobox
    And I click on ".edit-profile-save"
    And I go to the "profiles" search page
    And I should not see ".search-results"

  Scenario: Users can filter profiles by role
    When I select "Stage Director" from the ".profile-roles-edit" combobox
    And the ".search-results" element should contain "Fatima"

  Scenario: Users can filter profiles by interest
    When I select "Musicals" from the ".profile-interests-edit" combobox
    And the ".search-results" element should contain "Fatima"

  Scenario: Users can filter profiles by organization type
    When I select "Producer" from the ".profile-organization-types-edit" combobox
    And the ".search-results" element should contain "Fatima"

  Scenario: Users can filter profiles by city
    When I select "Algiers" from the ".profile-locality-select-edit" combobox
    And the ".search-results" element should contain "Fatima"

  Scenario: Users can filter profiles by city after editing a profile to add a new city
    And I go to the profile page for "Fatima"
    And I follow ".edit-link"
    And I fill in ".profile-locality-edit" with "Morocco"
    And I click on ".edit-profile-save"
    And I go to the "profiles" search page
    When I select "Morocco" from the ".profile-locality-select-edit" combobox
    And the ".search-results" element should contain "Fatima"
