@profiles
Feature: Delete profiles

  As a user
  I want to be able to delete profiles
  So information remains accurate

  Background:
    Given I am on the English language home page

  Scenario: Users should be able to request to delete a profile
    And I am logged in
    And I go to the "profile" add page
    And I fill in ".profile-name-edit" with "Fatima"
    And I click on ".edit-profile-save"
    When I click on ".page-delete-link"
    And I accept the alert
    Then the ".page-actions-edit" element should contain "Delete request received"

  Scenario: Logged out users should not be able to delete a profile
    And I am logged in
    And I go to the "profile" add page
    And I fill in ".profile-name-edit" with "Fatima"
    And I click on ".edit-profile-save"
    And I am logged out
    And I go to the profile page for "Fatima"
    Then I should not see ".page-delete-link"

  Scenario: Regular users should not see the delete approve or deny links
    And I am logged in
    And I go to the "profile" add page
    And I fill in ".profile-name-edit" with "Fatima"
    And I click on ".edit-profile-save"
    When I click on ".page-delete-link"
    And I accept the alert
    And I go to the profile page for "Fatima"
    Then I should not see ".page-confirm-removal-link"
    And I should not see ".page-deny-removal-link"

  Scenario: If an admin denies a delete request then the profile should go back to the default state
    And I am logged in
    And I go to the "profile" add page
    And I fill in ".profile-name-edit" with "Fatima"
    And I click on ".edit-profile-save"
    When I click on ".page-delete-link"
    And I accept the alert
    And I am logged in as an administrator
    And I go to the profile page for "Fatima"
    And I click on ".page-deny-removal-link"
    And I accept the alert
    Then the ".page-delete-link" element should contain "Delete"

  Scenario: If an admin accepts a delete request then the profile be removed from the system
    And I am logged in
    And I go to the "profile" add page
    And I fill in ".profile-name-edit" with "Fatima"
    And I click on ".edit-profile-save"
    When I click on ".page-delete-link"
    And I accept the alert
    And I am logged in as an administrator
    And I go to the profile page for "Fatima"
    And I click on ".page-confirm-removal-link"
    And I accept the alert
    Then there should be no profile with the name "Fatima"
