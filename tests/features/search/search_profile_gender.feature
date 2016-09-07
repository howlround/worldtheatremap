@search
Feature: Gender filters on profile search

  As a user
  I want to use a gender filter to search for profiles
  So I can find profiles I'm interested in

  Background:
    Given I am on the home page
    And I am logged in
    When I go to the "profile" add page
    And I fill in ".profile-name-edit" with "Fatima"
    And I select "Individual" from the ".profile-type-edit" combobox
    And I fill in ".profile-about-edit" with "Most popular name in Algeria (census, 2010)"
    And I select "Female" from the ".profile-gender-edit" combobox
    And I select "Male" from the ".profile-gender-edit" combobox
    And I click on ".edit-profile-save"
    And I go to the "profiles" search page
    And I should not see ".search-results"

  # Gender
  Scenario: Users can filter profiles by gender
    And I select "Female" from the ".profile-gender-edit" combobox
    And the ".search-results" element should contain "Fatima"

  Scenario: Choosing multiple genders should match a profile that has both genders
    And I select "Female" from the ".profile-gender-edit" combobox
    And I select "Male" from the ".profile-gender-edit" combobox
    And the ".search-results" element should contain "Fatima"

  Scenario: Choosing multiple roles should match two different profiles that each have one of the roles
    When I go to the "profile" add page
    And I fill in ".profile-name-edit" with " Nor"
    And I select "Individual" from the ".profile-type-edit" combobox
    And I fill in ".profile-about-edit" with "Most popular name in Malaysia"
    And I select "Male" from the ".profile-gender-edit" combobox
    And I click on ".edit-profile-save"
    And I go to the "profiles" search page
    And I should not see ".search-results"
    And I select "Female" from the ".profile-gender-edit" combobox
    And I select "Male" from the ".profile-gender-edit" combobox
    And the ".search-results" element should contain "Fatima"
    And the ".search-results" element should contain "Nor"
