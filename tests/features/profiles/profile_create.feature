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

  Scenario: Users should shee all the fields on the add organization profile form
    And I am logged in
    And I click on ".add"
    When I click on ".add-profile"
    Then I should see the ".profile-name-edit" element
    And I should see the ".profile-about-edit" element
