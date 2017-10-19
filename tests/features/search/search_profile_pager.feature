@search
Feature: Pager on profile search

  As a user
  I want to use a pager on profile search
  So I can find more profiles

  Background:
    Given I am on the English language home page
    And a profile with the following fields:
      | name | Alpha |
      | postalCode | 16000 |
    And a profile with the following fields:
      | name | Bravo |
      | postalCode | 16000 |
    And a profile with the following fields:
      | name | Charlie |
      | postalCode | 16000 |
    And a profile with the following fields:
      | name | Delta |
      | postalCode | 16000 |
    And a profile with the following fields:
      | name | Echo |
      | postalCode | 16000 |
    And a profile with the following fields:
      | name | Foxtrot |
      | postalCode | 16000 |
    And a profile with the following fields:
      | name | Golf |
      | postalCode | 16000 |
    And a profile with the following fields:
      | name | Hotel |
      | postalCode | 16000 |
    And a profile with the following fields:
      | name | India |
      | postalCode | 16000 |
    And a profile with the following fields:
      | name | Juliett |
      | postalCode | 16000 |
    And a profile with the following fields:
      | name | Kilo |
      | postalCode | 16000 |
    And a profile with the following fields:
      | name | Lima |
      | postalCode | 16000 |
    And a profile with the following fields:
      | name | Mike |
      | postalCode | 16000 |
    And a profile with the following fields:
      | name | November |
      | postalCode | 16000 |
    And a profile with the following fields:
      | name | Oscar |
      | postalCode | 16000 |
    And a profile with the following fields:
      | name | Papa |
      | postalCode | 16000 |
    And a profile with the following fields:
      | name | Quebec |
      | postalCode | 16000 |
    And a profile with the following fields:
      | name | Romeo |
      | postalCode | 16000 |
    And a profile with the following fields:
      | name | Sierra |
      | postalCode | 16000 |
    And a profile with the following fields:
      | name | Tango |
      | postalCode | 16000 |
    And a profile with the following fields:
      | name | Uniform |
      | postalCode | 16000 |
    And I go to the "profiles" search page

  Scenario: Profiles should only display twenty items
    When I fill in ".profile-postal-code-edit" with "16000"
    And the ".search-results" element should contain "Alpha"
    And the ".search-results" element should not contain "Uniform"

  Scenario: Profiles search should have a pager to see the next page
    And I fill in ".profile-postal-code-edit" with "16000"
    When I click on ".search-results-pager .next"
    Then the ".search-results" element should contain "Uniform"

  @searchSummary
  Scenario: Search results summary should count all results not just on the page you are looking at
    And I fill in ".profile-postal-code-edit" with "16000"
    Then the ".search-results-summary" element should contain "21 Theatremakers in postal code 1600"
