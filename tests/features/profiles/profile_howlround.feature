@profiles
Feature: Howlround posts related to profiles

  As a user viewing a profile
  I want to see related HowlRound posts
  So I better understand what I am looking at

  Background:
    Given I am on the English language home page

  Scenario: Profiles that do not have the HowlRound posts field filled out on creation should default to the profile name
    And I am logged in
    When I go to the "profile" add page
    And I fill in ".profile-name-edit" with "Fatima may well be a more localized phenomenon"
    And I click on ".edit-profile-save"
    Then the ".howlround-posts" element should contain "The Here & Now Project: Divide"

  Scenario: If the HowlRound posts search terms have no matches then nothing should be displayed
    And I am logged in
    When I go to the "profile" add page
    And I fill in ".profile-name-edit" with "SoSpecificThatReallyNothingShouldReturn"
    And I click on ".edit-profile-save"
    When I go to the profile page for "SoSpecificThatReallyNothingShouldReturn"
    Then I should not see ".howlround-posts"
