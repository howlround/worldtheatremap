@shows
Feature: Delete shows

  As a user
  I want to be able to delete shows
  So information remains accurate

  Background:
    Given I am on the English language home page
    And I am logged in
    And I go to the "show" add page
    And I fill in ".show-name-edit" with "Fatima"
    And I fill in ".show-author-name-edit" with "My Favorite Playwright"
    And I click on ".autocomplete-results li"
    And I click on ".edit-show-save"

  Scenario: Logged out users should not be able to delete a show
    And I am logged out
    And I go to the show page for "Fatima"
    Then I should not see ".page-delete-link"

  @chromeOnly
  Scenario: Users should be able to request to delete a show
    When I click on ".page-delete-link"
    And I accept the alert
    Then the ".page-actions-edit" element should contain "Delete request received"

  @chromeOnly
  Scenario: Regular users should not see the delete approve or deny links
    When I click on ".page-delete-link"
    And I accept the alert
    And I go to the show page for "Fatima"
    Then I should not see ".page-confirm-removal-link"
    And I should not see ".page-deny-removal-link"

  @chromeOnly
  Scenario: If an admin denies a delete request then the show should go back to the default state
    When I click on ".page-delete-link"
    And I accept the alert
    And I am logged in as an administrator
    And I go to the show page for "Fatima"
    And I click on ".page-deny-removal-link"
    And I accept the alert
    Then the ".page-delete-link" element should contain "Delete"

  @chromeOnly
  Scenario: If an admin accepts a delete request then the show be removed from the system
    When I click on ".page-delete-link"
    And I accept the alert
    And I am logged in as an administrator
    And I go to the show page for "Fatima"
    And I click on ".page-confirm-removal-link"
    And I accept the alert
    Then there should be no show with the name "Fatima"
