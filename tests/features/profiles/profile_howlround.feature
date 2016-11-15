@profiles
Feature: Howlround posts related to profiles

  As a user viewing a profile
  I want to see related HowlRound posts
  So I better understand what I am looking at

  Background:
    Given I am on the English language home page

  Scenario: Profiles that have the HowlRound posts field filled out manually should display relevant posts
    And I am logged in
    When I go to the "profile" add page
    And I fill in ".profile-name-edit" with "Fatima"
    And I fill in ".profile-howlround-posts-edit" with "Algeria"
    And I click on ".edit-profile-save"
    Then the ".howlround-posts" element should contain "Reflections on a Career Well-Spent"

  Scenario: Profiles that have the HowlRound posts field filled out should display a view all link to the HowlRound search results
    And I am logged in
    When I go to the "profile" add page
    And I fill in ".profile-name-edit" with "Fatima"
    And I fill in ".profile-howlround-posts-edit" with "Algeria"
    And I click on ".edit-profile-save"
    And I click on ".howlround-posts-view-all"
    And I switch tabs
    Then the "h1.title" element should contain "Search"
    And the ".view-search" element should contain "Reflections on a Career Well-Spent"

  Scenario: Profiles that do not have the HowlRound posts field filled out on creation should default to the profile name
    And I am logged in
    When I go to the "profile" add page
    And I fill in ".profile-name-edit" with "Fatima may well be a more localized phenomenon"
    And I click on ".edit-profile-save"
    Then the ".howlround-posts" element should contain "The Here & Now Project: Divide"
