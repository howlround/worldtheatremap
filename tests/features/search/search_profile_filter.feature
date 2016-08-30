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
    And I press the "ESCAPE" key
    And I click on ".edit-profile-save"

  Scenario: Users can filter by country
    And I go to the "profile" search page
    And the ".search-results" element should not contain "Fatima"
    And I select "Algeria" from the ".profile-interests-edit" combobox
    And the ".search-results" element should contain "Fatima"
