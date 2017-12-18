@profiles
Feature: Confirm ethnicity field has been deleted from profiles

  Background:
    Given I am on the English language home page

  Scenario: Users should be able to manually specify now ethnicity information is displayed
    And I am logged in
    When I go to the "profile" add page
    And I select "Individual" from the ".profile-type-edit" combobox
    Then I should not see ".ethnicityRace"
