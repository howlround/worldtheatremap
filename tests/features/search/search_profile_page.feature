@search
Feature: Profile search page

  As a user
  I want to have a profile search page
  So I can find profiles

  Background:
    Given I am on the home page

  Scenario: The profile search page should exist
    And I go to the "profiles" search page
    Then I should not see ".not-found"
    And the ".search-type .active" element should contain "Profiles"
