Feature: Create organization profiles

  As a user
  I want to create new organization profiles
  So I can add information

  Background:
    Given I am on the home page

  Scenario: Anonymous users should see the add options but be directed to a login page with a message
    And I click on ".add"
    And I click on ".add-profile"
    Then the "h1" element should contain "Sign in"
    And the ".wrapper-message" element should contain "Sign in or register to participate in the World Theatre Map"

  Scenario: Users should see all the fields on the add organization profile form
    And I am logged in
    And I click on ".add"
    When I click on ".add-profile"
    Then I should see the ".profile-name-edit" element
    And I should see the ".profile-about-edit" element

  Scenario: Users should be able to create a profile with all the fields
    And I am logged in
    And I click on ".add"
    When I click on ".add-profile"
    And I fill in ".profile-name-edit" with "Fatima"
    And I fill in ".profile-about-edit" with "Most popular name in Algeria (census, 2010)"
    And I click on ".edit-profile-save"
    Then the ".profile-name" element should contain "Fatima"
    And the ".profile-about" element should contain "Most popular name in Algeria (census, 2010)"
