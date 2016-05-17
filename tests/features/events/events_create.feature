Feature: Create events

  As a user
  I want to create a new event
  So I can add information

  Background:
    Given I am on the home page

  Scenario: Anonymous users should see the option to add an event but be directed to a login page with a message
    And I hover over ".add"
    When I click on ".add-event"
    Then the "h1" element should contain "Sign in"
    And the ".wrapper-message" element should contain "Sign in or register to participate in the World Theatre Map"

  Scenario: Users should see all the fields on the add event form
    And I am logged in
    And I hover over ".add"
    When I click on ".add-event"
    Then I should see the ".event-play-name-edit" element
    And I should see the ".event-about-edit" element
