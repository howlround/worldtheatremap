Feature: Create organization profiles

  As a user
  I want to create new organization profiles
  So I can add information

  Background:
    Given I am on the home page

  Scenario: Anonymous users should see the add options but be directed to a login page with a message
    And I hover over ".add"
    And I click on ".add-profile"
    Then the "h1" element should contain "Sign in"
    And the ".wrapper-message" element should contain "Sign in or register to participate in the World Theatre Map"

  Scenario: Users should be able to create a profile with all the fields
    And I am logged in
    And I hover over ".add"
    When I click on ".add-profile"
    And I fill in ".profile-name-edit" with "Fatima"
    And I fill in ".profile-about-edit" with "Most popular name in Algeria (census, 2010)"
    And I fill in ".profile-agent-edit" with "Secret Agent"
    And I fill in ".profile-phone-edit" with "(212) 903-1170"
    And I fill in ".profile-email-edit" with "c@cc.cc"
    And I fill in ".profile-website-edit" with "cc.cc"
    And I fill in ".profile-facebook-edit" with "facebook.com/fatima"
    And I fill in ".profile-twitter-edit" with "@fatima"
    And I fill in ".profile-instagram-edit" with "fatima33"
    And I fill in ".profile-google-plus-edit" with "fatima33"
    And I fill in ".profile-founding-year-edit" with "1979"
    And I click on ".edit-profile-save"
    Then the ".profile-name" element should contain "Fatima"
    And the ".profile-about" element should contain "Most popular name in Algeria (census, 2010)"
    And the ".profile-agent" element should contain "Secret Agent"
    And the ".profile-phone" element should contain "(212) 903-1170"
    And the ".profile-email" element should contain "c@cc.cc"
    And the ".profile-website" element should contain "cc.cc"
    And the ".profile-facebook" element should contain "facebook.com/fatima"
    And the ".profile-twitter" element should contain "@fatima"
    And the ".profile-instagram" element should contain "fatima33"
    And the ".profile-google-plus" element should contain "fatima33"
    And the ".profile-founding-year" element should contain "1979"
