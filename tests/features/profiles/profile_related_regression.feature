Feature: Related profiles on profile pages

  As a user
  I want to see all related profiles for a given profile
  So I can know more about the entity

  Scenario: Primary authors should not be related to themselves
    And a profile with the following fields:
      | name | New Friend |
    When I go to the profile page for "New Friend"
    Then I should not see ".related-profiles"
