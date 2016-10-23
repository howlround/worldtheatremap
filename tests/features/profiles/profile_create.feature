@profiles
Feature: Create organization profiles

  As a user
  I want to create new profiles
  So I can add information

  Background:
    Given I am on the English language home page

  Scenario: Anonymous users should see the add options but be directed to a login page with a message
    When I go to the "profile" add page
    Then the "h1" element should contain "Sign in"
    And the ".wrapper-message" element should contain "Sign in or register to participate in the World Theatre Map"

  Scenario: Users should be able to create a profile with all the fields
    And I am logged in
    When I go to the "profile" add page
    And I fill in ".profile-name-edit" with "Fatima"
    And I select "Individual" from the ".profile-type-edit" combobox
    And I select "Organization" from the ".profile-type-edit" combobox
    And I fill in ".profile-about-edit" with "Most popular name in Algeria (census, 2010)"
    And I fill in ".profile-agent-edit" with "Secret Agent"
    And I select "Asian American" from the ".profile-ethnicity-race-edit" combobox
    And I fill in ".profile-locality-edit" with "Algiers"
    And I fill in ".profile-administrative-area-edit" with "Algiers Province"
    And I select "Algeria" from the ".country-select-edit" combobox
    And I fill in ".profile-postal-code-edit" with "16000"
    And I fill in ".profile-phone-edit" with "(212) 903-1170"
    And I fill in ".profile-email-edit" with "c@cc.cc"
    And I fill in ".profile-website-edit" with "cc.cc"
    And I fill in ".profile-social-edit" with "Facebook: facebook.com/fatima"
    And I fill in ".profile-founding-year-edit" with "1979"
    And I click on ".label-text=Musical Theatre"
    And I select "Producer" from the ".profile-organization-types-edit" combobox
    And I select "Stage Director" from the ".profile-roles-edit" combobox
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
    And the ".profile-interests" element should contain "Musical Theatre"
    And the ".profile-organization-types" element should contain "Producer"
    And the ".profile-roles" element should contain "Stage Director"

  @chromeOnly
  Scenario: Users should be able to upload an image to their profile (FAILS IN PHANTOMJS)
    And I am logged in
    And a profile with the following fields:
      | name | Photogenic playwright |
    When I go to the profile page for "Photogenic playwright"
    And I choose the "sharks_med.jpg" file for the ".profile-image-wrapper input" field
    And I should wait and see the ".profile-image-uploading" element
    And I should wait extra long until ".profile-image-uploading" is not visible
    Then the ".profile-image" element should contain the image "sharks_med.jpg"

  # Scenario: Dependent fields on profile for individuals
  #   And I am logged in
  #   And I go to the "profile" add page
  #   And I should not see ".profile-gender-edit.is-disabled"
  #   And I should not see ".profile-roles-edit.is-disabled"
  #   And I should not see ".profile-agent-edit.is-disabled"
  #   And I select "Individual" from the ".profile-type-edit" combobox
  #   And I should see the ".profile-gender-edit" element
  #   And I should see the ".profile-roles-edit" element
  #   And I should see the ".profile-agent-edit" element

  # Scenario: Dependent fields on profile for organizations
  #   And I am logged in
  #   And I go to the "profile" add page
  #   And I should not see ".profile-founding-year-edit"
  #   And I should not see ".profile-organization-types-edit"
  #   And I select "Individual" from the ".profile-type-edit" combobox
  #   And I should see the ".profile-founding-year-edit" element
  #   And I should see the ".profile-organization-types-edit" element
