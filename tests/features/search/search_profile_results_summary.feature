@search
Feature: Search results content summary

  As a user
  I want to see a summary of my search filters
  So I can better understand the content of the directory

  Background:
    Given I am on the English language home page
    And I am logged in
    When I go to the "profile" add page
    And I fill in ".profile-name-edit" with "Fatima"
    And I select "Individual" from the ".profile-type-edit" combobox
    And I select "Organization" from the ".profile-type-edit" combobox
    And I fill in ".profile-about-edit" with "Most popular name in Algeria (census, 2010)"
    And I click on ".ethnicityRace .btn-add"
    And I fill in ".profile-ethnicity-edit" with "Self Identity"
    And I fill in ".profile-locality-edit" with "Algiers"
    And I fill in ".profile-administrative-area-edit" with "Algiers Province"
    And I select "Algeria" from the ".country-select-edit" combobox
    And I fill in ".profile-postal-code-edit" with "16000"
    And I click on ".label-text=Musical Theatre"
    And I click on ".label-text=African Diaspora"
    And I click on ".organization-types-label-text=Producer / Presenter"
    And I click on ".organization-types-label-text=Venue"
    And I click on ".label-text=Director"
    And I click on ".label-text=Administrator, Manager, Producer"
    And I click on ".edit-profile-save"
    And I go to the "profiles" search page
    And I should not see ".search-results"

  Scenario: A summary of the search criteria should be displayed in natual language when filtering by a single interest
    When I select "Musical Theatre" from the ".interests-edit" combobox
    And the ".search-results-summary" element should contain "1 profile interested in Musical Theatre"
