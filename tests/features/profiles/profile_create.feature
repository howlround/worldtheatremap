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
    When I go to the "profile" add page
    And I fill in ".profile-name-edit" with "Fatima"
    And I fill in ".profile-about-edit" with "Most popular name in Algeria (census, 2010)"
    And I fill in ".profile-agent-edit" with "Secret Agent"
    And I fill in ".profile-locality-edit" with "Algiers"
    And I fill in ".profile-administrative-area-edit" with "Algiers Province"
    And I fill in ".profile-country-edit" with "Algeria"
    And I fill in ".profile-postal-code-edit" with "16000"
    And I fill in ".profile-phone-edit" with "(212) 903-1170"
    And I fill in ".profile-email-edit" with "c@cc.cc"
    And I fill in ".profile-website-edit" with "cc.cc"
    And I fill in ".profile-social-edit" with "Facebook: facebook.com/fatima"
    And I fill in ".profile-founding-year-edit" with "1979"
    And I select "Musicals" from the ".profile-interests-edit" combobox
    And I select "Producer" from the ".profile-organization-types-edit" combobox
    And I select "Stage Director" from the ".profile-roles-edit" combobox
    And I press the "ESCAPE" key
    And I click on ".edit-profile-save"
    Then the ".profile-name" element should contain "Fatima"
    And the ".profile-about" element should contain "Most popular name in Algeria (census, 2010)"
    And the ".profile-agent" element should contain "Secret Agent"
    And the ".profile-location" element should contain "Algiers, Algiers Province"
    And the ".profile-country" element should contain "Algeria"
    And the ".profile-phone" element should contain "(212) 903-1170"
    And the ".profile-email" element should contain "c@cc.cc"
    And the ".profile-website" element should contain "cc.cc"
    And the ".profile-social" element should contain "facebook.com/fatima"
    And the ".profile-founding-year" element should contain "1979"
    And the ".profile-interests" element should contain "Musicals"
    And the ".profile-organization-types" element should contain "Producer"
    And the ".profile-roles" element should contain "Stage Director"

  @chromeOnly
  Scenario: Users should be able to upload an image to their profile
    And I am logged in
    And a profile with the following fields:
      | name | Photogenic playwright |
    When I go to the profile page for "Photogenic playwright"
    And I choose the "sharks_med.jpg" file for the ".profile-image-wrapper input" field
    And I should wait and see the ".profile-image-uploading" element
    And I should wait extra long until ".profile-image-uploading" is not visible
    Then the ".profile-image" element should contain the image "sharks_med.jpg"
