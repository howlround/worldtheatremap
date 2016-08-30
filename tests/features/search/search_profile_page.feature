@search
Feature: Profile search page

  As a user
  I want to have a profile search page
  So I can find profiles

  Background:
    Given I am on the home page
@focus
  Scenario: The profile search page should exist
    And I go to the "profile" search page
    Then I should not see ".not-found"
    And the ".search-type.active" element should contain "Profiles"
