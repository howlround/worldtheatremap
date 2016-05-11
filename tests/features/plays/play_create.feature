Feature: Create plays

  As a user
  I want to create new play
  So I can add information

  Background:
    Given I am on the home page

  Scenario: Anonymous users should see the add options but be directed to a login page with a message
    And I click on ".add"
    And I click on ".add-play"
    Then the "h1" element should contain "Sign in"
    And the ".wrapper-message" element should contain "Sign in or register to participate in the World Theatre Map"

  Scenario: Users should see all the fields on the add play form
    And I am logged in
    And I click on ".add"
    When I click on ".add-play"
    Then I should see the ".play-name-edit" element
    And I should see the ".play-about-edit" element

@focus
  Scenario: Users should be able to create a play with all the fields
    And I am logged in
    And I click on ".add"
    When I click on ".add-play"
    And I fill in ".play-name-edit" with "Sofía"
    And I fill in ".play-about-edit" with "Most popular name in Argentina"
    And I click on ".edit-play-save"
    Then the ".play-name" element should contain "Sofía"
    And the ".play-about" element should contain "Most popular name in Argentina"
