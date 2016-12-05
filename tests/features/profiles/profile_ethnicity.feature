@profiles
Feature: Display ethnicity field on profiles

  As a user
  I want to control how the ethnicity information is displayed on profiles
  So I can add information

  Background:
    Given I am on the English language home page

  Scenario: Users should be able to manually specify now ethnicity information is displayed
    And I am logged in
    When I go to the "profile" add page
    And I fill in ".profile-name-edit" with "Fatima"
    And I select "Individual" from the ".profile-type-edit" combobox
    And I fill in ".profile-ethnicity-edit" with "Self Identity"
    And I click on ".edit-profile-save"
    Then the ".profile-ethnicity-race-display" element should contain "Self Identity"

  Scenario: Users should be able to specify more than one ethnicity
    And I am logged in
    When I go to the "profile" add page
    And I fill in ".profile-name-edit" with "Fatima"
    And I select "Individual" from the ".profile-type-edit" combobox
    And I fill in ".form-group-ethnicityRace-0 .profile-ethnicity-edit" with "Self Identity"
    And I click on ".btn-add"
    And I fill in ".form-group-ethnicityRace-1 .profile-ethnicity-edit" with "Other ways"
    And I click on ".edit-profile-save"
    Then the ".profile-ethnicity-race-display" element should contain "Self Identity and Other ways"
