@search
Feature: Search results content

  As a user
  I want to use search filters
  So I can find profiles

  Background:
    Given I am on the English language home page
    And I am logged in

  Scenario: Search results should contain all the necessary information
    And I go to the "profile" add page
    And I fill in ".profile-name-edit" with "Fatima"
    And I select "Individual" from the ".profile-type-edit" combobox
    And I select "Organization" from the ".profile-type-edit" combobox
    And I fill in ".profile-about-edit" with "Most popular name in Algeria (census, 2010)"
    And I fill in ".profile-agent-edit" with "Secret Agent"
    And I fill in ".profile-locality-edit" with "Algiers"
    And I fill in ".profile-administrative-area-edit" with "Algiers Province"
    And I select "Algeria" from the ".country-select-edit" combobox
    And I fill in ".profile-postal-code-edit" with "16000"
    And I fill in ".profile-founding-year-edit" with "1979"
    And I click on ".label-text=Musical Theatre"
    And I click on ".label-text=Improvisation"
    And I click on ".organization-types-label-text=Producer / Presenter"
    And I click on ".label-text=Director"
    And I click on ".edit-profile-save"
    When I go to the "profiles" search page
    And I select "Director" from the ".profile-roles-edit" combobox
    And the ".search-results" element should contain "Fatima"
    And the ".search-results" element should contain "Location: Algiers, Algiers Province, Algeria"
    And the ".search-results" element should contain "Interests: Improvisation and Musical Theatre"
    And the ".search-results" element should contain "Roles: Director"
    And the ".search-results" element should contain "Organization types: Producer"

  Scenario: Empty fields should not be displayed on search results
    And I go to the "profile" add page
    And I fill in ".profile-name-edit" with "Fatima"
    And I select "Individual" from the ".profile-type-edit" combobox
    And I fill in ".profile-about-edit" with "Most popular name in Algeria (census, 2010)"
    And I click on ".label-text=Director"
    And I select "India" from the ".country-select-edit" combobox
    And I click on ".edit-profile-save"
    When I go to the "profiles" search page
    And I select "Director" from the ".profile-roles-edit" combobox
    And the ".search-results" element should contain "Fatima"
    And the ".search-results" element should not contain "Interests:"
    And the ".search-results" element should not contain "Organization types:"
