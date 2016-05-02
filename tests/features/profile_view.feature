Feature: View organization profiles

  As a user
  I want to see organization profiles
  So I can find information

  Background:
    Given I am on the home page

  Scenario: As a user viewing an organization profile page I want to see information about that organization
    And a profile with the following fields:
      | name | First place theatre |
    And a profile with the following fields:
      | name | Favorite place theatre |
    When I go to the profile page for "Favorite place theatre"
    Then the ".profile-name" element should contain "Favorite place theatre"

  # This will fail until Profile.jsx line 55 is sorted out
  Scenario: Safe html tags should be allowed in the about field
    And a profile with the following fields:
      | name | Safe theatre |
      | about | <p>Paragraph</p> |
    When I go to the profile page for "Safe theatre"
    Then the ".profile-about" element should not contain "<p>Paragraph</p>"

  Scenario: Unafe html tags should not be allowed in the about field
    And a profile with the following fields:
      | name | Safe theatre |
      | about | This paragraph is <script>not </script>at risk |
    When I go to the profile page for "Safe theatre"
    Then the ".profile-about" element should not contain "This paragraph is at risk"
    And the ".profile-about" element should contain "This paragraph is <script>not </script>at risk"
