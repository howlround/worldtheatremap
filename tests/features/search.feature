Feature: Search the Web

  As a human
  I want to search the web
  So I can find information

  Scenario: Search for Xolv.io
    Given I have visited the home page
    Then the ".hide-completed" element should contain "Hide Completed Tasks"
