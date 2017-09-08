@subscribe
Feature: Subscribe to profiles

  As a user
  I want to subscribe to profiles
  So I can make sure information is correct

  Background:
    Given I am on the English language home page

  @profiles
  Scenario: As a user I can subscribe to a profile
    And I am logged in
    And a profile with the following fields:
      | name | Favorite place theatre |
      | about | I really like going there |
    When I go to the profile page for "Favorite place theatre"
    And I click on ".page-subscribe"
    And the ".page-subscribe" element should contain "Unsubscribe"

  @profiles
  Scenario: As a user I can unsubscribe from a profile
    And I am logged in
    And a profile with the following fields:
      | name | Favorite place theatre |
      | about | I really like going there |
    When I go to the profile page for "Favorite place theatre"
    And I click on ".page-subscribe"
    Then the ".page-subscribe" element should contain "Subscribe"
    And the ".page-subscribe" element should not contain "Unubscribe"
