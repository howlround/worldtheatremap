Feature: Annoucement system

  As a site admin
  I want to administer a sitewide announcement
  So that I can keep the users informed

  Background:
    Given I am on the English language home page

  Scenario: Admins can create announcements that display at the top of the screen
    And I am logged in as an administrator
    And I go to "/announcement"
    And I fill in ".content-body-edit" with "New Announcement!"
    And I press ".edit-content-save"
    Then the ".announcement" element should contain "New Announcement!"

  Scenario: Clearing the announcement body field removes the announcement block from the site
  Scenario: Auth
  Scenario: Formatting
  Scenario: i18n
